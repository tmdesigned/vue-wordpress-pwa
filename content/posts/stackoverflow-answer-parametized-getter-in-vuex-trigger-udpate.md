---
title: "StackOverflow Answer: Parametized getter in Vuex - trigger udpate"
slug: "stackoverflow-answer-parametized-getter-in-vuex-trigger-udpate"
date: "2018-09-03"
excerpt: "## Original question: [Parametized getter in Vuex - trigger udpate](http://StackOverflow.com/q/52148561) * * * ## My answer: My Vuex store has a collection of data, say 1,000 records. There is a getter with a parameter, getItem, taking an I"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Parametized getter in Vuex - trigger udpate](http://StackOverflow.com/q/52148561)

* * *

## My answer:

My Vuex store has a collection of data, say 1,000 records. There is a getter with a parameter, getItem, taking an ID and returning the correct record.

I need components accessing that getter to know when the data is ready (when the asynchronous fetching of all the records is done).

However since it's a parametized getter, Vue isn't watching the state it depends on to know when to update it. What should I do?

I keep wanting to revert to a BehaviorSubject pattern I used in Angular a lot, but Vuex + rxJS seems heavy for this, right?

I feel I need to somehow emit a trigger for the getter to recalculate.

store.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    numberOfPosts : -1,
    posts : {}, //dictionary keyed on slug
    postsLoaded : false,
  },
  getters : {
    postsLoaded : function(state){
      return state.postsLoaded;
    },
    totalPosts : function(state){
      return state.numberOfPosts;
    },
    post: function( state ){
      return function(slug){
        if( state.posts.hasOwnProperty( slug ) ){
          return state.posts.slug;
        }else{
          return null;
        }
      }
    }
  },
  mutations: {
    storePosts : function(state, payload){
      state.numberOfPosts = payload.length;
      for( var post of payload ){
        state.posts[ post.slug ] = post;
      }
      state.postsLoaded = true;
    }
  },
  actions: {
    fetchPosts(context) {
      return new Promise((resolve) => {
        Vue.http.get(' {url redacted} ').then((response) => {
          context.commit('storePosts', response.body);
          resolve();
        });
      });
    }
  }
})
```

Post.vue

```
 <template>
      <div class="post">
        <h1>This is a post page for {{ $route.params.slug }}</h1>
        <div v-if="!postsLoaded">LOADING</div>
        <div v-if="postNotFound">No matching post was found.</div>
        <div v-if="postsLoaded && !postNotFound" class="post-area">
          {{ this.postData.title.rendered }}
        </div>
      </div>
    </template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'post',
  data : function(){
    return {
      loading : true,
      postNotFound : false,
      postData : null
    }
  },
  mounted : function(){
    this.postData = this.post( this.$route.params.slug );
    if ( this.postData == null ){
      this.postNotFound = true;
    }
  },
  computed : mapGetters([
    'postsLoaded',
    'post'
  ])
}
</script>
```

As it stands, it shows the "post not found" message because when it accesses the getter, the data isn't ready yet. If a post isn't found, I need to distinguish between (a) the data is loaded and there isn't a post that matches, and (b) the data isn't loaded so wait
