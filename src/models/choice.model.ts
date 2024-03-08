import { z } from 'zod'

export const choiceUuidSchema = z.string().uuid().brand('ChoiceUuid')

export const choiceSchema = z.object({
  id: choiceUuidSchema,
  sortOrder: z.number().int(),
  choiceText: z.string().min(1),
})

export type Choice = z.infer<typeof choiceSchema>
