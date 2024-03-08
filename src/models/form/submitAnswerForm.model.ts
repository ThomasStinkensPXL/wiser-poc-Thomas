import { z } from 'zod'
import { answerBaseSchema } from '@/models/answer/answerBase.model'
import { openQuestionAnswerSchema } from '@/models/answer/openQuestionAnswer.model'
import { scoreQuestionAnswerSchema } from '@/models/answer/scoreQuestionAnswer.model'
import { multipleChoiceQuestionAnswerSchema } from '@/models/answer/multipleChoiceQuestionAnswer.model'
import { singleChoiceQuestionAnswerSchema } from '@/models/answer/singleChoiceQuestionAnswer.model'

export const answerSchema = z.union([
  openQuestionAnswerSchema,
  scoreQuestionAnswerSchema,
  singleChoiceQuestionAnswerSchema,
  multipleChoiceQuestionAnswerSchema,
])
export const submitAnswerFormSchema = z.object({
  answers: z.array(answerSchema)
})

export type SubmitAnswerForm = z.infer<typeof submitAnswerFormSchema>
export type Answers = z.infer<typeof answerSchema>
