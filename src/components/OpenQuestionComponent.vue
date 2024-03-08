<script setup lang="ts">
import type { OpenQuestion } from '@/models/questions/openQuestion.model'
import type { Field } from 'formango'
import FormInput from '@/components/inputs/FormInput.vue'

const props = defineProps<{
  question: OpenQuestion
  questionField: Field<string>
}>()

props.questionField.setValue(props.question.answer?.answerText ?? null)
</script>

<template>
  <div>
    <label :for="props.question.id">
      <span style="text-underline: #181818">
        {{ props.question.questionText }}
      </span>
      <br>
      <span style="font-style: italic">
        {{ props.question.questionHint }}
      </span>
    </label>
    <br>
<!--    <input :model-value="props.questionField" :name="props.question.id" :id="props.question.id" placeholder="Type here">-->
    <FormInput
      :input-id="props.question.id"
      input-type="text"
      label=""
      :input-name="props.question.id"
      v-bind="props.questionField" />
  </div>
</template>