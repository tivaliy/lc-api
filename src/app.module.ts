import { Module } from '@nestjs/common';
import { CompletionsModule } from './completions/completions.module';
import { LLMFactory } from './llm/llm.service';
import { ConfigModule } from '@nestjs/config';
import LLMSettings from './config/llm.config';
import AppSettings from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppSettings, LLMSettings],
      isGlobal: true,
    }),
    CompletionsModule,
  ],
  controllers: [],
  providers: [LLMFactory],
})
export class AppModule {}
