<template>
  <div>
    <q-list dense style="max-width: 600px">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.emby.enableLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.enable" />
        </q-item-section>
      </q-item>

      <template v-if="form.enable">
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.emby.urlLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model="form.address_url"
              standout
              dense
              :rules="[
                (val) => (form.enable && !!val) || $t('validation.cannotBeEmpty'),
                (val) => val.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/) || $t('validation.invalidUrl'),
              ]"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.emby.apiKeyLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input v-model="form.api_key" standout dense :rules="[(val) => (form.enable && !!val) || $t('validation.cannotBeEmpty')]" />
          </q-item-section>
        </q-item>

        <q-item> <btn-check-emby-server /> </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.emby.limitCountLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model.number="form.max_request_video_number"
              standout
              dense
              :rules="[(val) => (form.enable && !!val) || $t('validation.cannotBeEmpty'), (val) => /^\d+$/.test(val) || $t('validation.mustBeInteger')]"
            />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ $t('settings.emby.skipWatchedLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="form.skip_watched" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset></q-separator>

        <q-item :class="{ disabled: form.auto_or_manual }" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ $t('settings.emby.autoMatchImdbLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="form.auto_or_manual" :disable="form.auto_or_manual" />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup>
import { formModel } from 'pages/settings/use-settings';
import { toRefs } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import BtnCheckEmbyServer from 'pages/settings/BtnCheckEmbyServer';

const { t } = useI18n();
const { emby_settings: form } = toRefs(formModel);
</script>
