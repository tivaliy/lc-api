import {
  Body,
  Controller,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { LLMFactory } from '../llm/llm.service';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LLMConfig } from '../llm/llm.config';
import { CompletionResponseDto } from './dto/completion-response.dto';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ApiTags } from '@nestjs/swagger';

interface Answer {
  answer: string;
}

const PROMPT_TEMPLATE =
  'Answer the following question: {question}. Respond with a valid JSON object with the key "answer".';

@ApiTags('completions')
@Controller('completions')
export class CompletionsController {
  constructor(private readonly llmFactory: LLMFactory) {}

  @Post()
  async generateCompletion(
    @Body() createCompletionDto: CreateCompletionDto,
  ): Promise<CompletionResponseDto> {
    const { provider, modelName, temperature, maxTokens, question } =
      createCompletionDto;

    const llmConfig: LLMConfig = {
      provider,
      modelName,
      temperature,
      maxTokens,
    };
    const llm_service = this.llmFactory.getService(llmConfig);

    const prompt = ChatPromptTemplate.fromTemplate(PROMPT_TEMPLATE);
    try {
      return await llm_service.generateCompletion(
        { question: question },
        prompt,
        new JsonOutputParser<Answer>(),
      );
    } catch (error) {
      throw new ServiceUnavailableException(
        `Failed to generate completion: ${error.message}`,
      );
    }
  }
}
