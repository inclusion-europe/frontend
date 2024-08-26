<template>
    <footer class="footer">
        <div class="footer-content">
            <Newsletter dark-bg in-footer v-if="false && !onAdminPage" />
            <div v-else class="newsletter-temp-block">
                <h3>Stay in touch with us</h3>
                <IeButton
                    type="link"
                    :href="newsletterLink"
                    boxed
                    white
                    target="_blank"
                >
                    Subscribe to our newsletters!
                </IeButton>
            </div>
            <div v-if="!onAdminPage" class="footer-contact">
                <h4>Inclusion Europe</h4>
                <h4>Avenue des Arts 3, 1210 Brussels, Belgium</h4>
                <h4>+32 25 02 28 15</h4>
                <h4>
                    <a href="mailto:office@inclusion.eu">
                        office@inclusion.eu
                    </a>
                </h4>
                <img
                    src="@/assets/european-union.png"
                    class="footer-contact-eu-logo"
                    alt="Co-funded by the European Union"
                />
            </div>
            <Socials v-if="!onAdminPage" />
            <div class="footer-navigation">
                <!-- <a href="#">Sitemap</a> -->
                <a v-if="hasAdmin" @click="goToAdmin" href="#">Admin</a>
            </div>
            <h4 v-if="!onAdminPage" class="footer-copyright">
                © {{ currentYear }} Inclusion Europe, made with ❤️ by
                <a href="//kyng.be">Kyng Studios</a>
            </h4>
        </div>
    </footer>
</template>
<script>
import Socials from './Socials.vue';
import Newsletter from '../Newsletter.vue';
import IeButton from '@/elements/Button.vue';

export default {
    name: 'WebsiteFooter',
    components: {
        Socials,
        Newsletter,
        IeButton,
    },
    computed: {
        newsletterLink() {
            return process.env.VUE_APP_NWSLTR_FORM_ACTION;
        },
        redirect() {
            return `${encodeURI(window.location.origin)}/admin`;
        },
        clientId() {
            return process.env?.VUE_APP_IM_CLIENT_ID || false;
        },
        authServer() {
            return process.env?.VUE_APP_IM_AUTH_SERVER || false;
        },
        hasAdmin() {
            if (this.$cookies.get('im_auth_token')) return true;
            if (!this.authServer || !this.clientId) return false;
            return true;
        },
        currentYear() {
            return new Date().getFullYear();
        },
        onAdminPage() {
            return this.$route.name === 'admin';
        },
    },
    methods: {
        goToAdmin() {
            if (
                this.$cookies.get('im_auth_token') ||
                (process.env.VUE_APP_NOAUTH &&
                    process.env.VUE_APP_NOAUTH === 'true')
            ) {
                this.$router.push('/admin');
            } else {
                const scopes = ['openid', 'profile', 'email'];

                const scope = scopes.join(' ');

                const state = Math.round(Math.random() * 10e20).toString(16);
                const loginUrl = `${this.authServer}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirect}&scope=${scope}&state=${state}`;
                this.$cookies.set('imAuthState', state);
                window.location.href = loginUrl;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.footer {
    width: 100%;
    background: var(--dark-grey);
    padding: 15px 0;

    h4 {
        margin: 0 !important;
    }

    &-content {
        width: var(--width);
        max-width: var(--max-width);
        margin: auto;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;
    }

    h4 {
        color: white;
        font-family: GilroyRegular;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
    }

    a {
        color: white;
        font-family: GilroyRegular;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
    }

    &-navigation {
        display: flex;
        gap: 25px;
    }

    &-copyright {
        grid-column: 2 / -1;
        text-align: right;
    }

    &-contact {
        display: flex;
        flex-direction: column;
        line-height: 23px;

        &-eu-logo {
            width: 250px;
            margin-top: 20px;
        }
    }

    .newsletter-temp-block {
        h3 {
            font-family: GilroySemiBold;
            font-size: 20px;
            font-weight: 600;
            color: white;
        }
        width: 305px;
    }
}

@media screen and (min-width: 1024px) {
    .footer {
        padding: 40px 0;

        &-content {
            margin-top: 40px;
            display: grid;
            grid-template: auto / repeat(3, auto);
            align-items: start;
            gap: 80px 135px;
        }

        &-navigation {
            display: flex;
            gap: 25px;
        }

        &-copyright {
            grid-column: 2 / -1;
            text-align: right;
        }

        &-contact {
            display: flex;
            flex-direction: column;
            line-height: 23px;

            &-eu-logo {
                width: 250px;
                margin-top: 20px;
            }
        }

        .newsletter-temp-block {
            h3 {
                font-family: GilroySemiBold;
                font-size: 20px;
                font-weight: 600;
                color: white;
            }
            width: 305px;
        }
    }
}
</style>
