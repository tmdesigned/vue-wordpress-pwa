
<template>
  <div class="page">
      {{ $route.params.slug }}
    <div v-if="loading">LOADING</div>
    <div v-if="!loading && pageNotFound">No matching page was found.</div>
    <div v-if="!loading && !pageNotFound" class="page-area">
      <div class="page-title-area">
        <h1>{{ this.pageData.title.rendered }}</h1>
      </div>
      <article v-html="pageData.content.rendered"></article>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page',
  data : function(){
    return {
      loading : false,
      pageNotFound : false,
      pageData : {
        title : {
          rendered : ''
        },
        content : {
          rendered : ''
        }
      }
    }
  },
  mounted : function(){
    this.preparePage();
  },
  computed : {
    pages : function(){
      return this.$store.state.pages;
    },
    slug : function(){
        return this.$route.meta.slug;
    }
  },
  methods : {
    preparePage : function(){
        this.$store.dispatch( 'prepPage', this.$route.meta.slug ).then( () => {
          this.loading = false;
          if( this.pages.hasOwnProperty( this.$route.meta.slug ) ){
            this.pageData = this.pages[ this.$route.meta.slug ];
            this.pageNotFound = false;
          }else{
            this.pageNotFound = true;
          }
        });
    }
  },
  watch :{
    pages : function(){
      this.preparePage();
    }
  }
}
</script>
