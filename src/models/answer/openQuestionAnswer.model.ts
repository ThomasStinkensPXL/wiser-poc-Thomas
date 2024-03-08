import { z } from 'zod'
import { answerBaseSchema } from '@/models/answer/answerBase.model'

export const openQuestionAnswerSchema = answerBaseSchema.extend({
  answerText: z.string().default('')
})

export type OpenQuestionAnswer = z.infer<typeof openQuestionAnswerSchema>
