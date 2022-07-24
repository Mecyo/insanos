<template>
  <div>
    <base-loader :isVisible="$spinner.visible"></base-loader>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
}
</script>
