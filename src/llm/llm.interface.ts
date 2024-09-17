import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LLMConfig } from './llm.config';
import { BaseOutputParser } from '@langchain/core/dist/output_parsers/base';

export interface LLmService {
  llmConfig: LLMConfig;
  generateCompletion(
    input: any,
    prompt: ChatPromptTemplate,
    outputParser: BaseOutputParser,
  ): Promise<any>;
}
