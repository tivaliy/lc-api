import { Injectable } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LLmService } from './llm.interface';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { BaseOutputParser } from '@langchain/core/dist/output_parsers/base';

@Injectable()
export class OllamaService implements LLmService {
  private chatOllama: ChatOllama;

  constructor(
    public readonly llmConfig: LLMConfig,
    private configService: ConfigService,
  ) {
    const llmSettings = this.configService.get(llmSettingsKey);
    this.chatOllama = new ChatOllama({
      baseUrl: llmSettings.ollama.baseUrl,
      numPredict: llmConfig.maxTokens,
      model: llmConfig.modelName,
    });
  }

  async generateCompletion(
    input: any,
    prompt: ChatPromptTemplate,
    outputParser: BaseOutputParser = new StringOutputParser(),
  ): Promise<any> {
    const chain = prompt.pipe(this.chatOllama).pipe(outputParser);
    return await chain.invoke(input);
  }
}
