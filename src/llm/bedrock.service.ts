import { Injectable } from '@nestjs/common';
import { ChatBedrockConverse } from '@langchain/aws';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { llmSettingsKey } from '../config/llm.config';
import { BaseLLMService } from './base.service';

@Injectable()
export class BedrockConverseService extends BaseLLMService<ChatBedrockConverse> {
  private readonly chatBedrockConverse: ChatBedrockConverse;

  constructor(
    public readonly llmConfig: LLMConfig,
    private configService: ConfigService,
  ) {
    super(llmConfig);
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

  protected getChatModel(): ChatBedrockConverse {
    return this.chatBedrockConverse;
  }
}
