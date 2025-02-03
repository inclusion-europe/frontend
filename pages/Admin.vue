<template>
  <div v-if="pageReady" class="admin">
    <NuxtPage :page-key="(route) => route.fullPath" />
  </div>
</template>
<script setup>
import useMyFetch from '~/composables/useMyFetch';
const config = useRuntimeConfig();
const route = useRoute();

const imAuthToken = useCookie('im_auth_token', {
  maxAge: 2 * 60 * 60 * 1000,
});
const imAuthStateCookie = useCookie('im_auth_state');

const pageReady = ref(false);

onMounted(() => {
  if (imAuthToken.value || config.public.noauth) {
    pageReady.value = true;
    if (route.name === 'Admin') {
      navigateTo('/admin/posts');
    }
    // navigateTo('/admin/posts');
    return;
  }

  const { code } = route.query;
  const imAuthState = route.query.state;

  if (
    !code ||
    !imAuthState ||
    !imAuthStateCookie.value ||
    imAuthState !== imAuthStateCookie.value
  ) {
    useNuxtApp().$toast.error('Invalid authentication');
    navigateTo('/');
    return;
  }

  useMyFetch('/login', {
    method: 'POST',
    params: {
      callback: `${encodeURI(window.location.origin)}/admin`,
      code,
    },
  })
    .then((res) => {
      if (!res || !res.access_token) {
        useNuxtApp().$toast.error('Invalid token response');
        navigateTo('/');
        return;
      }

      imAuthToken.value = res.access_token;

      pageReady.value = true;

      if (route.name === 'Admin') {
        navigateTo('/admin/posts');
      }
    })
    .catch((e) => {
      console.log(e);
      useNuxtApp().$toast.error(
        'Error loading the admin panel, please contact the developer.'
      );
      navigateTo('/');
    });
});
</script>
<style lang="scss" scoped>
.admin {
  width: var(--width);
  max-width: var(--max-width);
  margin: auto;
  padding-bottom: 30px;
}

.url_preview {
  padding: 8px 15px;
}

.new_post-form {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px;

  label {
    margin-top: 9px;
    text-align: right;

    &:not(.file-label)::after {
      content: ':';
    }
  }

  .full_row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit_button {
    justify-self: center;
    margin-top: 1rem;
  }
}
</style>
