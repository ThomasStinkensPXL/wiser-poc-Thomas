<script setup lang="ts">
import type { Field } from 'formango'
import type { MultipleChoiceQuestion } from '@/models/questions/multipleChoiceQuestion.model'
import FormInput from '@/components/inputs/FormInput.vue'
import ChoiceCreationComponent from '@/components/creation/ChoiceCreationComponent.vue'

const props = defineProps<{
  question: Field<MultipleChoiceQuestion>,
  index: number
}>()

const minChoices = props.question.register('minChoices')
const maxChoices = props.question.register('maxChoices')
const questionText = props.question.register('questionText')
const questionHint = props.question.register('questionHint')

const choices = props.question.registerArray('choices')

// ^een multiplechoice moet sws 2 dingen hebben!
function onAdd() {
  // om index/sortorder te zetten zouden we hier bij de append een volledig object aanmaken en voor alles een waarde al geven (dus ook de sortorder/index), maar datis minder nice.
  // een andere optie is om pas bij het POSTEN van de echte FORM de sortorder te zetten. Dan moeten we het optional maken in de frontend, maar wel ZEKER nakijken in de backend.
  choices.append()
}

async function onRemoveClicked(index: number) {
  console.log(index)
  await choices.remove(index)
  console.log("removed")
}
</script>

<template>
  <FormInput
    :input-id="'text' + props.index"
    input-type="text"
    label="Question:"
    :input-name="'text' + props.index"
    v-bind="questionText"
  />
  <FormInput
    :input-id="'hint' + props.index"
    input-type="text"
    label="Description: "
    :input-name="'hint' + props.index"
    v-bind="questionHint"
  />
  <FormInput
    :input-id="'minChoices' + props.index"
    input-type="number"
    label="Min"
    :input-name="'minChoices' + props.index"
    v-bind="minChoices"
  />
  <FormInput
    :input-id="'maxChoices' + props.index"
    input-type="number"
    label="Max"
    :input-name="'maxChoices' +props.index"
    v-bind="maxChoices"
  />
  <li>
    <ChoiceCreationComponent @removeClicked="onRemoveClicked" v-for="(choiceField, key) in choices.fields" :key="choiceField" :index="key" :choices="choices" :question-index="index" />
    <p v-if="choices.errors?._errors && choices.errors?._errors.length > 0">{{choices.errors._errors}}</p>
  </li>
  <button type="button" @click="onAdd">Add new choice</button>
</template>