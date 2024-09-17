import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompletionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'gpt-3.5-turbo' })
  modelName: string;

  @IsNumber()
  @Max(1)
  @Min(0)
  @IsOptional()
  @ApiProperty({ default: 0.1 })
  temperature: number = 0.1;

  // Each model has a different max tokens limit, let's use some reasonable defaults
  @IsNumber()
  @Max(2048)
  @Min(10)
  @IsOptional()
  @ApiProperty({ default: 256 })
  maxTokens: number = 256;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'What is the capital of France?' })
  question: string;
}
