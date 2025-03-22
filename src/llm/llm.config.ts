import { Provider } from './llm.enum';

export interface LLMConfig {
  provider: Provider;
  modelName: string;
  temperature: number;
  maxTokens: number;
}
