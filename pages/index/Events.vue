<template>
  <section class="events-section">
    <h2 class="section-title section-title--blue">Events</h2>
    <div class="events-section-event_grid">
      <div class="events-section-event_grid-list">
        <Preview
          v-for="(event, i) in posts.slice(0, 3)"
          :key="`events_event_${i}`"
          :post="event"
          blue
        />
      </div>
      <div class="events-section-event_grid-list" v-if="posts.length > 3">
        <Preview
          v-for="(event, i) in posts.slice(3, 6)"
          :key="`events_event_${i}`"
          :post="event"
          blue
        />
      </div>
    </div>
    <SeeAll v-if="posts.length > 6" href="/type/events" blue big>
      See all events
    </SeeAll>
  </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
  name: 'EventsSection',
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
<style lang="scss" scoped></style>
