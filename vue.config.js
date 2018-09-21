
module.exports = {
    pwa : {
        workboxOptions : {
            runtimeCaching: [{
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: 'https://tmdesigned.com/.*',
            
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
            navigateFallback : '/index.html'
        }
    }
}