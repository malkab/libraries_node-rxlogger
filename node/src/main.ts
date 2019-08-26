import { RxLogger } from "./lib/rxlogger";

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

}, 3000);



RxLogger.registerService(new RxLoggerConsoleService());

RxLogger.registerService(new RxLoggerConsoleService());


RxLogger.listen(s00);

RxLogger.listen(s00, "Only string: ");

RxLogger.listen(s00, (i) => `Function: ${i.i0}, ${i.i1}`);

RxLogger.listen(s01);
