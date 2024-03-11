<script setup lang="ts">
import type { OpenQuestion } from '@/models/questions/openQuestion.model'
import type { ScoreQuestion } from '@/models/questions/scoreQuestion.model'
import { computed, ref } from 'vue'
import type { Field } from 'formango'
import { z } from 'zod'
import FormChoiceInput from '@/components/inputs/FormChoiceInput.vue'

const props = defineProps<{
  question: ScoreQuestion
  questionField: Field<number>
}>()

props.questionField.setValue(props.question.answer?.score ?? null)

const scoreRange = computed(() => {
  const scoreOptions = [];
  for (let score = props.question.minScore; score <= props.question.maxScore; score++) {
    scoreOptions.push(score);
  }
  return scoreOptions;
});

const errorShown = computed(() => props.questionField.errors && props.questionField.errors._errors.length > 0 && props.questionField.isTouched && props.questionField.modelValue != null )
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
      <span>{{ props.question.minLabel }}</span>
      <div v-for="score in scoreRange" v-bind:key="props.question.id + score">
        <FormChoiceInput v-bind="props.questionField" :input-id=" props.question.id + score" input-type="radio" :label="score" :value="score" :input-name="props.question.id" />
      </div>
      <span>{{ props.question.maxLabel }}</span>

      <p
        v-if="errorShown"
        class="text-red-600"
      >
        {{ props.questionField.errors!._errors[0] }}
      </p>
    </div>
  </div>
</template>