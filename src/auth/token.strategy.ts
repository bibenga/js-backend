import { HeaderAPIKeyStrategy as PassportHeaderAPIKeyStrategy } from "passport-headerapikey";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenStrategy extends PassportStrategy(PassportHeaderAPIKeyStrategy, 'api-key') {
  private readonly logger = new Logger(TokenStrategy.name);

  constructor(private authService: AuthService) {
    super(
      { header: 'X-Unnecessary-Key', prefix: '' },
      false,
      async (apiKey, done) => await this.validate(apiKey, done)
    );
  }

  async validate(apiKey: string, done): Promise<any> {
    this.logger.log(`validate - ${apiKey}`);
    const user = await this.authService.validateUserByToken(apiKey);
    if (!user) {
      done(new UnauthorizedException(), null)
      // throw new UnauthorizedException();
    }
    done(null, user)
    // return user;
  }
}
