<template>
  <div class="archive">
    <h1>Archive of Blog Posts</h1>
    <div v-if="loading">LOADING</div>
    <div v-if="!loading" class="post-list-area">
        <div class="pagination-area">
          <div class="pagination">
            <a class="button archive-prev-page highlight-animation highlight-from-left" v-on:click="prevPage" :class="{ 'disabled' : !hasPrevious}"><i class="fa fa-chevron-left"></i></a>
            <div class="sub-info archive-nav"> Showing {{ first }}-{{ last }} of {{ totalPosts }} posts.</div>
            <a class="button archive-next-page highlight-animation highlight-from-right" v-on:click="nextPage" :class="{ 'disabled' : !hasNext}"><i class="fa fa-chevron-right"></i></a>
          </div>
        </div>
        <ul class="post-list">
          <li v-for="post in postsToShow" :key="'post-' + post.slug">
             <router-link :to="{ name: 'post', params: {slug: post.slug } }">
              <article class="post-list-item highlight-animation highlight-shutter-out">
                <div class="post-thumbnail" v-bind:style="{ backgroundImage: 'url(' + post.featured_image + ')' }">
                </div>
                <div class="post-details">
                  <h3 v-html="post.title"></h3>
                  <div class="sub-info post-date">{{ post.postDate }}</div>
                  <!-- <div class="tags">
                    <span class="tag" v-for="tag in post.tagsEmbedded" :key="'tag-' + tag.slug">
                    {{ tag.name }}
                    </span>
                  </div> -->
                  <div class="excerpt" v-html="post.excerpt">
                  </div>
                </div>
              </article>
            </router-link>
          </li>
        </ul>
        <div class="pagination-area">
          <div class="pagination">
            <a class="button archive-prev-page highlight-animation highlight-from-left" v-on:click="prevPage" :class="{ 'disabled' : !hasPrevious}"><i class="fa fa-chevron-left"></i></a>
            <div class="sub-info archive-nav"> Showing {{ first }}-{{ last }} of {{ totalPosts }} posts.</div>
            <a class="button archive-next-page highlight-animation highlight-from-right" v-on:click="nextPage" :class="{ 'disabled' : !hasNext}"><i class="fa fa-chevron-right"></i></a>
          </div>
        </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'archive',
  data : function(){
    return {
      loading : true,
      postsToShow : [],
      currentPage : 0, 
      postsPerPage : 5
    }
  },
  computed : {
    postsByDate : function(){ //local copy of all posts from store
      return this.$store.state.postsByDate;
    },
    totalPosts : function(){
      return this.$store.state.numberOfPosts;
    },
    totalLoadedPosts: function(){
      return this.$store.state.postsByDate.length;
    },
    hasPrevious : function(){
      return this.currentPage > 0;
    },
    hasNext : function(){
      return ( this.currentPage + 1 ) * this.postsPerPage < this.totalPosts;
    },
    first : function(){
      return this.postsPerPage * this.currentPage;
    },
    last : function(){
      return this.postsPerPage * ( this.currentPage + 1 ) < this.totalPosts ? 
                this.postsPerPage * ( this.currentPage + 1 ) : 
                this.totalPosts > 0 ? 
                this.totalPosts :
                0;
    }
  },
  watch :{
    postsByDate : {
      immediate: true,
      handler : function(){
        this.updateShownPosts();
      }
    },
    last : {
      handler : function(){
        this.updateShownPosts();
      }
    }
  },
  methods :{
    nextPage : function(){
      if( this.hasNext ){
        this.currentPage++;
        this.updateShownPosts();
      }
    },
    prevPage : function(){
      if( this.hasPrevious ){
        this.currentPage--;
        this.updateShownPosts();
      }
    },
    updateShownPosts(){
      let ranges = {
        page : this.currentPage + 1,
        perPage: this.postsPerPage
      }
      
      this.$store.dispatch( 'prepPostRange', ranges ).then( () => {
        if( this.last > 0 ){
          this.loading = false;
          this.postsToShow = this.postsByDate.slice( this.first, this.last );

        }
        
      });
    }
  }
}
</script>
