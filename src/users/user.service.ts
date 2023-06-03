import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { PaginatedDto } from "../pagination.dto";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto, UserDto } from "./user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async count(): Promise<number> {
    const cnt = await this.userRepository.count();
    return cnt;
  }

  async list(): Promise<PaginatedDto<UserDto>> {
    // const user = new User();
    // user.username = "1"
    // user.firstName = ""
    // user.lastName = ""
    // await this.userRepository.save(user)
    await this.dataSource.transaction(async (manager) => {
      // const user: User = await this.userRepository.findOneOrFail({
      //   where: {
      //     username: '1'
      //   },
      //   lock: { mode: 'pessimistic_write' },
      // });
      // // const user: User = await this.userRepository.findOneByOrFail({
      // //   username: '1'
      // // });
      // user.lastName += "1"
      // user.meta.ip = "123"
      // await this.userRepository.save(user)

      const user: User = await manager.findOneOrFail(User, {
        // relations: {
        //   profile: true,
        // },
        where: {
          email: "1",
        },
        lock: {
          mode: "pessimistic_write",
        },
      });
      // if (user.profile == null) {
      //   const profile = new Profile()
      //   profile.user = user;
      //   await manager.save(profile);
      //   user.profile = profile;
      // } else {
      //   if (user.profile.photo === null) {
      //     user.profile.photo = '';
      //   }
      //   user.profile.photo += '1';
      //   await manager.save(user.profile);
      // }
      const profile = await manager.findOne(Profile, {
        where: {
          user: { id: user.id },
        },
      });
      if (profile == null) {
        const profile = new Profile();
        profile.photo = "2";
        profile.user = user;
        await manager.save(profile);
      } else {
        if (profile.photo === null) {
          profile.photo = "";
        }
        profile.photo += "1";
        await manager.save(profile);
      }
      // user.lastName += "1";
      // user.meta.ip = "123";
      await manager.save(user);

      await manager.increment(User, { id: user.id }, "age", 1);

      const categoriesCount = await manager.count(Category);
      this.logger.log(`categories count is ${categoriesCount}`);
      if (categoriesCount === 0) {
        const category1 = new Category();
        category1.name = "1";
        await manager.save(category1);

        const category11 = new Category();
        category11.name = "11";
        category11.parent = category1;
        await manager.save(category11);

        const category111 = new Category();
        category111.name = "111";
        category111.parent = category11;
        await manager.save(category111);

        const category12 = new Category();
        category12.name = "12";
        category12.parent = category1;
        await manager.save(category12);

        // await manager.save([category1, category11, category111, category12])
      }
    });

    // await this.userRepository.count();
    // const unsafeUserInput = 'olala';
    // await this.userRepository.findAndCountBy({
    //   username: ILike(`%${unsafeUserInput}%`),
    //   // username: Not("About #1"),
    // });
    return <PaginatedDto<UserDto>>{
      total: 0,
      limit: 0,
      offset: 0,
      results: [],
    };
  }

  async create(user: CreateUserDto): Promise<UserDto | null> {
    return null;
  }

  async update(id: string, user: UserDto): Promise<UserDto | null> {
    return user;
  }

  async remove(id: string) {
    throw new Error("Method not implemented.");
  }

  private readonly users = [
    {
      id: 1,
      username: "a",
      password: "a",
    },
    {
      id: 2,
      username: "u",
      password: "u",
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
