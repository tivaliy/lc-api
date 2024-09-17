import { ModelName } from './llm.enum';

export interface LLMConfig {
  modelName: ModelName;
  temperature: number;
  maxTokens: number;
}
