<script setup lang="ts">

import type { FieldArray } from 'formango'
import type { QuestionTypes } from '@/models/form/formCreationSchema.model'
import OpenQuestionCreationComponent from '@/components/creation/OpenQuestionCreationComponent.vue'
import { QuestionType } from '@/models/enums/questionType.enum'
import QuestionTypeSelectComponent from '@/components/creation/QuestionTypeSelectComponent.vue'
import FormTrueFalseCheckBox from '@/components/inputs/FormTrueFalseCheckBox.vue'
import MultipleChoiceCreationComponent from '@/components/creation/MultipleChoiceCreationComponent.vue'

const props = defineProps<{
  questions: FieldArray<QuestionTypes[]>
  index: number
}>()

const emit = defineEmits<{
  downClicked: [index: number],
  remove: [index: number]
}>()

const question = props.questions.register(`${props.index}`)
const questionType = question.register('questionType', QuestionType.multiple)
const optional = question.register('optional', false)

function onDown() {
  emit("downClicked", props.index)
}


function test() {
  props.questions.remove(props.index)
}
</script>

<template>
  <div>
    <h3>Question {{ props.index }}</h3>
    <FormTrueFalseCheckBox :input-id="'optional' + index" input-type="checkbox" label="Optional: " :input-name="'optional' + index" v-bind="optional" />
<!--    Misschien beter om ergens een array/enum op te slaan van de verschillende soorten vragen    -->
<!--    Opletten, de onSelect event fzo moet misschien de data resetten van de question die ge-registered is.   -->
    <QuestionTypeSelectComponent v-bind="questionType" />
    <OpenQuestionCreationComponent v-if="questionType.modelValue == QuestionType.open" :question="question" :index="props.index"/>
    <MultipleChoiceCreationComponent v-if="questionType.modelValue == QuestionType.multiple" :question="question" :index="props.index" />
    <p v-if="question.errors?._errors">{{question.errors._errors[0]}}</p>
    <button type="button" @click="onDown">Down</button>
    <button type="button" @click="test">remove</button>
  </div>
</template>

<style scoped>

</style>