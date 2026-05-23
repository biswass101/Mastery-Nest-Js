import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First name should be a string value' })
  @IsOptional()
  @MinLength(3, { message: 'First name  should be at least 3 charcter long' })
  @MaxLength(100)
  firstName?: string;

  @IsString({ message: 'Last name  be a string value' })
  @IsOptional()
  @MinLength(3, { message: 'Last should be at least 3 charcter long' })
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
