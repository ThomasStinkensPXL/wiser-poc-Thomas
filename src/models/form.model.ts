import { z } from 'zod'
import { questionSchema } from '@/models/questions/questions.model'

const formSchema = z.object({
  id: z.string().uuid(),
  questions: z.array(questionSchema),
  formName: z.string()
})

export type Form = z.infer<typeof formSchema>
