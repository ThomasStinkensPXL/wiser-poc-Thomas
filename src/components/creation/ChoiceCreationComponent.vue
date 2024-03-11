<script setup lang="ts">
import type { FieldArray } from 'formango'
import type { Choice } from '@/models/choice.model'
import FormInput from '@/components/inputs/FormInput.vue'

const props = defineProps<{
  choices: FieldArray<Choice[]>
  index: number
  questionIndex: number
}>()

const emit = defineEmits<{
  removeClicked: [index: number]
}>()


const choice = props.choices.register(`${props.index}`)

const choiceText = choice.register('choiceText', '')

function onRemove() {
  emit("removeClicked", props.index)
}
</script>

<template>
  <li>
    <FormInput :input-id="'choice' + index + questionIndex" input-type="text" label="" :input-name="'choice' + index + questionIndex" v-bind="choiceText" />
    <span>
      <button type="button" @click="onRemove">remove</button>
    </span>
  </li>
  <br>
</template>