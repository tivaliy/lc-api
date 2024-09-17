import { registerAs } from '@nestjs/config';

export const llmSettingsKey = 'llm';

export type LLMSettings = {
  ollama: {
    baseUrl: string;
  };
  openai: {
    openAIApiKey: string;
  };
  awsbedrock: {
    bedrockAwsRegion: string;
    bedrockAwsAccessKeyId: string;
    bedrockAwsSecretAccessKey: string;
  };
};

export default registerAs<LLMSettings>(llmSettingsKey, () => ({
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL,
  },
  openai: {
    openAIApiKey: process.env.OPENAI_API_KEY,
  },
  awsbedrock: {
    bedrockAwsRegion: process.env.BEDROCK_AWS_REGION,
    bedrockAwsAccessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID,
    bedrockAwsSecretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY,
  },
}));
