<template>
    <div class="website">
        <div class="under_const">
            <h3>
                The website is still under development, more updates coming
                soon!
            </h3>
        </div>
        <WebsiteHeader />
        <div v-if="loading" class="loading">
            <img src="/loading.gif" />
        </div>
        <router-view v-else :key="$route.fullPath" />
        <WebsiteFooter />
        <ScrollUp />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import WebsiteHeader from './components/Header';
import WebsiteFooter from './components/Footer';
import ScrollUp from './elements/ScrollUp.vue';

export default {
    name: 'App',
    components: {
        WebsiteHeader,
        WebsiteFooter,
        ScrollUp,
    },
    data: () => ({
        loading: true,
    }),
    computed: {
        onAdminPage() {
            return this.$route.name === 'admin';
        },
    },
    mounted() {
        document.title = process.env.VUE_APP_DEFAULT_TITLE;
        this.loadPosts().then(() => {
            this.loading = false;
        });
    },
    methods: {
        ...mapActions(['loadPosts']),
    },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
<style lang="scss" scoped>
.loading {
    display: flex;
    min-height: calc(100vh - 400px);
    align-items: center;
    justify-content: center;

    img {
        width: 60%;
    }
}

.under_const {
    background: var(--ie-blue);
    min-height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;

    h3 {
        margin: 0;
        color: white;
        font-size: 16px;
    }
}

.website {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;

    &:deep(.header + *) {
        flex-grow: 1;
    }
}

@media screen and (min-width: 1024px) {
}
</style>
