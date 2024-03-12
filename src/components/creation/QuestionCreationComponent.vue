<script setup lang="ts">

import type { FieldArray } from 'formango'
import type { QuestionTypes } from '@/models/form/formCreationSchema.model'
import OpenQuestionCreationComponent from '@/components/creation/OpenQuestionCreationComponent.vue'
import { QuestionType } from '@/models/enums/questionType.enum'
import QuestionTypeSelectComponent from '@/components/creation/QuestionTypeSelectComponent.vue'
import FormTrueFalseCheckBox from '@/components/inputs/FormTrueFalseCheckBox.vue'
import MultipleChoiceCreationComponent from '@/components/creation/MultipleChoiceCreationComponent.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import ScoreQuestionCreationComponent from '@/components/creation/ScoreQuestionCreationComponent.vue'
import SingleChoiceCreationComponent from '@/components/creation/SingleChoiceCreationComponent.vue'

const props = defineProps<{
  questions: FieldArray<QuestionTypes[]>
  index: number
}>()

const emit = defineEmits<{
  downClicked: [index: number],
}>()

const question = props.questions.register(`${props.index}`)
const questionType = question.register('questionType', question.modelValue?.questionType ?? QuestionType.open)
const optional = question.register('optional')
const questionText = question.register('questionText')
const questionHint = question.register('questionHint')

function onDown() {
  emit("downClicked", props.index)
}


function removeQuestion() {
  props.questions.remove(props.index)
}
</script>

<template>
  <div>
    <h3>Question {{ props.index }}</h3>
    <FormTrueFalseCheckBox :input-id="'optional' + index" input-type="checkbox" label="Optional: " :input-name="'optional' + index" v-bind="optional" />
    <FormInput
      :input-id="'text' + props.index"
      input-type="text"
      label="Question: "
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
    <br>
<!--    Misschien beter om ergens een array/enum op te slaan van de verschillende soorten vragen    -->
<!--    Opletten, de onSelect event fzo moet misschien de data resetten van de question die ge-registered is.   -->
    <div>
      <QuestionTypeSelectComponent v-bind="questionType"/>
      <div>
        <ScoreQuestionCreationComponent v-if="questionType.modelValue == QuestionType.score" :question="question" :index="props.index"/>
        <OpenQuestionCreationComponent v-if="questionType.modelValue == QuestionType.open" :question="question" :index="props.index"/>
        <MultipleChoiceCreationComponent v-if="questionType.modelValue == QuestionType.multiple" :question="question" :index="props.index" />
        <SingleChoiceCreationComponent v-if="questionType.modelValue == QuestionType.single" :question="question" :index="props.index" />
      </div>
    </div>
    <p v-if="question.errors?._errors">{{question.errors._errors[0]}}</p>
    <button type="button" @click="onDown">Move Down</button>
    <button type="button" @click="removeQuestion">Remove Question</button>
  </div>
</template>

<style scoped>

</style>