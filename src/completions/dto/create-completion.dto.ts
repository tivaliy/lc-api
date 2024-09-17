import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModelName } from '../../llm/llm.enum';

export class CreateCompletionDto {
  @IsEnum(ModelName)
  @IsNotEmpty()
  @ApiProperty({
    enum: ModelName,
    enumName: 'ModelNames',
    example: ModelName.GPT_3_5_TURBO,
  })
  modelName: ModelName;

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
