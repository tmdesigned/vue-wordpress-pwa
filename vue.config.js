
module.exports = {
    publicPath: '/',
    pwa : {
        workboxOptions : {
            // Never precache the CMS admin or source maps; the admin must always load fresh.
            exclude: [/\.map$/, /manifest\.json$/, /^admin\//],
            // Take control of open pages as soon as a new worker activates, so tabs stop
            // serving the previous deploy's cached app shell.
            skipWaiting: true,
            clientsClaim: true,
            navigateFallback : '/index.html',
            navigateFallbackDenylist: [/^\/admin/]
        }
    }
}
