<template>
    <div class="projects_page post_page">
        <article>
            <header>
                <div class="header_texts">
                    <h1>Projects</h1>
                </div>
            </header>
            <div>
                <Deinstitutionalisation />
            </div>
        </article>
    </div>
</template>
<script>
import Deinstitutionalisation from './Deinstitutionalisation.vue';

export default {
    name: 'ProjectsPage',
    components: {
        Deinstitutionalisation,
    },
};
</script>
