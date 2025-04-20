<template>
  <div>
    <q-list dense style="max-width: 600px">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.development.interfaceNotificationLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.development.interfaceNotificationCaption') }}</q-item-label>
          <div v-if="form.enable" class="q-mt-sm">
            <q-input
              v-model="form.bark_server_address"
              standout
              dense
              :label="$t('settings.development.barkServerAddressLabel')"
              :placeholder="$t('settings.development.barkServerAddressPlaceholder')"
            />
          </div>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.enable" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator class="q-mt-md" />
  </div>
</template>

<script setup>
import { formModel } from 'pages/settings/use-settings';
import { toRefs } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { developer_settings: form } = toRefs(formModel);
</script>
