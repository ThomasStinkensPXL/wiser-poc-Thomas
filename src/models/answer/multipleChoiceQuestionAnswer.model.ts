import { answerBaseSchema } from '@/models/answer/answerBase.model'
import { z } from 'zod'
import { choiceUuidSchema } from '@/models/choice.model'

export const multipleChoiceQuestionAnswerSchema = answerBaseSchema.extend({
  choices: z.array(choiceUuidSchema).min(2),
})

export type MultipleChoiceQuestionAnswer = z.infer<typeof multipleChoiceQuestionAnswerSchema>