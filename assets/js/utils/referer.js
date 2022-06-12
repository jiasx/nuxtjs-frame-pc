export default {
    refererKey: 'referer',
    allowedSetRefererPaths: ['/activity/rank'],
    set(path) {
        if (this.access(path)) {
            sessionStorage.setItem(this.refererKey, path)
        }
    },
    get() {
        return sessionStorage.getItem(this.refererKey)
    },
    del() {
        sessionStorage.removeItem(this.refererKey)
    },
    access(path) {
        return this.allowedSetRefererPaths.indexOf(path) > -1
    },
    redirect() {

        if (!this.get()) return

        $nuxt.$router.push(this.get());
        this.del()
    }
}