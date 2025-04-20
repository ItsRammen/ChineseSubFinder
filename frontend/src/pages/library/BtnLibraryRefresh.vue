<template>
  <q-btn :label="$t('library.refreshCache.buttonLabel')" color="primary" icon="refresh" @click="confirm" :loading="refreshCacheLoading">
    <template v-slot:loading>
      <q-spinner-hourglass class="on-left" />
      {{ $t('library.refreshCache.buttonLoading') }}
    </template>
  </q-btn>
</template>

<script setup>
import { refreshCacheLoading, refreshLibrary } from 'pages/library/use-library';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();

const confirm = () => {
  $q.dialog({
    title: t('library.refreshCache.dialogTitle'),
    message: t('library.refreshCache.dialogMessage'),
    persistent: true,
    ok: t('buttons.ok'),
    cancel: t('buttons.cancel'),
  })
    .onOk(() => {
      refreshLibrary();
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    });
};
</script>
