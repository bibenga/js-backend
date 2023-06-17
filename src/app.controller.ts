import {
  Controller, Get, Logger, Post, UseGuards, Version, Request, Body, HttpCode, Header, Inject
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBasicAuth, ApiBearerAuth, ApiOkResponse, ApiHeader } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { Application } from "./entities/application";
import { UserLogin } from "./auth/dto/user.login";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';

@Controller("olala")
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
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

    this.cacheManager

    const response = `${this.appService.getHello()} - ${result[1]} - ${result[0]}`;

    return response;
  }

  @ApiBasicAuth()
  // @UseGuards(AuthGuard("basic"))
  @Get("basicLogin")
  @HttpCode(200)
  async basicLogin(@Request() req) {
    // const user = await this.authService.login(loginRequest.username, loginRequest.password);
    this.logger.log(`[basicLogin] ${req.user}`)
    return req.user;
  }

  // @ApiBasicAuth()
  // @UseGuards(AuthGuard("local"))
  @Post("formLogin")
  @HttpCode(200)
  async formLogin(@Request() req, @Body() loginRequest: UserLogin) {
    this.logger.log(`[formLogin] -> ${loginRequest}`)
    // const user = await this.authService.login(loginRequest.username, loginRequest.password);
    this.logger.log(`[formLogin] ${req.user}`)
    return req.user;
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("bearer"))
  @Get("bearerLogin")
  @HttpCode(200)
  async bearerLogin(@Request() req) {
    this.logger.log(`[bearerLogin] ${req.user}`)
    return req.user;
  }

  @ApiHeader({name: "apiKey"})
  // @UseGuards(AuthGuard("apiKey"))
  @Get("tokenLogin")
  @HttpCode(200)
  async tokenLogin(@Request() req) {
    this.logger.log(`[tokenLogin] ${req.user}`)
    return req.user;
  }

  // @UseGuards(AuthGuard("local"), AuthGuard("basic"), AuthGuard("bearer"))
  @Get("secreto")
  @HttpCode(200)
  async secreto(@Request() req) {
    this.logger.log(`[secreto] ${req.user}`)
    return req.user;
  }
}
