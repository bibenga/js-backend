import { HeaderAPIKeyStrategy as PassportHeaderAPIKeyStrategy } from "passport-headerapikey";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenStrategy extends PassportStrategy(PassportHeaderAPIKeyStrategy) {
  private readonly logger = new Logger(TokenStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(apiKey: string): Promise<any> {
    this.logger.log(`validate - ${apiKey}`);
    const user = await this.authService.validateUserByToken(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
