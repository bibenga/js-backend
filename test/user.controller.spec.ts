import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "src/users/user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe("count", async () => {
    expect(userService).toBeDefined();
  
    const count = await userService.count();
    expect(count).toBe(0);

    it("olala", async () => {
      //   const result = ['test'];
      //   jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
      //   expect(await userService.findAll()).toBe(result);
    });
  });
});
