import { Controller, Get, Logger, Post, UseGuards, Version, Request, Body, HttpCode, Header } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBasicAuth, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { Application } from "./entities/application";
import { UserLogin } from "./auth/dto/user.login";

@ApiBasicAuth()
@ApiBearerAuth()
@Controller("olala")
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>
  ) { }

  @Get()
  @ApiOkResponse({ type: "string", description: "Ok." })
  @Version("2")
  @Header('Cache-Control', 'none')
  async getHello(): Promise<string> {
    this.logger.log("----------");
    const result = await this.applicationRepository.findAndCount({
      relations: {
        dictOperationSystem: true,
      },
      where: {
        name: "safari",
        dictOperationSystem: {
          name: "ANDROID",
        },
      },
      order: {
        dictOperationSystem: {
          name: "ASC",
        },
        name: "ASC",
      },
      withDeleted: true,
    });
    this.logger.log("----------");

    // this.applicationRepository.createQueryBuilder().where(
    //   "olala = '1'"
    // )

    const response = `${this.appService.getHello()} - ${result[1]} - ${result[0]}`;

    return response;
  }

  @UseGuards(AuthGuard("local"))
  @Post("localLogin")
  @HttpCode(200)
  async localLogin(@Request() req, @Body() loginRequest: UserLogin) {
    // const user = await this.authService.login(loginRequest.username, loginRequest.password);
    return req.user;
  }

  @UseGuards(AuthGuard("basic"))
  @Post("basicLogin")
  @HttpCode(200)
  async basicLogin(@Request() req) {
    return req.user;
  }
}
