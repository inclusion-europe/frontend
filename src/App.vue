<template>
  <div class="website">
    <div class="under_const">
      <h3>The website is still under development, more updates coming soon!</h3>
    </div>
    <Header />
    <div v-if="loading" class="loading">
      <img src="/loading.gif" />
    </div>
    <router-view v-else :key="$route.fullPath" />
    <Footer />
    <ScrollUp />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollUp from "./elements/ScrollUp.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    loading: true,
  }),
  components: {
    Header,
    Footer,
    ScrollUp,
  },
  computed: {
    onAdminPage() {
      return this.$route.name === "admin";
    },
  },
  mounted() {
    document.title = process.env.VUE_APP_DEFAULT_TITLE;
    this.loadPosts().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions(["loadPosts"]),
  },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

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
  &:deep(.post_page) {
    width: var(--width);
    max-width: var(--max-width);
    margin: auto;
    padding-bottom: 30px;

    &-header {
      margin-bottom: 12px;
      .other_content-button {
        img {
          height: 45px;
          border-radius: 3px;
        }

        display: flex;
        align-items: center;
        gap: 12px;

        padding-left: 38px;
        padding-right: 38px;

        &.e2r-button {
          padding-left: 12px;
        }
      }
    }

    article {
      &:deep(.post-content) {
        h3 {
          color: #1e1e1e;
          font-size: 32px;
          font-family: GilroyBold;
          margin: 0;
          margin-bottom: 12px;
        }

        h4 {
          color: #ed0f69;
          font-family: GilroySemiBold;
          font-size: 32px;
          margin: 0;
          margin-bottom: 12px;
        }

        p,
        li {
          color: #1e1e1e;
          font-family: GilroyRegular;
          font-size: 22px;
        }

        strong {
          font-family: GilroySemiBold;
        }

        img {
          width: 100%;
          border-radius: 9px;
        }

        a {
          color: var(--ie-pink);
        }

        .inclusion_indicators-links {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 48px;

          a {
            color: #fff;
            padding: 6px 8px;
            border-radius: 4px;
            border: 2px;
            border-style: solid;
            background: var(--ie-blue);
            border-color: var(--ie-blue);
            transition: 0.2s ease-out;
            text-decoration: none;
            font-size: 20px;
            font-style: normal;
            font-family: GilroyBold;
            font-weight: 700;

            &:hover,
            &:focus:not(:disabled) {
              background: var(--ie-blue--transp);
              color: white !important;
            }
          }
        }
      }

      header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 28px;
        margin-bottom: 38px;

        .header_texts {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 31px;
          justify-content: space-between;

          h1 {
            color: #1e1e1e;
            font-size: 40px;
            font-family: GilroyBold;
            margin: 0;
          }

          h2 {
            color: #1e1e1e;
            font-size: 22px;
            font-family: GilroyRegular;
            margin: 0;
          }
        }

        img {
          width: 42%;
          border-radius: 9px;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        &.header--column {
          flex-direction: column;

          img {
            width: 100%;
            border-radius: 9px;
            aspect-ratio: 16 / 4;
            object-fit: cover;
          }
        }
      }

      .post-tags {
        .tag {
          color: var(--black);
        }
      }
    }

    &.static_page {
      header {
        flex-direction: column;

        img {
          width: 100%;
        }
      }
    }

    &.indicators_page {
      max-width: 90vw;

      article {
        header {
          width: var(--width);
          max-width: var(--max-width);
          margin: auto;
        }
        section {
          width: var(--width);
          max-width: var(--max-width);
          margin: auto;

          &.indicators-table {
            margin-top: 2rem;
            max-width: 90vw;
            width: fit-content;

            & > *:not(.countries-ranking) {
              width: var(--width);
              max-width: var(--max-width);
              margin-left: 0;
            }

            .countries-ranking {
              position: relative;
              left: calc((1128px - 100%) / 2);
            }

            h4 {
              width: var(--width);
              max-width: var(--max-width);
              color: #ed0f69;
              font-family: GilroySemiBold;
              font-size: 32px;
              margin: auto;
              margin-bottom: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
