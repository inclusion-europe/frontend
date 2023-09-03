import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/scripts/axios'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
VueMarkdownEditor.lang.use('en-US', enUS);

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.use(router).use(VueMarkdownEditor).mount('#app')
