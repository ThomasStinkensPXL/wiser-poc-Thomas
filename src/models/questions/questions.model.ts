import { z } from 'zod'
import { answerBaseSchema } from '@/models/answer/answerBase.model'

// Waar moet ik enums zetten als ik ze in de models wil plaatsen?
// En welke naam? (xxx.enum.ts?)

export const questionSchema = z.object({
  id: z.string().uuid().optional(), // same als hieronder
  index: z.number().int().optional(), // index hier optional houden? Dan kan de backend het wel altijd 'fout' meegeven.
  questionType: z.string().min(4),
  optional: z.boolean(),
  questionText: z.string(),
  questionHint: z.string(),
  answer: answerBaseSchema.optional()
})

// We hoeven dit niet aangezien we questionSchema enkel gebruiken als BASE van andere schema's!
// export type Question = z.infer<typeof questionSchema>