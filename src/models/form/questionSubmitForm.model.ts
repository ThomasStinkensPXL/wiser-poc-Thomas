import { z } from 'zod'
import { openQuestionSchema } from '@/models/questions/openQuestion.model'
import { multipleChoiceQuestionSchema } from '@/models/questions/multipleChoiceQuestion.model'
import { scoreQuestionSchema } from '@/models/questions/scoreQuestion.model'
import { singleChoiceQuestionSchema } from '@/models/questions/singleChoiceQuestion.model'

export const questionSubmitFormSchema = z.object({
  questions: z.array(z.union([
    openQuestionSchema,
    multipleChoiceQuestionSchema,
    scoreQuestionSchema,
    singleChoiceQuestionSchema
  ]))
})

// The following can't be done in questions.model.ts because of a loop of imports
// (All depenencies would import the base class + the base class would import the dependencies)
export const questionsSchema = z.union([
  openQuestionSchema,
  multipleChoiceQuestionSchema,
  scoreQuestionSchema,
  singleChoiceQuestionSchema
])

// A type that contains all implementations of question
export type Question = z.infer<typeof questionsSchema>

export type QuestionSubmitForm = z.infer<typeof questionSubmitFormSchema>
