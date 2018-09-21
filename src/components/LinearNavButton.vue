
<template>
  <div class="linear-nav-button">
    <div v-bind:class="{ 'linear-nav-prev': type == 'prev', 'linear-nav-next' : type == 'next' }" v-if="show">
        <router-link class="highlight-animation linear-nav-button-inner" v-bind:class="{ 'highlight-from-left': type == 'prev', 'highlight-from-right' : type == 'next' }" :to="link" v-bind:title="linkText">
            <i class="fa fa-fw" v-bind:class="{ 'fa-chevron-left': type == 'prev', 'fa-chevron-right' : type == 'next' }"></i><span class="link-text arrow-text-left">{{ linkText }}</span>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'linear-nav-button',
  props :   {
      type :    {
                    default: 'next'
                }
  },
  data : function(){
      return {
          index : -1,
      }
  },
  computed : {
    posts : function(){
      return this.$store.state.posts;
    },
    linkText : function(){
        if( this.type == 'prev' ){
            return 'Prev';
        }else if ( this.type == 'next' && 'home' == this.$route.name ){
            return 'Start';
        }else{
            return 'Next';
        }
    },
    link : function(){
        if( this.type == 'prev' ){
            //do not show if we are not on a post page
            if ( 'post' != this.$route.name ){
                return null;
            }
            //go back to home if we are on the first post page
            if ( this.index == 0 ){
                return '/';
            }
            if( this.index < 0 ){
                return;
            }
            let prevIndex = this.index - 1;

            if ( ! this.$store.state.postsByDate[ prevIndex ].hasOwnProperty('slug') ){
                return;
            }
            let prevSlug = this.$store.state.postsByDate[ prevIndex ].slug; 
            return { name: 'post', params: {slug: prevSlug } };
        }else if ( this.type == 'next' ){
            var nextIndex;
            //Do not show if there are no posts, we're on the last post,
            //or we aren't on a post page or the homepage
            if ( this.$store.state.numberOfPosts < 1 ||
                this.index == this.$store.state.numberOfPosts - 1 || 
                ( 'post' != this.$route.name &&
                'home' != this.$route.name )
                ){
                return null;
            }
            if( 'home' == this.$route.name ){
                    nextIndex = 0;
            }else{
                nextIndex = this.index + 1;
            }

            let nextSlug = this.$store.state.postsByDate[ nextIndex ].slug; 
            return { name: 'post', params: {slug: nextSlug } };
        }else{
            return null;
        }
    },
    show : function(){
        return this.link != null;
    }
  },
  methods: {
      updateIndex : function(){
        if ( this.$route.params.hasOwnProperty( 'slug' ) ){
            let slug = this.$route.params.slug;
            if( this.posts.hasOwnProperty( slug )){
                let indexCandidate = this.$store.getters.postIndex( slug );
                if( indexCandidate !== null ){
                    this.index = indexCandidate;
                }
               
            }
        }
      }
  },
  watch : {
    posts : function(){
        this.updateIndex();
    },
    $route () {
      this.updateIndex();
    }
  }
}
</script>
