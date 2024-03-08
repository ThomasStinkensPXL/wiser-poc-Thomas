import { z } from 'zod'
import { questionSchema } from '@/models/questions/questions.model'
import { choiceSchema } from '@/models/choice.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import { singleChoiceQuestionAnswerSchema } from '@/models/answer/singleChoiceQuestionAnswer.model'

export  const singleChoiceQuestionSchema = questionSchema.extend({
  questionType: z.literal<string>(QuestionType.single),
  choices: z.array(choiceSchema).min(2),
  answer: singleChoiceQuestionAnswerSchema.optional()
})

export type SingleChoiceQuestion = z.infer<typeof singleChoiceQuestionSchema>
