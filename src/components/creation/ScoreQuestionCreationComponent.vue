<script setup lang="ts">
import type { Field } from 'formango'
import type { ScoreQuestion } from '@/models/questions/scoreQuestion.model'
import FormInput from '@/components/inputs/FormInput.vue'

const props = defineProps<{
  question: Field<ScoreQuestion>,
  index: number
}>()

const minScore = props.question.register('minScore')
const minLabel = props.question.register('minLabel')

const maxScore = props.question.register('maxScore')
const maxLabel = props.question.register('maxLabel')

</script>

<template>
  <FormInput
    :input-id="'minLabel' + props.index"
    input-type="text"
    label="Min. label: "
    :input-name="'minLabel' + props.index"
    v-bind="minLabel"
  />
  <FormInput
    :input-id="'maxLabel' + props.index"
    input-type="text"
    label="Max. label: "
    :input-name="'maxLabel' + props.index"
    v-bind="maxLabel"
  />
  <FormInput
    :input-id="'minScore' + props.index"
    input-type="number"
    label="Min. score: "
    :input-name="'minScore' + props.index"
    v-bind="minScore"
  />
  <FormInput
    :input-id="'maxScore' + props.index"
    input-type="number"
    label="Max. score:"
    :input-name="'maxScore' +props.index"
    v-bind="maxScore"
  />
</template>