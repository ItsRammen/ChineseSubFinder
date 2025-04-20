<template>
  <q-form ref="form">
    <q-list dense>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('setup.embyForm.urlLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model="setupState.form.emby.url"
            standout
            dense
            :rules="[
              (val) => !!val || $t('validation.cannotBeEmpty'),
              (val) => val.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/) || $t('validation.invalidUrl'),
            ]"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('setup.embyForm.apiKeyLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-input v-model="setupState.form.emby.apiKey" standout dense :rules="[(val) => !!val || $t('validation.cannotBeEmpty')]" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('setup.embyForm.limitCountLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model.number="setupState.form.emby.limitCount"
            standout
            dense
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty'), (val) => /^\d+$/.test(val) || $t('validation.mustBeInteger')]"
          />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('setup.embyForm.skipWatchedLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-toggle v-model="setupState.form.emby.skipWatched" />
        </q-item-section>
      </q-item>

      <q-item :class="{ disabled: setupState.form.emby.autoOrManual }" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('setup.embyForm.autoMatchImdbLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-toggle v-model="setupState.form.emby.autoOrManual" :disable="setupState.form.emby.autoOrManual" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>

<script setup>
import { setupState } from 'pages/setup/use-setup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
