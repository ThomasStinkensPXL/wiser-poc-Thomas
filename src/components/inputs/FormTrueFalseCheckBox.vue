<script setup lang="ts">
const props = defineProps<{
  inputName: string,
  inputId: string,
  label: string,
  inputType: string,
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
      @blur="onBlur"
    />
    <label
      class="block py-1 font-semibold"
      :for="props.inputName"
    >{{ props.label }}</label
    >
  </div>
</template>