import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { BasicStrategy } from "./basic.strategy";
import { LocalStrategy } from "./local.strategy";
import { TokenStrategy } from "./token.strategy";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, BasicStrategy, TokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
