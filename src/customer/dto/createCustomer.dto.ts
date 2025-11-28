import {IsNotEmpty,IsOptional,IsString,MaxLength,} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  fullName: string;

  
  @IsOptional()
  @IsString()
  isActive?: boolean; 
}
