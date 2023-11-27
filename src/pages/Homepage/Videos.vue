<template>
  <section class="videos-section">
    <h2 class="section-title section-title--pink">Videos</h2>
    <div class="videos-section-video_grid">
      <Preview
        v-for="(video, i) in videos"
        :key="`videos_article_${i}`"
        :article="video"
        video
      />
      <SeeAll href="#" big>See all videos</SeeAll>
    </div>
  </section>
</template>
<script>
import utils from "@/scripts/utils";
import Preview from "@/elements/Preview.vue";
import SeeAll from "@/elements/SeeAll.vue";

export default {
  name: "Videos",
  components: {
    Preview,
    SeeAll,
  },
  computed: {
    videos() {
      return utils.articlesArray(4);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.videos-section {
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  margin-bottom: 130px;

  .section-title {
    text-align: center;
    margin: 37px auto;
    width: auto;
  }

  &-video_grid {
    display: grid;
    grid-template: auto / 1fr 1fr;
    gap: 40px 135px;
    align-items: start;
  }
}
</style>
<style lang="scss">
.videos-section {
  .see_all {
    grid-column: 2;
  }
}
</style>
