<template>
  <div class="currently">
    <section class="currently-events">
      <h2 class="currently-events-title section-title">
        Meetings & Conferences
      </h2>
      <p>No events planned yet.</p>
    </section>
    <section class="currently-campaigns">
      <h2 class="currently-campaigns-title section-title">Campaigns</h2>
      <div class="currently-campaigns-grid">
        <Button boxed blue>End segregation</Button>
        <Button boxed blue>Help Ukraine</Button>
        <Button boxed pink class="full-grid">Support our work</Button>
        <Button boxed blue class="full-grid">All campaigns</Button>
      </div>
    </section>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";
export default {
  name: "Currently",
  components: {
    Button,
  },
};
</script>
<style lang="scss" scoped>
.currently {
  grid-column: 1 / 3;
  display: grid;
  grid-template: auto / 1fr 1fr;
  gap: 135px;

  &-campaigns {
    &-grid {
      display: grid;
      grid-template: fit-content fit-content / 1fr 1fr 1fr;
      gap: 15px;
      width: fit-content;

      .full-grid {
        grid-column: 1 / 3;
      }
    }
  }
}
</style>
