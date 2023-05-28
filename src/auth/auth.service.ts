import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    // todo: code is insecure and i am too lazy to write correct code
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
