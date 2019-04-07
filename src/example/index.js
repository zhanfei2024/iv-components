const routes  =  [
    {
        path: '/chartPie',
        component: (resolve) => require(['./routers/chartPie.vue'], resolve)
    },
    {
        path: '/chartBar',
        component: (resolve) => require(['./routers/chartBar.vue'], resolve)
    },
    {
        path: '/drawer',
        component: (resolve) => require(['./routers/drawer.vue'], resolve)
    },
    {
        path: '/editor',
        component: (resolve) => require(['./routers/editor.vue'], resolve)
    },
    {
        path: '/viewImage',
        component: (resolve) => require(['./routers/viewImage.vue'], resolve)
    }
]
export default routes