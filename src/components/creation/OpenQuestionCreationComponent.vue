<script setup lang="ts">

import type { OpenQuestion } from '@/models/questions/openQuestion.model'
import FormInput from '@/components/inputs/FormInput.vue'
import type { Field } from 'formango'
import { ref } from 'vue'

const props = defineProps<{
  question: Field<OpenQuestion>,
  index: number
}>()

// Op een manier moeten we de index van een question zetten (inputveld?) -> of iets met het pijltje dat het gaat 'verplaatsen'

const minLength = props.question.register('minLength')
const maxLength = props.question.register('maxLength')
const questionText = props.question.register('questionText')
const questionHint = props.question.register('questionHint')
</script>

<template>
<!--   Een specific number input maken met HTML min en max er al in misschien?   -->
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
    :input-id="'minLength' + props.index"
    input-type="number"
    label="Min"
    :input-name="'minLength' + props.index"
    v-bind="minLength"
  />
  <FormInput
    :input-id="'maxLength' + props.index"
    input-type="number"
    label="Max"
    :input-name="'maxLength' + props.index"
    v-bind="maxLength"
  />
</template>

<style scoped>

</style>