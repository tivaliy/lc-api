import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OllamaService } from './ollama.service';
import { LLmService } from './llm.interface';
import { LLMConfig} from './llm.config';
import { ConfigService } from '@nestjs/config';
import { BedrockConverseService } from './bedrock.service';
import { ModelName } from './llm.enum';

@Injectable()
export class LLMFactory {
  public constructor(private readonly configService: ConfigService) {}

  getService(llmConfig: LLMConfig): LLmService {
    switch (llmConfig.modelName) {
      case ModelName.GPT_3_5_TURBO:
      case ModelName.GPT_4:
        return new OpenAIService(llmConfig, this.configService);
      case ModelName.LLAMA_3_1:
      case ModelName.LLAVA:
      case ModelName.PHI_3:
        return new OllamaService(llmConfig, this.configService);
      case ModelName.MISTRAL_7B_INSTRUCT:
        return new BedrockConverseService(llmConfig, this.configService);
      default:
        throw new Error(`Unknown model name: ${llmConfig.modelName}`);
    }
  }
}
