
module.exports = {
    pwa : {
        workboxOptions : {
            runtimeCaching: [{
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: 'https://tmdesigned.com/wp/wp-content/.*',
            
                // Apply a cache-first strategy.
                handler: 'cacheFirst',
            
                options: {
                  // Use a custom cache name.
                  cacheName: 'tmd-media-cache',
            
                  expiration: {
                    maxEntries: 50,
                  }
                }
            },
            {
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: 'https://tmdesigned.com/wp/wp-json/.*',
            
                // Apply a cache-first strategy.
                handler: 'networkFirst',
            
                options: {
                  // Use a custom cache name.
                  cacheName: 'tmd-post-cache',
            
                  expiration: {
                    maxEntries: 50,
                  }
                }
            }],
            navigateFallback : '/index.html',
            navigateFallbackWhitelist: [/^(?!\/wp\/).*/]
        }
    }
}