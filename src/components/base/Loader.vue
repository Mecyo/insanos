<template>
  <v-overlay
    :value="isVisible"
  >
    <v-progress-circular indeterminate size="64">
      {{text}}
    </v-progress-circular>
  </v-overlay>
</template>

<script>
  export default {
    name: 'Loader',

    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: 'Carregando...',
      },
    }
  }
</script>
