<template>
  <div class="post">
    <div v-if="postNotFound">No matching post was found.</div>
    <div v-else class="post-area">
      <div class="post-title-area">
        <h1>{{ postData.title }}</h1>
        <div class="sub-info post-date">{{ postDate }}</div>
      </div>
      <div v-if="postData.featured_image" class="post-featured-image">
        <img :src="postData.featured_image" alt="" aria-hidden="true">
      </div>
      <article v-html="postData.content"></article>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/format-date.js';

export default {
  name: 'post',
  computed: {
    postData() {
      return this.$store.getters.postListingBySlug(this.$route.params.slug) || {};
    },
    postNotFound() {
      return !this.$store.state.posts.hasOwnProperty(this.$route.params.slug);
    },
    postDate() {
      return formatDate(this.postData.date);
    }
  },
  watch: {
    $route() {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
</script>
