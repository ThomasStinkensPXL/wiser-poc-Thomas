<script setup lang="ts">

import type { Form } from '@/models/form.model'
import { type OpenQuestion} from '@/models/questions/openQuestion.model'

import {
  type MultipleChoiceQuestion
} from '@/models/questions/multipleChoiceQuestion.model'
import { type Choice, choiceUuidSchema } from '@/models/choice.model'
import type { SingleChoiceQuestion } from '@/models/questions/singleChoiceQuestion.model'
import { type ScoreQuestion} from '@/models/questions/scoreQuestion.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import OpenQuestionComponent from '@/components/OpenQuestionComponent.vue'
import { useForm } from 'formango'
import MultipleChoiceQuestionComponent from '@/components/MultipleChoiceQuestionComponent.vue'
import SingleChoiceQuestionComponent from '@/components/SingleChoiceQuestionComponent.vue'
import ScoreQuestionComponent from '@/components/ScoreQuestionComponent.vue'
import { z, ZodObject, type ZodTypeAny } from 'zod'
import { an } from 'vitest/dist/reporters-MmQN-57K'

const user1 = '00000000-0000-0000-0000-000000000001'

// Voor min & maxlength zouden we een default kunnen displayen (in het textveld fzo een placeholder waarin de default waarde staat)
const question1: OpenQuestion = {
  minLength: 10,
  maxLength: 20,
  questionText: "Dit is de eerste vraag",
  questionHint: "kleine text",
  optional: false,
  index: 1,
  id: "00000000-0000-0000-0000-000000000002", // Bij het aanmaken horen we dit niet te hoeven geven (misschien een apparte model??? -> DTO ofzo???)
  questionType: "open",
  answer: {
    userId: user1,
    id: "00000000-0000-0000-0000-000000000013",
    timeSubmitted: new Date(),
    answerText: "Antwoord op vraag 1"
  }
}

const choice1: Choice = {
  choiceText: "Keuze 1",
  id: "00000000-0000-0000-0000-000000000003",
  sortOrder: 1
}

const choice2: Choice = {
  choiceText: "Keuze 2",
  id: "00000000-0000-0000-0000-000000000004",
  sortOrder: 2
}

const choice3: Choice = {
  choiceText: "Keuze 3",
  id: "00000000-0000-0000-0000-000000000005",
  sortOrder: 3
}

const question2: MultipleChoiceQuestion = {
  questionText: "Dit is de tweede vraag",
  id: "00000000-0000-0000-0000-000000000006",
  index: 2,
  optional: true,
  choices: [choice1, choice2, choice3],
  questionType: QuestionType.multiple,
  questionHint: "",
  maxChoices: 3,
  minChoices: 2,
  answer: {
    userId: user1,
    id: "00000000-0000-0000-0000-000000000012",
    timeSubmitted: new Date(),
    choices: [choice1.id, choice2.id]
  }
}

const question3: SingleChoiceQuestion = {
  questionHint: "",
  questionText: "Dit is de derde vraag",
  questionType: QuestionType.single,
  id: "00000000-0000-0000-0000-000000000007",
  optional: true,
  sortOrder: 3,
  choices: [choice1, choice2, choice3],
  answer: {
    userId: user1,
    id: "00000000-0000-0000-0000-000000000014",
    timeSubmitted: new Date(),
    choice: choice2.id
  }
}

const question4: ScoreQuestion = {
  questionHint: '',
  questionText: "Dit is de vierde vraag",
  index: 4,
  optional: true,
  maxScore: 5,
  minScore: 0,
  id: '00000000-0000-0000-0000-000000000008',
  maxLabel: "Helemaal mooi",
  minLabel: "Helemaal NIET mooi",
  questionType: QuestionType.score,
}

const question5: ScoreQuestion = {
  questionHint: 'Wow!',
  questionText: "Dit is de vijfde vraag",
  index: 5,
  optional: true,
  maxScore: 13,
  minScore: -3,
  id: '00000000-0000-0000-0000-000000000009',
  minLabel: "Het is meh",
  maxLabel: "Het is meer dan meh",
  questionType: QuestionType.score,
  // answer: {
  //   userId: user1,
  //   id: "00000000-0000-0000-0000-000000000011",
  //   timeSubmitted: new Date(),
  //   score: 4
  // }
}

const form1: Form = {
  id: '00000000-0000-0000-0000-000000000010',
  formName: "My first form",
  questions: [question1, question2, question3, question4, question5] // Kijk ook eens na of sortorder werkt? -> Moet dit zelfs? (is de backend hier voor verantwoordelijk? of moeten we het in de frontend nog altijd sorten?)
}

// -------------------------------------------------------------

function addOpenQuestionValidation(zodObject: ZodObject<any>, question: OpenQuestion) {
  let validationSchema = z.object({}).setKey(
    question.id,
    z.string()
      .max(question.maxLength)
      .min(question.minLength)
  )

  // Add optionality to schema if question is optional
  if (question.optional) {
    validationSchema = validationSchema.setKey(
      question.id,
      z.union([
        validationSchema.shape[question.id],
        z.string().length(0).nullable(), // A 'empty' answer for a openQuestion can either be null or an empty string.
      ])
    )
  }

  return zodObject.merge(validationSchema)
}
function addMultipleChoiceQuestionValidation(zodObject: ZodObject<any>, question: MultipleChoiceQuestion) {
  let validationSchema: any = z.object({}).setKey(
    question.id,
    z.array(choiceUuidSchema)
      .min(question.minChoices)
      .max(question.maxChoices)
  )

  // Add optionality to schema if question is optional
  if (question.optional) {
    validationSchema = validationSchema.setKey(
      question.id,
      z.union([
        validationSchema.shape[question.id],
        z.array(choiceUuidSchema).length(0).nullable(), // A 'empty' answer for a multipleChoice can either be null or an empty array.
      ])
    )
  }

  return zodObject.merge(validationSchema)
}

function addSingleChoiceQuestionValidation(zodObject: ZodObject<any>, question: SingleChoiceQuestion) {
  let validationSchema = z.object({}).setKey(
    question.id,
    choiceUuidSchema
  )

  // Add optionality to schema if question is optional
  if (question.optional) {
    validationSchema = validationSchema.setKey(
      question.id,
      validationSchema.shape[question.id].nullable() // Because of the way we made singleChoiceQuestions act when we 'deselect' an option, the only options it can have are a uuid or null -> We add nullability to the pre-existing schema's shape (rules)
    )
  }

  return zodObject.merge(validationSchema)
}

function addScoreQuestionValidation(zodObject: ZodObject<any>, question: ScoreQuestion) {
  let validationSchema = z.object({}).setKey(
    question.id,
    z.number().int()
      .min(question.minScore)
      .max(question.maxScore)
  )

  // Add optionality to schema if question is optional
  if (question.optional) {
    validationSchema = validationSchema.setKey(
      question.id,
      validationSchema.shape[question.id].nullable() // Because of the way we made singleChoiceQuestions act when we 'deselect' an option, the only options it can have are a number or null -> We add nullability to the pre-existing schema's shape (rules)
    )
  }

  return zodObject.merge(validationSchema)
}

type ValidationSchema =
  z.ZodString
  | z.ZodNumber
  | z.ZodBranded<z.ZodString, 'ChoiceUuid'>
  | z.ZodArray<z.ZodBranded<z.ZodString, 'ChoiceUuid'>>

type QuestionsAnswerValidationForm = ZodObject<Record<string, z.ZodNullable<ValidationSchema> | ValidationSchema>>

// Vervolgvraag: moeten we zelfs answer met een speciale type hebben in elke vraag?
let formSchema: QuestionsAnswerValidationForm = z.object({})
for (let question of form1.questions) {
  switch (question.questionType) {
    case QuestionType.open:
      formSchema = addOpenQuestionValidation(formSchema, question as OpenQuestion)
      break
    case QuestionType.single:
      formSchema = addSingleChoiceQuestionValidation(formSchema, question as SingleChoiceQuestion)
      break
    case QuestionType.multiple:
      formSchema = addMultipleChoiceQuestionValidation(formSchema, question as MultipleChoiceQuestion)
      break
    case QuestionType.score:
      formSchema = addScoreQuestionValidation(formSchema, question as ScoreQuestion)
      break
    default:
      throw new Error("Invalid question type")
  }
}

const { form, onSubmitForm } = useForm({
  schema: formSchema
})

// Uitzoeken welt type die formData is!
function convertFormDataToAnswerDtos(formData: any): AnswerDto[] {
  const answers: AnswerDto[] = []
  for (let key in formData) {
    answers.push({
      questionId: key,
      answer: formData[key]
    })
  }
  return answers
}

class AnswerDto {
  questionId: string
  answer: string | number | string[]
}

onSubmitForm(async (data) => {
  console.log("Submitted!")
  console.log(convertFormDataToAnswerDtos(data))
})

function saveAnswersAndExit() {
  console.log("Saved!")
  console.log(convertFormDataToAnswerDtos(form.state))
  // Iets van router om te rerouten/exiten.
}

</script>

<template>
  <form @submit.prevent="form.submit()">
    <h1>{{form1.formName}}</h1>
    <div :key="question.id" v-for="(question) in form1.questions">
      <OpenQuestionComponent v-if="question.questionType == QuestionType.open" :question="question" :questionField="form.register(`${question.id}`)" />
      <MultipleChoiceQuestionComponent v-if="question.questionType == QuestionType.multiple" :question="question" :questionField="form.register(`${question.id}`)" />
      <SingleChoiceQuestionComponent v-if="question.questionType == QuestionType.single" :question="question" :questionField="form.register(`${question.id}`)" />
      <ScoreQuestionComponent v-if="question.questionType == QuestionType.score" :question="question" :questionField="form.register(`${question.id}`)"/>
      <hr>
    </div>
    <button type="button" @click="saveAnswersAndExit()">Save & exit</button>
    <button>Submit</button>
  </form>
</template>
