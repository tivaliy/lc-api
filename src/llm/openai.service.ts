import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { BaseLLMService } from './base.service';

@Injectable()
export class OpenAIService extends BaseLLMService<ChatOpenAI> {
  private readonly chatOpenAi: ChatOpenAI;

  constructor(
    public readonly llmConfig: LLMConfig,
    private readonly configService: ConfigService,
  ) {
    super(llmConfig);
    const llmSettings = this.configService.get(llmSettingsKey);
    this.chatOpenAi = new ChatOpenAI({
      model: llmConfig.modelName,
      maxTokens: llmConfig.maxTokens,
      openAIApiKey: llmSettings.openai.apiKey,
    });
  }

  protected getChatModel(): ChatOpenAI {
    return this.chatOpenAi;
  }
}
