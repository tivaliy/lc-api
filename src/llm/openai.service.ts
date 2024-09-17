import { Injectable } from '@nestjs/common';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LLmService } from './llm.interface';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { BaseOutputParser } from '@langchain/core/dist/output_parsers/base';

@Injectable()
export class OpenAIService implements LLmService {
  private chatOpenAi: ChatOpenAI;

  constructor(
    public readonly llmConfig: LLMConfig,
    private readonly configService: ConfigService,
  ) {
    const llmSettings = this.configService.get(llmSettingsKey);
    this.chatOpenAi = new ChatOpenAI({
      model: llmConfig.modelName,
      maxTokens: llmConfig.maxTokens,
      openAIApiKey: llmSettings.openai.apiKey,
    });
  }

  async generateCompletion(
    input: any,
    prompt: ChatPromptTemplate,
    outputParser: BaseOutputParser = new StringOutputParser(),
  ): Promise<any> {
    const chain = prompt.pipe(this.chatOpenAi).pipe(outputParser);
    return await chain.invoke(input);
  }
}
