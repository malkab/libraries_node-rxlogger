import { RxLogger, ERXLOGGERLEVELS } from "./lib/rxlogger";

import { RxLoggerConsoleService } from "./lib/rxlogger-console-service";

import * as rx from "rxjs";





console.log(`

------------------------------

`);

const s00 = new rx.Subject();

const s01 = new rx.Subject();



setInterval(() => {

    s00.next({ i0: 34, i1: "i1 s00" });

}, 1000);

setInterval(() => {

    s01.next("c01");

}, 1000);



RxLogger.registerService("console00", new RxLoggerConsoleService());

RxLogger.registerService("console01", new RxLoggerConsoleService());

RxLogger.registerChain(ERXLOGGERLEVELS.DEBUG, [ "console00", "console01" ]);

RxLogger.registerChain(ERXLOGGERLEVELS.DEBUG, [ "console01" ], "c01");


RxLogger.log("The message", ERXLOGGERLEVELS.INFO);

RxLogger.listen(s00, ERXLOGGERLEVELS.DEBUG);

RxLogger.listen(s00, ERXLOGGERLEVELS.INFO, "Only string: ");

RxLogger.listen(s00, ERXLOGGERLEVELS.WARNING, (i) => `Function: ${i.i0}, ${i.i1}`);

RxLogger.listen(s01, ERXLOGGERLEVELS.ERROR);
