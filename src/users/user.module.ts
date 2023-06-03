import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user";
import { UserSubscriber } from "./user.subscriber";
import { Category } from "../entities/category";
import { Profile } from "../entities/profile";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Category]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
