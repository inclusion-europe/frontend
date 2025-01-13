<template>
    <div
        class="staff_member"
        :class="{
            'staff_member--big': props.big,
            'staff_member--no_pic': !props.member.image,
        }"
    >
        <div class="staff_member__image" v-if="props.member.image">
            <img :src="generatedImg" :alt="props.member.name" />
        </div>
        <div class="staff_member__info">
            <!-- <h3>{{ props.member.name }}</h3> -->
            <!-- <p>{{ props.member.title }}</p> -->
            <p v-if="props.member.copy" v-html="props.member.copy" />
        </div>
        <div class="staff_member__links">
            <a v-if="props.member.email" :href="`mailto:${props.member.email}`">
                <i class="fa-solid fa-envelope"></i>
                &nbsp;
                <span>{{ props.member.email }}</span>
            </a>
            <a v-if="props.member.linkedin" :href="props.member.linkedin">
                <i class="fa-brands fa-linkedin"></i>
                &nbsp;
                <span>Follow {{ props.member.name.split(' ')[0] }}</span>
            </a>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    member: Object,
    big: Boolean,
});

const generatedImg = computed(() => {
    const folder = require.context('@/assets/staff/', false, /\.jpg$/);
    return folder(`./${props.member.image}`);
});
</script>
<style lang="scss" scoped>
.staff_member {
    display: flex;
    flex-direction: column;
    align-items: center;

    &--no_pic {
        display: block;
    }

    &__image {
        width: 100%;
        max-width: 300px;

        img {
            border-radius: 9px;
            width: 100%;
            height: auto;
        }
    }

    &__links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;

        a {
            text-decoration: none;
        }
    }
}

@media screen and (min-width: 768px) {
    .staff_member {
        width: 22%;

        &--big {
            width: 30%;

            .staff_member__image {
                border-radius: 9px;
            }
        }

        &--no_pic {
            width: 100%;
        }

        &__image img {
            width: 100%;
            max-width: none;
            border-radius: 4px !important;
        }
    }
}
</style>
