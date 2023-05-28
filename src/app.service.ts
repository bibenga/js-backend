import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  private tik: number = 0;

  constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    return "Hello World!";
  }

  @Cron('*/5 * * * * *')
  handleCron() {
    this.logger.log(`tik - ${this.tik}`);
    this.tik++;

    this.eventEmitter.emit(
      "application.tik",
      JSON.stringify({ id: 1, name: "SafeLagoon", tik: this.tik })
    );
  }

  @OnEvent("application.tik")
  handleEverything(payload: any) {
    this.logger.log(`event - ${payload}`);
  }
}
