
module.exports = {
    pwa : {
        workboxOptions : {
            runtimeCaching: [{
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: /tmdesigned/,
            
                // Apply a cache-first strategy.
                handler: 'cacheFirst',
            
                options: {
                  // Use a custom cache name.
                  cacheName: 'tmd-cache',
            
                  expiration: {
                    maxEntries: 50,
                  },
                },
              }],
        }
    }
}