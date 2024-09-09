import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 32)
  username: string;
}
