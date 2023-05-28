import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Optional,
} from "@nestjs/common";
import {
  ApiBasicAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath, ApiQuery,
} from "@nestjs/swagger";
import { PaginatedDto } from "../pagination.dto";
import { UserDto, CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiBasicAuth()
@ApiTags("users")
@Controller({ path: "users", version: "2" })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
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
  @ApiQuery({ name: "id", required: false, type: "number", isArray: true })
  @ApiQuery({ name: "isActive", required: false, type: "boolean" })
  async findAll(
    @Query("id") ids?: number[],
    @Query("isActive") isActive?: boolean
  ): Promise<PaginatedDto<UserDto>> {
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
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not Found." })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto | null> {
    return this.userService.create(createUserDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UserDto
  ): Promise<UserDto> {
    return updateUserDto;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) { }
}
