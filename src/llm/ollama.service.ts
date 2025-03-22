import { Injectable } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { BaseLLMService } from './base.service';

@Injectable()
export class OllamaService extends BaseLLMService<ChatOllama> {
  private readonly chatOllama: ChatOllama;

  constructor(
    public readonly llmConfig: LLMConfig,
    private configService: ConfigService,
  ) {
    super(llmConfig);
    const llmSettings = this.configService.get(llmSettingsKey);
    this.chatOllama = new ChatOllama({
      baseUrl: llmSettings.ollama.baseUrl,
      numPredict: llmConfig.maxTokens,
      model: llmConfig.modelName,
    });
  }

  protected getChatModel(): ChatOllama {
    return this.chatOllama;
  }
}
