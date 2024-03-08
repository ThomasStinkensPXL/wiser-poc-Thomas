<script setup lang="ts">
import { computed } from 'vue'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  inputName: string,
  inputId: string,
  label: string,
  inputType: string,
  value: string | number
}>()

const emit = defineEmits<{
  blur: []
}>()

const model = defineModel<number | string | null>({
  required: true,
})

function onBlur(): void {
  emit('blur')
}

// Nodig een radiobutton te kunnen deselecten.
function buttonSelected(value: string | number) {
  if (props.inputType == "radio") {
    if (model.value == value) {
      model.value = null
    } else {
      model.value = value
    }
  }
}
</script>

<template>
  <div class="w-full pb-2">
    <!--    USE I18N!!!! -->
    <input
      :id="props.inputName"
      v-model="model"
      class="box-border w-full rounded-lg bg-light-lightest px-4 py-3 text-dark"
      :name="props.inputName"
      placeholder="type here"
      :type="props.inputType"
      :value="props.value"
      @click="buttonSelected(props.value)"
      @blur="onBlur"
    />
    <label
      class="block py-1 font-semibold"
      :for="props.inputName"
    >{{ props.label }}</label
    >
  </div>
</template>
