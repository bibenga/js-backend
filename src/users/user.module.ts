import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user";
import { UserSubscriber } from "./user.subscriber";
import { Category } from "../entities/category";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
