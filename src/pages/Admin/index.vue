<template>
  <div class="admin" v-if="pageReady">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Admin",
  components: {},
  data: () => ({
    pageReady: false,
  }),
  mounted() {
    if (
      this.$cookies.get("im_auth_token") ||
      (process.env.VUE_APP_NOAUTH && process.env.VUE_APP_NOAUTH === "true")
    ) {
      this.pageReady = true;
      return;
    }

    const code = this.$route.query.code;
    const im_auth_state = this.$route.query.state;
    const im_auth_state_cookie = this.$cookies.get("im_auth_state");
    if (
      !code ||
      !im_auth_state ||
      !im_auth_state_cookie ||
      im_auth_state !== im_auth_state_cookie
    ) {
      console.error("Invalid authentication");
      this.$router.push("/");
      return;
    }

    this.$axios
      .post(
        "/login",
        {},
        {
          params: {
            callback: `${encodeURI(window.location.origin)}/admin`,
            code,
          },
        }
      )
      .then((res) => {
        if (!res.data || !res.data.access_token) {
          console.error("Invalid token response");
          this.$router.push("/");
          return;
        }

        let expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

        this.$cookies.set("im_auth_token", res.data.access_token, { expires });

        this.pageReady = true;
      })
      .catch((err) => {
        console.error({ err });
      });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.admin {
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  padding-bottom: 30px;
}

.url_preview {
  padding: 8px 15px;
}

.new_article-form {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px;

  label {
    margin-top: 9px;
    text-align: right;

    &:not(.file-label)::after {
      content: ":";
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
