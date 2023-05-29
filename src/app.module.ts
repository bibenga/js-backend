import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user";
import { UserModule } from "./users/user.module";
import { Category } from "./entities/category";
import { Profile } from "./entities/profile";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DictOperationSystem } from "./entities/dict_operation_system";
import { Application } from "./entities/application";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRoot({
      // type: "postgres",
      // host: "db",
      // port: 5432,
      // database: "rds",
      // username: "rds",
      // password: "sqlsql",
      type: "sqlite",
      database: "db.sqlite3",
    
      entities: [User, Profile, Category, DictOperationSystem, Application],
      logging: true,
      synchronize: true,
      maxQueryExecutionTime: 200,
    }),
    TypeOrmModule.forFeature([DictOperationSystem, Application]),
    // PassportModule.register({ session: true }),
    HttpModule,
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
