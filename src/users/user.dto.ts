import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaginatedDto } from "src/pagination.dto";


export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ writeOnly: true })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  lastName?: string;
}

export class UserDto {
  @ApiProperty({ readOnly: true })
  id: string;

  // @ApiProperty({ readOnly: true })
  // isAuthenticated: boolean

  @ApiProperty({ readOnly: true })
  email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  lastName?: string;
}

export class PaginatedUserDto extends PaginatedDto<UserDto> {}

export class AuthenticationUserDto extends UserDto {
  @ApiProperty({ readOnly: true })
  isAuthenticated: boolean
}
