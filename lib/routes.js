const routes = Object.freeze({
    root: '/',
    users: {
        _: '/users',
        new: '/users/new',
        profile: (id => `/users/${id}`)
    },
    tools: {
        ctxTimer: '/tools/ctxtimer'
    }
})

export { routes };