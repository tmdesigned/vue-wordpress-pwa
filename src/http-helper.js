import Vue from 'vue';

export default {
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