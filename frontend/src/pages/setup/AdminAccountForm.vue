<template>
  <q-form ref="form" class="q-gutter-md">
    <q-input
      filled
      v-model="setupState.form.username"
      :label="$t('setup.adminForm.usernameLabel')"
      :hint="$t('setup.adminForm.usernameHint')"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('validation.required', { field: $t('setup.adminForm.username') }),
        (val) => /^[_a-zA-Z0-9]{3,16}$/.test(val) || $t('setup.adminForm.usernameRule'),
      ]"
    />

    <q-input
      filled
      v-model="setupState.form.password"
      type="password"
      :label="$t('setup.adminForm.passwordLabel')"
      :hint="$t('setup.adminForm.passwordHint')"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || $t('validation.required', { field: $t('setup.adminForm.password') }),
        (val) =>
          /^([a-z]|[A-Z]|[\d~@#$%\*-\+=:,\\?\[\]\{}]){6,30}$/.test(val) ||
          $t('setup.adminForm.passwordRule'),
      ]"
    />

    <q-input
      filled
      v-model="setupState.form.confirmPassword"
      type="password"
      :label="$t('setup.adminForm.confirmPasswordLabel')"
      hint=""
      lazy-rules
      :rules="[(val) => val === setupState.form.password || $t('validation.passwordsDoNotMatch') ]"
    />
  </q-form>
</template>

<script setup>
import { setupState } from 'pages/setup/use-setup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
