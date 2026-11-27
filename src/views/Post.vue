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

const SITE_URL = 'https://tmdesigned.com';
const SITE_NAME = 'tmdesigned';
const DEFAULT_DESCRIPTION = 'Join Taylor Morgan, software engineer, in an exploration of the techniques and technologies powering the modern web.';
const DEFAULT_IMAGE = SITE_URL + '/img/icons/android-chrome-512x512.png';

// Strip HTML tags so the excerpt is plain text for meta content.
function plainText(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function absoluteUrl(value) {
  if (!value) return DEFAULT_IMAGE;
  if (/^https?:\/\//.test(value)) return value;
  return SITE_URL + (value.startsWith('/') ? '' : '/') + value;
}

export default {
  name: 'post',
  // Per-post title and social meta. vue-head replaces tags by id, so these update
  // on navigation rather than duplicating.
  head() {
    const post = this.postData;
    const title = post.title ? `${post.title} | ${SITE_NAME}` : SITE_NAME;
    const description = plainText(post.excerpt) || DEFAULT_DESCRIPTION;
    const image = absoluteUrl(post.featured_image);
    const url = `${SITE_URL}/post/${this.$route.params.slug}`;
    return {
      title: { inner: title, separator: '', complement: '' },
      meta: [
        { name: 'description', content: description, id: 'desc' },
        { property: 'og:type', content: 'article', id: 'og-type' },
        { property: 'og:site_name', content: SITE_NAME, id: 'og-site' },
        { property: 'og:title', content: title, id: 'og-title' },
        { property: 'og:description', content: description, id: 'og-desc' },
        { property: 'og:image', content: image, id: 'og-image' },
        { property: 'og:url', content: url, id: 'og-url' },
        { name: 'twitter:card', content: 'summary_large_image', id: 'tw-card' },
        { name: 'twitter:title', content: title, id: 'tw-title' },
        { name: 'twitter:description', content: description, id: 'tw-desc' },
        { name: 'twitter:image', content: image, id: 'tw-image' }
      ]
    };
  },
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
