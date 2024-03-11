import { z } from 'zod'
import { openQuestionSchema } from '@/models/questions/openQuestion.model'
import { singleChoiceQuestionSchema } from '@/models/questions/singleChoiceQuestion.model'
import { multipleChoiceQuestionSchema } from '@/models/questions/multipleChoiceQuestion.model'
import { scoreQuestionSchema } from '@/models/questions/scoreQuestion.model'


export const questionTypesSchema = z.union([
  openQuestionSchema,
  singleChoiceQuestionSchema,
  multipleChoiceQuestionSchema,
  scoreQuestionSchema
])
export const formCreationSchema = z.object({
  questions: z.array(questionTypesSchema)
})

export type FormCreationForm = z.infer<typeof formCreationSchema>
export type QuestionTypes = z.infer<typeof questionTypesSchema>
