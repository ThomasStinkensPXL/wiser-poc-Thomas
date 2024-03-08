import { answerBaseSchema } from '@/models/answer/answerBase.model'
import { z } from 'zod'

export const scoreQuestionAnswerSchema = answerBaseSchema.extend({
  score: z.number().int()
})

export type ScoreQuestionAnswer = z.infer<typeof scoreQuestionAnswerSchema>