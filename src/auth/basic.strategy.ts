import { BasicStrategy as PassportBasicStrategy } from "passport-http";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class BasicStrategy extends PassportStrategy(PassportBasicStrategy) {
  private readonly logger = new Logger(BasicStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`validate - ${username}`);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
