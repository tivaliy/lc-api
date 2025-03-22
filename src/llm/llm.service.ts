import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OllamaService } from './ollama.service';
import { LlmService } from './llm.interface';
import { LLMConfig } from './llm.config';
import { ConfigService } from '@nestjs/config';
import { BedrockConverseService } from './bedrock.service';
import { Provider } from './llm.enum';

@Injectable()
export class LLMFactory {
  public constructor(private readonly configService: ConfigService) {}

  public getService(llmConfig: LLMConfig): LlmService {
    switch (llmConfig.provider) {
      case Provider.OPENAI:
        return new OpenAIService(llmConfig, this.configService);
      case Provider.OLLAMA:
        return new OllamaService(llmConfig, this.configService);
      case Provider.AWS_BEDROCK:
        return new BedrockConverseService(llmConfig, this.configService);
      default:
        throw new Error(`Unknown model provider: ${llmConfig.provider}`);
    }
  }
}
