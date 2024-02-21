import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import cookie from 'cookiejs';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import router from '@/router';
import store from '@/store';
import axios from '@/scripts/axios';
import 'vue3-toastify/dist/index.css';
import App from '@/App.vue';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
VueMarkdownEditor.lang.use('en-US', enUS);

const app = createApp(App).use(store);

app.use(Vue3Toastify, {
    autoClose: 3000,
});

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$cookies = cookie;
app.config.globalProperties.$store = store;
app.use(router).use(VueMarkdownEditor).mount('#app');
