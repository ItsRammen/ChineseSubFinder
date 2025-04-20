<template>
  <q-btn :label="$t('library.refreshMediaServerSubs.buttonLabel')" v-if="show" color="primary" icon="cached" @click="confirm">
    <template v-slot:loading>
      <q-spinner-hourglass class="on-left" />
      {{ $t('library.refreshCache.buttonLoading') }}
    </template>
  </q-btn>
</template>

<script setup>
import { useQuasar } from 'quasar';
import LibraryApi from 'src/api/LibraryApi';
import { SystemMessage } from 'src/utils/message';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { settingsState } from 'src/store/settingsState';

const { t } = useI18n();
const $q = useQuasar();

const show = computed(() => settingsState.settings?.emby_settings.enable);

const confirm = () => {
  $q.dialog({
    title: t('library.refreshMediaServerSubs.dialogTitle'),
    message: t('library.refreshMediaServerSubs.dialogMessage'),
    persistent: true,
    ok: t('buttons.ok'),
    cancel: t('buttons.cancel'),
  }).onOk(async () => {
    const [, err] = await LibraryApi.refreshMediaServerSubList();
    if (err !== null) {
      SystemMessage.error(err.message);
    } else {
      SystemMessage.success(t('library.refreshMediaServerSubs.successMessage'));
    }
  });
};
</script>
