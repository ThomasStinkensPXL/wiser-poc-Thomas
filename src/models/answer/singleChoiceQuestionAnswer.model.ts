import { answerBaseSchema } from '@/models/answer/answerBase.model'
import { z } from 'zod'
import { choiceUuidSchema } from '@/models/choice.model'

export const singleChoiceQuestionAnswerSchema = answerBaseSchema.extend({
  choice: choiceUuidSchema
})

export type SingleChoiceQuestionAnswer = z.infer<typeof singleChoiceQuestionAnswerSchema>