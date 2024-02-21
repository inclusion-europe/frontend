import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const beforeEach = (to, from, next) => {
    let titlePrefix = '';
    if (to.meta.title) {
        titlePrefix = `${to.meta.title} | `;
    }
    document.title = titlePrefix + process.env.VUE_APP_DEFAULT_TITLE;
    next();
};

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach(beforeEach);

export default router;
