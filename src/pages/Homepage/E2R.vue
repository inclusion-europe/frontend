<template>
  <section class="easy_to_read-section">
    <h2 class="section-title section-title--blue">Easy-to-read</h2>
    <div class="easy_to_read-section-post_grid">
      <Preview :post="posts[0]" big blue />
      <div class="easy_to_read-section-post_grid-list">
        <Preview
          v-for="(post, i) in posts.slice(1, 5)"
          :key="`e2r_post_${i}`"
          :post="post"
          no-picture
          blue
        />
        <SeeAll v-if="posts.length > 6" href="/type/e2r" blue big>
          See all easy-to-read articles
        </SeeAll>
      </div>
    </div>
  </section>
</template>
<script>
import Preview from "@/elements/Preview.vue";
import SeeAll from "@/elements/SeeAll.vue";

export default {
  name: "E2R",
  components: {
    Preview,
    SeeAll,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.easy_to_read-section {
  width: var(--width);
  max-width: var(--max-width);
  margin: auto;
  margin-bottom: 130px;

  .section-title {
    text-align: center;
    margin: 37px auto;
    width: auto;
  }

  &-post_grid {
    display: grid;
    grid-template: auto / 1fr 1fr;
    gap: 150px 135px;
    align-items: start;

    &-list {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
  }

  &-see_all {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    text-decoration: none;
    width: fit-content;

    * {
      transition: all 0.2s ease-out;
    }

    span {
      color: var(--ie-blue);
      font-family: GilroySemiBold;
      font-size: 20px;
      font-weight: 600;
      line-height: 12px;
    }

    svg {
      height: 10px;
      fill: var(--ie-blue);
    }

    &:hover,
    &:focus {
      text-decoration: underline;

      * {
        color: var(--ie-pink);
        fill: var(--ie-pink);
      }
    }
  }
}
</style>
