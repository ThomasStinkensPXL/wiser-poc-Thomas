<script setup lang="ts">
import type { Field } from 'formango'
import type { MultipleChoiceQuestion } from '@/models/questions/multipleChoiceQuestion.model'
import type { SingleChoiceQuestion } from '@/models/questions/singleChoiceQuestion.model'
import ChoiceCreationComponent from '@/components/creation/ChoiceCreationComponent.vue'
import FormInput from '@/components/inputs/FormInput.vue'

const props = defineProps<{
  question: Field<SingleChoiceQuestion>,
  index: number
}>()

const choices = props.question.registerArray('choices')

function onAdd() {
  choices.append()
}

function onRemoveClicked(index: number) {
  choices.remove(index)
}
</script>

<template>
  <button type="button" @click="onAdd">Add new choice</button>
  <li>
    <ChoiceCreationComponent @removeClicked="onRemoveClicked" v-for="(choiceField, key) in choices.fields" :key="choiceField" :index="key" :choices="choices" :question-index="index" />
    <p v-if="choices.errors?._errors && choices.errors?._errors.length > 0">{{choices.errors._errors}}</p>
  </li>
</template>