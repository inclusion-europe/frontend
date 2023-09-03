<template>
  <div class="admin">
    <h1 class="section-title">New article</h1>
    <form class="new_article-form">
      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="excerpt">Excerpt</label>
      <textinput name="excerpt" rows="3" />

      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="title">Title</label>
      <input type="text" name="title" />
    </form>
  </div>
</template>
<script>
export default {
  name: "Admin",
  mounted() {
    const code = this.$route.query.code;
    // this.$axios
    //   .post(
    //     "/login",
    //     {},
    //     {
    //       params: {
    //         callback: `${encodeURI(window.location.origin)}/admin`,
    //         code,
    //       },
    //     }
    //   )
    //   .then((res, err) => {
    //     console.log({
    //       err,
    //       res,
    //     });
    //   });
  },
};
</script>
