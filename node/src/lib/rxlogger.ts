import * as rx from "rxjs";

import { debugTime } from "@malkab/ts-utils";





/**
 * 
 * This is the interface all services must conform to.
 * 
 */

export interface IRxLoggerService {

    log: (payload: string) => void;

}



/**
 * 
 * Chains definition. Each chain has a default logging level and a 
 * set of services.
 * 
 */

export interface IRxLoggerChain {

    logLevel: ERXLOGGERLEVELS;

    services: string[];

}



/**
 * 
 * Logging levels
 * 
 */

export enum ERXLOGGERLEVELS {

    DEBUG,
    INFO,
    WARNING,
    ERROR

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

    public static registerService(name: string, service: IRxLoggerService): void {

        this._services.set(name, service);

    }



    public static registerChain(
        logLevel: ERXLOGGERLEVELS,
        services: string[],
        name?: string
    ): void {

        name = name ? name : "default";

        this._chains.set(name, {
            logLevel: logLevel,
            services: services
        });

    }



    public static listen(
        subject: rx.Subject<any>,
        level: ERXLOGGERLEVELS,
        process?: string | ((i: any) => string),
        chain?: string
    ) {

        chain = chain ? chain : "default";

        let preFunc: (i: any) => string = null;

        if (typeof(process) === "string") {

            preFunc = (i: any) => `${process}${i}`;

        } else {

            preFunc = process ? process : (i: any) => i;

        }

        this._subscriptions.push(
            
            subject.subscribe(

                (next) => {

                    this.log(preFunc(next), level, chain);

                }

            )

        );
            
    }




    /**
     * 
     * Logs an entry
     * 
     */

    public static log(
        message: string,
        level: ERXLOGGERLEVELS,
        chain?: string
    ) {
              
        chain = chain ? chain : "default";

        const c: IRxLoggerChain = this._chains.get(chain);

        for (const i of c.services) {
        
            if (level >= c.logLevel) {

                this._services.get(i).log(`${debugTime()}: ${this._loggerLevelsDescription[level]}: ${message}`);
                
            }

        }

    }





    /*

        Private

    */

    private static _subscriptions: rx.Subscription[] = [];

    private static _services: Map<string, IRxLoggerService> = 
        new Map<string, IRxLoggerService>();

    private static _chains: Map<string, IRxLoggerChain> = 
        new Map<string, IRxLoggerChain>();

    private static _loggerLevelsDescription: string[] = [ 
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR"
    ];

}
