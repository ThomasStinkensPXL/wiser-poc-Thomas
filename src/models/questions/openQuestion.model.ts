import { z } from 'zod'
import { questionSchema } from '@/models/questions/questions.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import { openQuestionAnswerSchema } from '@/models/answer/openQuestionAnswer.model'

export const openQuestionSchema = questionSchema.extend({
  minLength: z.number().nonnegative(), // != positive denk ik. (is 0 positief?)
  maxLength: z.number().nonnegative(),
  // We overriden de basic instelling voor questionType (wat min. 4 was)
  // We zetten het nogsteeds daar om er voor te zorgen dat het altijd aanwezig moet zijn, zelfs als iemand ooit een nieuwe question type maakt en vergeet de base value te zetten zoals hieronder.
  questionType: z.literal<string>(QuestionType.open),
  answer: openQuestionAnswerSchema.optional()
}).refine((schema) => schema.maxLength >= schema.minLength, "MaxLength cannot be lower than minLength.") // i18n!!!!!

export type OpenQuestion = z.infer<typeof openQuestionSchema>
