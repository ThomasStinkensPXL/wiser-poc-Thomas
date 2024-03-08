import { z } from 'zod'
export const answerUuidSchema = z.string().uuid().brand('AnswerUuid')
export const answerBaseSchema = z.object({
  id: answerUuidSchema,
  timeSubmitted: z.date().optional(),
})

export type AnswerUuid = z.infer<typeof answerUuidSchema>
