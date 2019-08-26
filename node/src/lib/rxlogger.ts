import * as rx from "rxjs";

import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';





/**
 * 
 * This is the interface all services must conform to.
 * 
 */

export interface IRxLoggerService {

    log: (payload: string) => void;

}




/*

    For answering to subscriptions in an extended way

*/

interface IRxLoggerSubscription {

    subscription: rx.Subscription;

    prefix: string;

}





/**
 * 
 * The RxLogger class
 * 
 */

export class RxLogger {

    /*

        Public

    */

    public static registerService(service: IRxLoggerService) {

        this._services.push(service);

    }



    public static listen(
        subject: rx.Subject<any>, 
        process?: string | ((i: any) => string)
    ) {

        let preFunc: (i: any) => string = null;

        if (typeof(process) === "string") {

            preFunc = (i: any) => `${process}${i}`;

        } else {

            preFunc = process ? process : (i: any) => i;

        }

        this._subscriptions.push(
            
            subject.subscribe(

                (next) => {
                    
                    for (const i of this._services) {
                    
                        i.log(`${this._t()}: ${preFunc(next)}`);

                    }

                }

            )

        );
            
    }





    /*

        Private

    */

    private static _subscriptions: rx.Subscription[] = [];

    private static _services: IRxLoggerService[] = [];



    // Function time

    private static _t(delta: number = null): string {

        const d = new Date();
        const time = Date.now();

        let out: string = `${new Date().toISOString()}`;

        if (delta) {

            delta = (Date.now() - delta) / 1000.0;

            out = out + ` (+${delta} s)`;

        }

        return out;

    }

}
