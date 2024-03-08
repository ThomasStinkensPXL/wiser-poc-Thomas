<script setup lang="ts">
import type { SingleChoiceQuestion } from '@/models/questions/singleChoiceQuestion.model'
import { computed, ref } from 'vue'
import type { Field } from 'formango'
import { z } from 'zod'
import FormChoiceInput from '@/components/inputs/FormChoiceInput.vue'

const props = defineProps<{
  question: SingleChoiceQuestion
  questionField: Field<(string & z.BRAND<"ChoiceUuid">)>
}>()

props.questionField.setValue(props.question.answer?.choice ?? null)

const errorShown = computed(() => props.questionField.errors && props.questionField.errors._errors.length > 0 && props.questionField.isTouched && props.questionField.modelValue != null ) // We kijken na of het niet null is omdat het terug naar null gaat mochten we deselecten (na deselect is touched true! dus we doen nog een extra check!) ----> Dit kan wel misschien een probleem vormen met het valideren van required.
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
        <FormChoiceInput v-bind="props.questionField" :input-id="choice.id" input-type="radio" :label="choice.choiceText" :value="choice.id" :input-name="question.id" />
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