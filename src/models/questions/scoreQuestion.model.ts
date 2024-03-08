import { z } from 'zod'
import { questionSchema } from '@/models/questions/questions.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import { scoreQuestionAnswerSchema } from '@/models/answer/scoreQuestionAnswer.model'

export const scoreQuestionSchema = questionSchema.extend({
  questionType: z.literal<string>(QuestionType.score),
  minScore: z.number(),
  maxScore: z.number(),
  minLabel: z.string().min(1),
  maxLabel: z.string().min(1),
  answer: scoreQuestionAnswerSchema.optional()
}).refine((schema) => schema.minScore < schema.maxScore, "minScore cannot be higher or equal to the maxScore.")

export type ScoreQuestion = z.infer<typeof scoreQuestionSchema>
