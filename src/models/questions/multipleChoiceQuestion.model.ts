import { z } from 'zod'
import { questionSchema } from '@/models/questions/questions.model'
import { choiceSchema } from '@/models/choice.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import { multipleChoiceQuestionAnswerSchema } from '@/models/answer/multipleChoiceQuestionAnswer.model'

export  const multipleChoiceQuestionSchema = questionSchema.extend({
  minChoices: z.number().min(2),
  maxChoices: z.number().nonnegative(),
  questionType: z.literal<string>(QuestionType.multiple),
  choices: z.array(choiceSchema).min(2),
  answer: multipleChoiceQuestionAnswerSchema.optional()
}).refine((schema) => schema.maxChoices >= schema.minChoices, "MaxChoices cannot be lower than MinChoices.") // i18n!!!!!
  .refine((schema) => schema.maxChoices <= schema.choices.length, "MaxChoices cannot be higher then amount of choices present.") // i18n!!!!!

export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestionSchema>
