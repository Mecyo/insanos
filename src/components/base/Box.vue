<template>
  <v-layout row >
    <v-flex xs12>
      <v-card class="card--flex-toolbar">
        <v-toolbar v-if="title" card dense :color="color" prominent >
          <v-toolbar-title class="body-2">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <slot name="buttons-header"></slot>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons-footer"></slot>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      title: String,
      color: {
        default: 'primary',
        type: String,
      },
    },
  };

</script>