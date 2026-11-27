
module.exports = {
    pwa : {
        workboxOptions : {
            exclude: [/\.map$/, /manifest\.json$/, 'index.php'],
            runtimeCaching: [{
                // Match any request from our domain
                // TODO:   googleapis and cloudflare
                urlPattern: new RegExp('https://tmdesigned.com/wp/wp-content/.*'),
            
                // Apply a cache-first strategy.
                handler: 'NetworkFirst',
            
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
            navigateFallback : '/index.php',
            navigateFallbackAllowlist: [/^(?!\/wp\/).*/]
        }
    }
}