import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Optional,
} from "@nestjs/common";
import {
  ApiBasicAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath, ApiQuery, ApiExtraModels
} from "@nestjs/swagger";
import { UserDto, CreateUserDto, PaginatedUserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiBasicAuth()
@ApiTags("users")
@Controller({ path: "users", version: "2" })
@ApiUnauthorizedResponse({ description: "Unauthorized." })
@ApiForbiddenResponse({ description: "Forbidden." })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("me")
  @ApiOkResponse({ type: UserDto, description: "Ok." })
  async me(): Promise<UserDto | null> {
    const u: UserDto = {
      id: "",
      isAuthenticated: false,
      email: ""
    }
    return u
  }

  @Get()
  @ApiExtraModels(PaginatedUserDto)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedUserDto) },
        {
          properties: {
            results: {
              type: "array",
              items: { $ref: getSchemaPath(UserDto) },
            },
          },
        },
      ],
    },
  })
  // @ApiOkResponse({ type: PaginatedUserDto, description: "Ok." })
  @ApiQuery({ name: "id", required: false, type: "number", isArray: true })
  @ApiQuery({ name: "isActive", required: false, type: "boolean" })
  async findAll(
    @Query("id") ids?: number[],
    @Query("isActive") isActive?: boolean
  ): Promise<PaginatedUserDto> {
    return this.userService.list();
  }

  @Get(":id")
  @ApiOkResponse({ type: UserDto, description: "Ok." })
  @ApiNotFoundResponse({ description: "Not Found." })
  async findOne(@Param("id") id: number): Promise<UserDto | null> {
    return null;
  }

  @Post()
  @ApiCreatedResponse({
    type: UserDto,
    description: "The record has been successfully created.",
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto | null> {
    return await this.userService.create(createUserDto);
  }

  @Patch(":id")
  @ApiCreatedResponse({
    type: UserDto,
    description: "The record has been successfully updated.",
  })
  @ApiNotFoundResponse({ description: "Not Found." })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UserDto
  ): Promise<UserDto | null> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiNotFoundResponse({ description: "Not Found." })
  async remove(@Param("id") id: string) {
    await this.userService.remove(id);
  }
}
