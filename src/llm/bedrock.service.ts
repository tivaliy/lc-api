import { Injectable } from '@nestjs/common';
import { LLmService } from './llm.interface';
import { ChatBedrockConverse } from '@langchain/aws';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { BaseOutputParser } from '@langchain/core/dist/output_parsers/base';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class BedrockConverseService implements LLmService {
  private chatBedrockConverse: ChatBedrockConverse;

  constructor(
    public readonly llmConfig: LLMConfig,
    private configService: ConfigService,
  ) {
    const llmSettings = this.configService.get(llmSettingsKey);
    this.chatBedrockConverse = new ChatBedrockConverse({
      model: llmConfig.modelName,
      region: llmSettings.awsbedrock.bedrockAwsRegion,
      credentials: {
        accessKeyId: llmSettings.awsbedrock.bedrockAwsAccessKeyId,
        secretAccessKey: llmSettings.awsbedrock.bedrockAwsSecretAccessKey,
      },
    });
  }

  async generateCompletion(
    input: any,
    prompt: ChatPromptTemplate,
    outputParser: BaseOutputParser = new StringOutputParser(),
  ): Promise<any> {
    const chain = prompt.pipe(this.chatBedrockConverse).pipe(outputParser);
    return await chain.invoke(input);
  }
}
