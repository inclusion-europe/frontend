<template>
  <footer class="footer">
    <Socials v-if="!onAdminPage" />
    <div class="footer-content">
      <Newsletter dark-bg v-if="!onAdminPage" />
      <div class="footer-contact" v-if="!onAdminPage">
        <img src="@/assets/logo.svg" class="footer-contact-logo" />
        <h4>Inclusion Europe</h4>
        <h4>Avenue des Arts 3, 1210 Brussels, Belgium</h4>
        <h4>+32 25 02 28 15</h4>
        <h4>
          <a href="mailto:secretariat@inclusion-europe.org">
            secretariat@inclusion-europe.org
          </a>
        </h4>
      </div>
      <div class="footer-navigation">
        <a href="#">Privacy Policy</a>
        <a href="#">Contact</a>
        <a href="#">Sitemap</a>
        <a v-if="adminUrl" :href="adminUrl">Admin</a>
      </div>
      <h4 class="footer-copyright" v-if="!onAdminPage">
        © {{ currentYear }} Inclusion Europe, made with ❤️ by
        <a href="//kyng.be">Kyng Studios</a>
      </h4>
    </div>
  </footer>
</template>
<script>
import Socials from "./Socials.vue";
import Newsletter from "../Newsletter.vue";

export default {
  name: "Footer",
  components: {
    Socials,
    Newsletter,
  },
  computed: {
    redirect() {
      return `${encodeURI(window.location.origin)}/admin`;
    },
    clientId() {
      return process.env?.VUE_APP_IM_CLIENT_ID || false;
    },
    authServer() {
      return process.env?.VUE_APP_IM_AUTH_SERVER || false;
    },
    adminUrl() {
      if (!this.authServer || !this.clientId) return false;
      return `${this.authServer}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirect}&scope=openid&state=1234zyx`;
    },
    currentYear() {
      return new Date().getFullYear();
    },
    onAdminPage() {
      return this.$route.name === "admin";
    },
  },
  mounted() {
    console.log({
      env: process.env,
    });
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.footer {
  width: 100%;
  background: $black;
  padding: 40px 0;

  &-content {
    max-width: $max-width;
    margin: auto;
    margin-top: 40px;
    display: grid;
    grid-template: auto / 1fr 1fr;
    gap: 80px 135px;
  }

  h4 {
    color: white;
    font-family: GilroyRegular;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }

  a {
    color: white;
    font-family: GilroyRegular;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }

  &-navigation {
    display: flex;
    gap: 25px;
  }

  &-copyright {
    text-align: right;
  }

  &-contact {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    &-logo {
      width: 180px;
      margin-bottom: 20px;
    }
  }
}
</style>
