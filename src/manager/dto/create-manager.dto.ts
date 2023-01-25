import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateManagerDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
