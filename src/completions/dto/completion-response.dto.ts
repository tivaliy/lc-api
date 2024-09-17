import { ApiProperty } from '@nestjs/swagger';

export class CompletionResponseDto {
  @ApiProperty()
  answer: string;
}
