import { Module } from '@nestjs/common';
import { CompletionsController } from './completions.controller';
import { LLMFactory } from '../llm/llm.service';

@Module({
  controllers: [CompletionsController],
  providers: [LLMFactory],
})
export class CompletionsModule {}
