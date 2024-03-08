<script setup lang="ts">
import { computed } from 'vue'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
	inputName: string,
  inputId: string,
	label: string,
	inputType: string,
	isTouched?: boolean,
	isDirty?: boolean,
	errors?: ZodFormattedError<string> | undefined,
  putLabelRight?: boolean
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

const errorShown = computed(() => props.errors && props.errors._errors.length > 0 && props.isTouched)
</script>

<template>
	<div class="w-full pb-2">
		<label
			class="block py-1 font-semibold"
			:for="props.inputName"
			v-if="!putLabelRight">{{ props.label }}</label
		>
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
      v-if="putLabelRight"
    >{{ props.label }}</label
    >
		<p
			v-if="errorShown"
			class="text-red-600"
		>
			{{ props.errors!._errors[0] }}
		</p>
	</div>
</template>
