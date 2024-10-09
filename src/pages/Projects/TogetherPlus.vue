<template>
    <div class="post_page together_plus-page">
        <IeButton
            @click="$router.push('/projects')"
            boxed
            blue
            class="back-link"
            small
        >
            Back to projects
        </IeButton>
        <article>
            <header>
                <div class="header_texts">
                    <h1>Together +</h1>
                    <h2>
                        Together towards efficient and sustainable transition in
                        social care.
                    </h2>
                </div>
            </header>
            <section class="section__low-spacing post-section">
                <h2 class="section-title">About</h2>
                <p>
                    Ending segregation of people with intellectual disabilities
                    is the core of our work at Inclusion Europe. The Together+
                    project contributes to it by providing a training for those
                    who close down “care institutions”.
                </p>
                <p>
                    The main objective of the Together+ projects is to create a
                    comprehensive training programme focused on the management
                    of deinstitutionalisation that will reflect current trends
                    in social care across Europe.
                </p>
                <p>
                    The situation of people with disabilities more generally has
                    improved over time. However, this is not true for all people
                    and more limited for people with intellectual and
                    developmental disabilities, who are more likely to be living
                    in segregated or congregated settings and less likely to be
                    experiencing real inclusion.
                </p>
                <p>
                    The importance of self-advocacy, self-determination and
                    supporting people with disabilities to demand their rights
                    is highlighted, whether at an individual level with regards
                    to their own or at a local or national lobbying. People with
                    intellectual disability are particularly affected by a lack
                    of choice and control.
                </p>
            </section>
            <section class="section__low-spacing post-section">
                <h2 class="section-title">Technical Information</h2>
                <p>
                    <span>
                        <b>Project title: </b>
                        Together towards efficient and sustainable transition in
                        social care
                    </span>
                    <br />
                    <span>
                        <b>Application Registration Number: </b>
                        2022-1-CZ01-KA220-VET-000085587
                    </span>
                    <br />
                    <span>
                        <b>Date of implementation: </b>1 November 2022 - 31
                        October 2025
                    </span>
                    <br />
                    <span>
                        <b>Beneficiary: </b>Centrum podpory transformace,
                        o.p.s., Czechia
                    </span>
                </p>
                <p><b>Project partners:</b></p>
                <ul>
                    <li>Inclusion Europe</li>
                    <li>
                        <a
                            href="https://www.fundatia-speranta.ro/"
                            target="_blank"
                        >
                            Fundatia de Abilitare Speranta
                        </a>
                        , Romania
                    </li>
                    <li>
                        <a href="https://www.rpsp.eu/" target="_blank">
                            Rada pre poradenstvo v sociálnej práci
                        </a>
                        , Slovakia
                    </li>
                    <li>
                        <a href="https://viltis.lt/lt/" target="_blank">
                            Viltis
                        </a>
                        , Lithuania
                    </li>
                </ul>
                <p><b>Specific objectives of the project:</b></p>
                <ol>
                    <li>
                        To create an international platform focused on the
                        management of the DI process and on the exchange and
                        transfer of experience in the field of DI.
                    </li>
                    <li>
                        To develop methodological guidelines on the management
                        of the DI process.
                    </li>
                    <li>To develop a training programme on DI management.</li>
                </ol>
                <p><b>Implementation:</b></p>
                <ol>
                    <li>
                        Establish a platform for the exchange and transfer of
                        best practices related to deinstitutionalisation.
                    </li>
                    <li>
                        Create a manual for managing deinstitutionalisation.
                    </li>
                    <li>
                        Prepare a training programme for deinstitutionalisation
                        management, including training for future trainers of
                        the programme.
                    </li>
                    <li>Test the training.</li>
                    <li>Evaluation.</li>
                </ol>
            </section>
            <section class="section__low-spacing post-section">
                <p>The project is co-funded by the European Union.</p>
                <img
                    src="@/assets/european-union-color.png"
                    class="eu-logo"
                    alt="Co-funded by the European Union"
                />
            </section>
        </article>
    </div>
</template>
<script>
import IeButton from '@/elements/Button.vue';

export default {
    name: 'TogetherPlus',
    components: {
        IeButton,
    },
};
</script>
<style lang="scss" scoped>
.together_plus-page {
    .eu-logo {
        height: 5rem;
    }
}
</style>
