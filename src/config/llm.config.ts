import { registerAs } from '@nestjs/config';

export const llmSettingsKey = 'llm';

export type LLMSettings = {
  ollama: {
    baseUrl: string;
  };
  openai: {
    openAIApiKey: string;
  };
};

export default registerAs<LLMSettings>(llmSettingsKey, () => ({
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL,
  },
  openai: {
    openAIApiKey: process.env.OPENAI_API_KEY,
  },
}));
