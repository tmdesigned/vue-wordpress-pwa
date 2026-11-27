<template>
  <div class="page">
    <div v-if="pageNotFound">No matching page was found.</div>
    <div v-else class="page-area">
      <div class="page-title-area">
        <h1>{{ pageData.title }}</h1>
      </div>
      <article v-html="pageData.content"></article>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page',
  computed: {
    pageData() {
      return this.$store.state.pages[this.$route.meta.slug] || {};
    },
    pageNotFound() {
      return !this.$store.state.pages.hasOwnProperty(this.$route.meta.slug);
    }
  }
}
</script>
