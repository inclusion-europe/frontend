<template>
  <a
    :class="`preview ${big ? ' preview--big' : ''}${
      !noPicture ? ' preview--has_picture' : ''
    }${blue ? ' preview--blue' : pink ? ' preview--pink' : ''}`"
  >
    <h3 class="preview-title" v-if="big">
      {{ article.title }}
    </h3>
    <div class="preview-picture" v-if="!noPicture">
      <img
        class="preview-picture-photo"
        :src="article.picture.src"
        :alt="article.picture.alt"
      />
      <img
        class="preview-picture-video"
        v-if="video"
        src="@/assets/play-button.svg"
        alt="Play button overlay"
      />
    </div>
    <div class="preview-content">
      <h3 class="preview-title" v-if="!big">
        {{ article.title }}
      </h3>
      <p class="preview-excerpt">{{ article.excerpt }}</p>
      <SeeAll :href="article.url" :blue="blue" :big="big">{{
        video ? "Watch now" : "Read more"
      }}</SeeAll>
    </div>
  </a>
</template>
<script>
import SeeAll from "./SeeAll.vue";

export default {
  name: "Preview",
  components: {
    SeeAll,
  },
  props: {
    big: {
      type: Boolean,
      default: false,
    },
    article: {
      type: Object,
      required: true,
    },
    noPicture: {
      type: Boolean,
      default: false,
    },
    blue: {
      type: Boolean,
      default: false,
    },
    pink: {
      type: Boolean,
      default: true,
    },
    video: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.preview {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 22px;
  align-items: center;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &-title {
    font-family: GilroySemiBold;
    font-size: 16px;
    font-weight: 600;
  }

  &-excerpt {
    font-family: GilroyRegular;
    font-size: 12px;
    font-weight: 400;
  }

  &--has_picture:not(.preview--big) {
    display: grid;
    grid-template-columns: auto auto;
  }

  &-picture {
    grid-column: 1;
    grid-row: 1 / -1;
    width: 205px;
    height: 156px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-video {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
      transform: translate(-50%, -50%);
    }
  }

  &:hover,
  &:focus-within {
    .preview-title,
    a {
      color: $ie-pink !important;
      transition: 0.2s ease-out;

      * {
        color: $ie-pink !important;
        fill: $ie-pink;
      }
    }
  }

  &--blue {
    &:hover,
    &:focus-within {
      .preview-title,
      a {
        color: $ie-blue !important;

        * {
          color: $ie-blue !important;
          fill: $ie-blue;
        }
      }
    }
  }

  &--pink {
    &:hover,
    &:focus-within {
      .preview-title,
      a {
        color: $ie-pink !important;

        * {
          color: $ie-pink !important;
          fill: $ie-pink;
        }
      }
    }
  }

  &--big {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .preview-picture {
      border-radius: 10px;
      width: 100%;
      height: 325px;
    }

    .preview-content {
      gap: 18px;
    }

    .preview-title {
      font-family: GilroySemiBold;
      font-size: 34px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/style/variables.scss";

.preview {
  &:hover,
  &:focus {
    .see_all {
      span {
        color: $ie-pink;
      }

      svg {
        fill: $ie-pink;
      }
    }
  }
}
</style>
