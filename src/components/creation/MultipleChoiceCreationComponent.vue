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

const choices = props.question.registerArray('choices')

function onAdd() {
  choices.append()
}

function onRemoveClicked(index: number) {
  choices.remove(index)
}
</script>

<template>
  <FormInput
    :input-id="'minChoices' + props.index"
    input-type="number"
    label="Min. choices: "
    :input-name="'minChoices' + props.index"
    v-bind="minChoices"
  />
  <FormInput
    :input-id="'maxChoices' + props.index"
    input-type="number"
    label="Max. choices: "
    :input-name="'maxChoices' +props.index"
    v-bind="maxChoices"
  />
  <li>
    <ChoiceCreationComponent @removeClicked="onRemoveClicked" v-for="(choiceField, key) in choices.fields" :key="choiceField" :index="key" :choices="choices" :question-index="index" />
    <p v-if="choices.errors?._errors && choices.errors?._errors.length > 0">{{choices.errors._errors}}</p>
  </li>
  <button type="button" @click="onAdd">Add new choice</button>
</template>