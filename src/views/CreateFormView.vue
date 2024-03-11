<script setup lang="ts">

import { useForm } from 'formango'
import { formCreationSchema } from '@/models/form/formCreationSchema.model'
import { QuestionType } from '@/models/enums/questionType.enum'
import QuestionCreationComponent from '@/components/creation/QuestionCreationComponent.vue'
import type { MultipleChoiceQuestion } from '@/models/questions/multipleChoiceQuestion.model'
import type { SingleChoiceQuestion } from '@/models/questions/singleChoiceQuestion.model'

let currentIndex = 0;
const { form, onSubmitForm } = useForm({
  schema: formCreationSchema,
})

const questions = form.registerArray('questions')

function onAdd() {
  // om index/sortorder te zetten zouden we hier bij de append een volledig object aanmaken en voor alles een waarde al geven (dus ook de sortorder/index), maar datis minder nice.
  // een andere optie is om pas bij het POSTEN van de echte FORM de sortorder te zetten. Dan moeten we het optional maken in de frontend, maar wel ZEKER nakijken in de backend.
  questions.append()
}


function trySubmit() {
  for (let questionIndex in questions.modelValue) {
    const question = questions.modelValue[questionIndex]
    question.index = Number.parseInt(questionIndex)

    if (question.questionType == QuestionType.multiple) {
      for (let choiceIndex in (question as MultipleChoiceQuestion).choices) {
        (question as MultipleChoiceQuestion).choices[choiceIndex].index = Number.parseInt(choiceIndex)
      }
    } else if (question.questionType == QuestionType.single) {
      for (let choiceIndex in (question as SingleChoiceQuestion).choices) {
        (question as SingleChoiceQuestion).choices[choiceIndex].index = Number.parseInt(choiceIndex)
      }
    }
  }
console.log(questions.modelValue)

  form.submit()
}

onSubmitForm(async (data) => {
  console.log("Submitted!")
})

function downClicked(fromIndex: number) {
  if (questions.fields.length >= fromIndex + 2) {
    questions.move(fromIndex, fromIndex + 1)
  }
}

</script>

<template>
  <form @submit.prevent="trySubmit">
    <QuestionCreationComponent @downClicked="downClicked" v-for="(questionField, key) in questions.fields" :key="questionField" :questions="questions" :index="key"/>
    <button type="button" @click="onAdd">add</button>
    <button>Submit</button>
  </form>
</template>

<style scoped>

</style>