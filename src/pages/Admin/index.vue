<template>
  <div class="admin">
    <h1 class="section-title">Admin</h1>
  </div>
</template>
<script>
export default {
  name: "Admin",
  mounted() {
    const code = this.$route.query.code;
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
      .then((res, err) => {
        console.log({
          err,
          res,
        });
      });
  },
};
</script>
