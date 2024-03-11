import { z } from 'zod'

export const choiceUuidSchema = z.string().uuid().brand('ChoiceUuid')

export const choiceSchema = z.object({
  id: choiceUuidSchema.optional(),
  index: z.number().int().optional(),
  choiceText: z.string().min(1),
})

export type Choice = z.infer<typeof choiceSchema>
