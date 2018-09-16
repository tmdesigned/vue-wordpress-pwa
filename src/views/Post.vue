
<template>
  <div class="post">
    <div v-if="loading">LOADING</div>
    <div v-if="!loading && postNotFound">No matching post was found.</div>
    <div v-if="!loading && !postNotFound" class="post-area">
      <div class="post-title-area">
        <h1>{{ this.postData.title.rendered }}</h1>
        <div class="sub-info post-date">{{ this.postDate }}</div>
      </div>
      <div class="post-featured-image">
        <img :src="postData.featuredImage" alt="" aria-hidden="true">
      </div>
      <article v-html="postData.content.rendered"></article>
    </div>
    <div class="related-posts-area">
      <ul class="related-posts">
          <li class="related-post" v-for="relatedPost in postData['jetpack-related-posts']" :key="'related-post-' + relatedPost.id">
          </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'post',
  data : function(){
    return {
      loading : false,
      postNotFound : false,
      postData : {
        featuredImage : '',
        title : {
          rendered : ''
        },
        content : {
          rendered : ''
        },
        "jetpack-related-posts" : []
      }
    }
  },
  mounted : function(){
    this.preparePost();
  },
  computed : {
    posts : function(){
      return this.$store.state.posts;
    },
    postDate : function(){
      let date = new Date( this.postData.date );
      if( isNaN(date.getTime()) ) return '';
      var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
      let m = month[ date.getMonth() ];
      let d = date.getDate();
      let y = date.getFullYear();
      return m + ' ' + d + ', ' + y;
    },
    postListing : function(){
      return this.$store.getters.postListingBySlug( this.postData.slug );
    }
  },
  methods : {
    preparePost : function(){
        this.$store.dispatch( 'prepPost', this.$route.params.slug ).then( () => {
          this.loading = false;
          if( this.posts.hasOwnProperty( this.$route.params.slug ) ){
            this.postData = this.posts[ this.$route.params.slug ];
            this.postNotFound = false;

          }else{
            this.postNotFound = true;
          }
        });
    }
  },
  watch :{
    posts : function(){
      this.preparePost();
    },
    postListing : function( val ){
      if( val && val.hasOwnProperty( 'featured_image' ) ){
        this.postData.featuredImage = val.featured_image;
      }
    },
    $route : function(){
      this.preparePost();
    }
  }
}
</script>
