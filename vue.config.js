
module.exports = {
    pwa : {
        workboxOptions : {
            runtimeCaching: [{
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: new RegExp('https://tmdesigned.com/wp/wp-content/.*'),
            
                // Apply a cache-first strategy.
                handler: 'CacheFirst',
            
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
                handler: 'NetworkFirst',
            
                options: {
                  // Use a custom cache name.
                  cacheName: 'tmd-post-cache',
            
                  expiration: {
                    maxEntries: 50,
                  }
                }
            }],
            navigateFallback : '/index.html',
            navigateFallbackAllowlist: [/^(?!\/wp\/).*/]
        }
    }
}