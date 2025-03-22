import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../../llm/llm.enum';

export class CreateCompletionDto {
  @ApiProperty({
    enum: Provider,
    enumName: 'Provider',
    example: Provider.OPENAI,
  })
  provider: Provider;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'gpt-4o' })
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
