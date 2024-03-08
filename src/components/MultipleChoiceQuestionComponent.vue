<script setup lang="ts">
import type { MultipleChoiceQuestion } from '@/models/questions/multipleChoiceQuestion.model'
import type { Field } from 'formango'
import { z } from 'zod'
import { computed } from 'vue'
import FormChoiceInput from '@/components/inputs/FormChoiceInput.vue'

const props = defineProps<{
  question: MultipleChoiceQuestion,
  questionField: Field<((string & z.BRAND<"ChoiceUuid">)[])>
}>()

props.questionField.setValue(props.question.answer?.choices ?? []) // Moet hier een lege array zijn! (Mag geen null zijn zoals bij de andere dingen!)

const errorShown = computed(() => props.questionField.errors && props.questionField.errors._errors.length > 0 && props.questionField.isTouched )
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
    <div :id="props.question.id">
      <div v-bind:key="choice.id" v-for="choice of props.question.choices">
        <FormChoiceInput v-bind="props.questionField" :input-id="choice.id" input-type="checkbox" :label="choice.choiceText" :input-name="props.question.id" :value="choice.id"/>
      </div>

      <p
        v-if="errorShown"
        class="text-red-600"
      >
        {{ props.questionField.errors!._errors[0] }}
      </p>
    </div>
  </div>
</template>