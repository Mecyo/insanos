<template>
  <base-box :title="$t('attention')">
    <p>{{$t('notAuthorized')}}</p>
  </base-box>
</template>

<script>
export default {
  name: 'not-authorized',
  data() {
    return {};
  },
};

</script>
