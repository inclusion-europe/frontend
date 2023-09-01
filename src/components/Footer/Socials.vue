<template>
  <div class="socials">
    <a
      class="social_button"
      target="_blank"
      href="https://twitter.com/inclusioneurope"
      type="link"
    >
      Twitter
    </a>
    <a
      class="social_button"
      target="_blank"
      href="https://www.linkedin.com/company/inclusion-europe/"
      type="link"
    >
      LinkedIn
    </a>
    <a
      class="social_button"
      target="_blank"
      href="https://www.youtube.com/channel/UCbMENufeAkmK_jrDmMWV-xA"
      type="link"
    >
      YouTube
    </a>
    <a
      class="social_button"
      target="_blank"
      href="https://www.facebook.com/inclusioneurope"
      type="link"
    >
      Facebook
    </a>
  </div>
</template>
<script>
export default {
  name: "Socials",
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.socials {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  .social_button {
    color: white;
    transition: 0.2s ease-out;

    &:hover,
    &:focus {
      color: $ie-pink;
    }
  }
}
</style>
