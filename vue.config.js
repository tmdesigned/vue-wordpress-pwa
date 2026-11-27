
module.exports = {
    publicPath: '/',
    pwa : {
        workboxOptions : {
            exclude: [/\.map$/, /manifest\.json$/],
            navigateFallback : '/index.html',
            navigateFallbackDenylist: [/^\/admin/]
        }
    }
}
