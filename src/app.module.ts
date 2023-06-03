import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./users/user.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DictOperationSystem } from "./entities/dict_operation_system";
import { Application } from "./entities/application";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { AccessLoggerMiddleware } from "./accesslogger";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRoot({
      // type: "postgres",
      // host: process.env.DB_POSTGRES_HOST,
      // port: process.env.DB_POSTGRES_PORT,
      // database: process.env.DB_POSTGRES_DB,
      // username: process.env.DB_POSTGRES_USERNAME,
      // password: process.env.DB_POSTGRES_PASSWORD,
      type: "sqlite",
      database: process.env.DB_SQLITE_FILE,

      logging: process.env.DB_LOGGING === 'true',
      synchronize: process.env.DB_SYNCRONIZE === 'true',
      maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME),

      autoLoadEntities: true,
      // entities: [User, Profile, Category, DictOperationSystem, Application],
    }),
    TypeOrmModule.forFeature([DictOperationSystem, Application]),
    PassportModule.register({ session: true }),
    HttpModule,
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AccessLoggerMiddleware).forRoutes('*');
  }
}
