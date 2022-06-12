module.exports = {
    apps: [
        {
            name: 'ent-services-pc',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: 'nuxt',
            args: 'start'
        }
    ]
};
