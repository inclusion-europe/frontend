<template>
    <div v-if="pageReady" class="admin">
        <router-view />
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';

export default {
    name: 'AdminPanel',
    components: {},
    data: () => ({
        pageReady: false,
    }),
    mounted() {
        if (
            this.$cookies.get('im_auth_token')
            || (process.env.VUE_APP_NOAUTH
                && process.env.VUE_APP_NOAUTH === 'true')
        ) {
            this.pageReady = true;
            return;
        }

        const { code } = this.$route.query;
        const imAuthState = this.$route.query.state;
        const imAuthStateCookie = this.$cookies.get('imAuthState');
        if (
            !code
            || !imAuthState
            || !imAuthStateCookie
            || imAuthState !== imAuthStateCookie
        ) {
            toast('Invalid authentication');
            this.$router.push('/');
            return;
        }

        this.$axios
            .post(
                '/login',
                {},
                {
                    params: {
                        callback: `${encodeURI(window.location.origin)}/admin`,
                        code,
                    },
                },
            )
            .then((res) => {
                if (!res.data || !res.data.access_token) {
                    toast('Invalid token response');
                    this.$router.push('/');
                    return;
                }

                const expires = new Date(
                    new Date().getTime() + 2 * 60 * 60 * 1000,
                );

                this.$cookies.set('im_auth_token', res.data.access_token, {
                    expires,
                });

                this.pageReady = true;
            })
            .catch(() => {
                toast(
                    'Error loading the admin panel, please contact the developer.',
                );
                this.$router.push('/');
            });
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.admin {
    width: var(--width);
    max-width: var(--max-width);
    margin: auto;
    padding-bottom: 30px;
}

.url_preview {
    padding: 8px 15px;
}

.new_post-form {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 10px;

    label {
        margin-top: 9px;
        text-align: right;

        &:not(.file-label)::after {
            content: ':';
        }
    }

    .full_row {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .submit_button {
        justify-self: center;
        margin-top: 1rem;
    }
}
</style>
