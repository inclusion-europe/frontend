<template>
  <div class="projects_page post_page">
    <article>
      <header>
        <div class="header_texts">
          <h1>Projects</h1>
        </div>
      </header>
      <section class="section__low-spacing projects-section">
        <div class="projects_buttons">
          <IeButton type="link" href="/together-plus-project" boxed blue>
            Together +
          </IeButton>
          <IeButton
            type="link"
            href="/supporting-rights-and-inclusion-of-people-with-intellectual-disabilities-and-their-families-in-ukraine"
            boxed
            blue
          >
            Ukraine support
          </IeButton>
          <IeButton type="link" href="/judy-project" boxed blue>
            JUDY Project
          </IeButton>
        </div>
      </section>
      <Project
        v-for="(project, i) in projects"
        :key="`project_${i}`"
        :project="project"
      />
    </article>
  </div>
</template>
<script>
import projectsData from '@/assets/datasets/projects.json';
import Project from './Project.vue';
import IeButton from '@/elements/Button.vue';

export default {
  name: 'ProjectsPage',
  components: {
    Project,
    IeButton,
  },
  computed: {
    projects() {
      return [...projectsData];
    },
  },
};
</script>
<style lang="scss" scoped>
.projects_buttons {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: stretch;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: stretch;

    & > * {
      flex-grow: 1;
    }
  }
}
</style>
