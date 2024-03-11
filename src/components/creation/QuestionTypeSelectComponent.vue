<script setup lang="ts">

import { QuestionType } from '@/models/enums/questionType.enum'

const model = defineModel<QuestionType>()
</script>

<template>
  <select v-model="model">
    <option :value="QuestionType.open">
      Open
    </option>
    <option :value="QuestionType.single">
      Single
    </option>
    <option :value="QuestionType.multiple">
      Multiple
    </option>
    <option :value="QuestionType.score">
      Score
    </option>
  </select>
</template>

<style scoped>

</style>