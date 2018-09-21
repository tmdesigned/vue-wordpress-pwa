import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
 
Vue.use(VueResource);

Vue.use(Vuex)


const helper = {
  actions: {
    fetchAndStore : function( context, endpoint, commitMessage ){
      return new Promise((resolve) => {
        Vue.http.get('https://tmdesigned.com/wp/wp-json/' + endpoint ).then((response) => {
          context.commit( commitMessage,  response );
          resolve();
        });
      });
    },
    defer : function() {  //simple observer that can be resolved externally
      var res, rej;
    
      var promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
    
      promise.resolve = res;
      promise.reject = rej;
    
      return promise;
    }
  }
}

export default new Vuex.Store({
  state: {
    numberOfPosts : -1,
    posts : {}, //dictionary keyed on slug,
    pages : {}, //dictionary keyed on slug
    postsByDate : [], //array
    categories : {}, //dictionary keyed on id
    tags : {}, //dictionary keyed on id
    ready : null,
    postsLoaded : false,
    categoriesLoaded : false,
    tagsLoaded : false
  },
  modules : {
    helper : helper
  },
  getters : {
    postsLoaded : function(state){
      return state.postsLoaded;
    },
    totalPosts : function(state){
      return state.numberOfPosts;
    },
    posts: function( state ){
      return state.posts;
    },
    category: function( state ){
      return function( id ){
        if ( state.categories.hasOwnProperty( id ) ){
          return state.categories[ id ];
        }else{
          return null;
        }
      }
    },
    tag: function( state ){
      return function( id ){
        if ( state.tags.hasOwnProperty( id ) ){
          return state.tags[ id ];
        }else{
          return null;
        }
      }
    },
    postIndex : function( state ){
      return function( slug ){
        for( var i = 0; i < state.postsByDate.length; i++ ){
          if( state.postsByDate[ i ].slug == slug ){
            return i;
          }
        }
        return null;
      }
    },
    postListingBySlug : function( state ){
      return function( slug ){
        for( var i = 0; i < state.postsByDate.length; i++ ){
          if( state.postsByDate[ i ].slug == slug ){
            return state.postsByDate[ i ];
          }
        }
        return null;
      }
    }
  },
  mutations: {
    storePostList : function ( state, payload ){
      for( let post of payload.body ){
        post.categoriesEmbedded = [];
        post.tagsEmbedded = [];
        for( let category of post.categories ){
          post.categoriesEmbedded.push( state.categories[ category ] );
        }
        for( let tag of post.tags ){
          post.tagsEmbedded.push( state.tags[ tag ] );
        }
        state.postsByDate.push( post );
      }
    },
    storePosts : function(state, payload){
      if ( payload.hasOwnProperty( 'headers' ) &&
            payload.headers.hasOwnProperty( 'map' ) &&
            payload.headers.map.hasOwnProperty( 'x-wp-total' ) ){
              state.numberOfPosts = payload.headers.map[ 'x-wp-total' ][0];
            }
      for( let post of payload.body ){
        post.categoriesEmbedded = [];
        post.tagsEmbedded = [];
        for( let category of post.categories ){
          post.categoriesEmbedded.push( state.categories[ category ] );
        }
        for( let tag of post.tags ){
          post.tagsEmbedded.push( state.tags[ tag ] );
        }
        Vue.set(state.posts, post.slug, post ); //stored by id as object
      }
      state.postsLoaded = true;
    },
    storePages : function(state, payload){
      for( let page of payload.body ){
        Vue.set(state.pages, page.slug, page ); //stored by id as object
      }
    },
    storeMorePosts : function(state, payload){
      for( var post of payload.body ){
        post.categoriesEmbedded = [];
        post.tagsEmbedded = [];
        for( let category of post.categories ){
          post.categoriesEmbedded.push( state.categories[ category ] );
        }
        for( let tag of post.tags ){
          post.tagsEmbedded.push( state.tags[ tag ] );
        }
        Vue.set(state.posts, post.slug, post ); //stored by id as object
      }
    },
    storeCategories : function(state, payload){
      for( var category of payload.body ){
        Vue.set(state.categories, category.id, category );
      }
      state.categoriesLoaded = true;
    },
    storeTags : function(state, payload){
      for( var tag of payload.body ){
        Vue.set(state.tags, tag.id, tag );
      }
      state.tagsLoaded = true;
    },
    load : function( state ){
      state.ready = helper.actions.defer();
    },
    ready : function( state ){
      state.ready.resolve();
    }
  },
  actions: {
    fetchInitialData( context ) {
      return new Promise( function( resolve ){
        context.commit( 'load' );
        var fetchCategories = helper.actions.fetchAndStore( context, 'wp/v2/categories', 'storeCategories' );
        var fetchTags = helper.actions.fetchAndStore( context, 'wp/v2/tags', 'storeTags' );
        var fetchPostList;
        var fetchPosts;
        var fetchPages;
        Promise.all( [fetchCategories, fetchTags ] ).then(function(){
          //store posts once category and id dictionaries are ready so they can be added onto them
          fetchPostList = helper.actions.fetchAndStore( context, 'tmdesigned/v1/postlist', 'storePostList' );
          fetchPosts = helper.actions.fetchAndStore( context, 'wp/v2/posts', 'storePosts' );
          fetchPosts = helper.actions.fetchAndStore( context, 'wp/v2/pages', 'storePages' );

        });
        Promise.all( [ fetchPostList, fetchPosts, fetchPages, fetchCategories, fetchTags ] ).then( function(){
          context.commit( 'ready' );
          resolve();
        });
      });
    },
    prepPostRange( context, range ){
      return new Promise( function( resolve ){
        if( context.state.postsByDate.length >= ( range.page * range.perPage ) ){
          resolve(); //have already fetched requested post range
        }else{
          let endpoint = 'wp/v2/posts?page=' + range.page + '&per_page=' + range.perPage;
          helper.actions.fetchAndStore( context, endpoint, 'storeMorePosts' ).then( function(){
            resolve();
          });
        }
      });
    },
    prepPost( context, slug ){
      return new Promise( function( resolve ){
        if( context.state.posts.hasOwnProperty( slug ) ){
          resolve(); //have already fetched requested post 
        }else{
          let endpoint = 'wp/v2/posts?slug=' + slug;
          helper.actions.fetchAndStore( context, endpoint, 'storeMorePosts' ).then( function(){
            resolve();
          });
        }
      });
    },
    prepPage( context, slug ){
      return new Promise( function( resolve ){
        if( context.state.pages.hasOwnProperty( slug ) ){
          resolve(); //have already fetched requested post 
        }else{
          let endpoint = 'wp/v2/pages?slug=' + slug;
          helper.actions.fetchAndStore( context, endpoint, 'storePages' ).then( function(){
            resolve();
          });
        }
      });
    }
  }
})




