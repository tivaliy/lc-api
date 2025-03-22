import { BaseChatModel } from '@langchain/core/dist/language_models/chat_models';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LlmService } from './llm.interface';
import { BaseOutputParser } from '@langchain/core/dist/output_parsers/base';
import { LLMConfig } from './llm.config';

export abstract class BaseLLMService<TChatService extends BaseChatModel>
  implements LlmService
{
  protected constructor(public readonly llmConfig: LLMConfig) {}

  protected abstract getChatModel(): TChatService;

  async generateCompletion(
    input: any,
    prompt: ChatPromptTemplate,
    outputParser: BaseOutputParser = new StringOutputParser(),
  ): Promise<any> {
    const chain = prompt.pipe(this.getChatModel()).pipe(outputParser);
    return await chain.invoke(input);
  }
}
