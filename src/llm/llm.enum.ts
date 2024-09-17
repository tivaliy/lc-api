export enum ModelName {
  // OpenAI, https://platform.openai.com/docs/models
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',

  // Ollama, https://ollama.com/library
  LLAMA_3_1 = 'llama3.1',
  LLAVA = 'llava',
  PHI_3 = 'phi3',

  // AWS Bedrock, https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html
  MISTRAL_7B_INSTRUCT = 'mistral.mistral-7b-instruct-v0:2',
}
