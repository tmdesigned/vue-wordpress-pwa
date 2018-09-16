
<template>
  <div class="linear-nav">
    <linear-nav-button type="prev" />
    <linear-nav-button type="next" />
  </div>
</template>

<script>
import LinearNavButton from '@/components/LinearNavButton.vue';

export default {
  name: 'linear-nav',
  components : {
    LinearNavButton
  }, 
}
</script>
