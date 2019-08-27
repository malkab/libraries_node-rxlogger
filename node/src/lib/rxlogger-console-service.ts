import { IRxLoggerService } from "./rxlogger";





export class RxLoggerConsoleService implements IRxLoggerService {

    /*

        Public

    */

    public log(payload: string) {

        console.log(payload);

    }

}
