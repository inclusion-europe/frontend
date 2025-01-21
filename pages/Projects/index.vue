<template>
    <div class="projects_page post_page">
        <article>
            <header>
                <div class="header_texts">
                    <h1>Projects</h1>
                </div>
            </header>
            <section class="section__low-spacing projects-section">
                <div class="projects_grid">
                    <IeButton
                        type="link"
                        href="/together-plus-project"
                        boxed
                        blue
                    >
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
