<script setup lang="ts">

import type { OpenQuestion } from '@/models/questions/openQuestion.model'
import FormInput from '@/components/inputs/FormInput.vue'
import type { Field } from 'formango'

const props = defineProps<{
  question: Field<OpenQuestion>,
  index: number
}>()

const minLength = props.question.register('minLength')
const maxLength = props.question.register('maxLength')
</script>

<template>
<!--   Een specific number input maken met HTML min en max er al in misschien?   -->
  <FormInput
    :input-id="'minLength' + props.index"
    input-type="number"
    label="Min. chars: "
    :input-name="'minLength' + props.index"
    v-bind="minLength"
  />
  <FormInput
    :input-id="'maxLength' + props.index"
    input-type="number"
    label="Max. chars: "
    :input-name="'maxLength' + props.index"
    v-bind="maxLength"
  />
</template>

<style scoped>

</style>