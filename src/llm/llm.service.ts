import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OllamaService } from './ollama.service';
import { LLmService } from './llm.interface';
import { LLMConfig} from './llm.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LLMFactory {
  public constructor(private readonly configService: ConfigService) {}

  getService(llmConfig: LLMConfig): LLmService {
    switch (llmConfig.modelName) {
      case 'gpt-3.5-turbo':
      case 'gpt-4':
        return new OpenAIService(llmConfig, this.configService);
      case 'llama3.1':
      case 'llava':
      case 'phi3':
        return new OllamaService(llmConfig, this.configService);
      default:
        throw new Error(`Unknown model name: ${llmConfig.modelName}`);
    }
  }
}
