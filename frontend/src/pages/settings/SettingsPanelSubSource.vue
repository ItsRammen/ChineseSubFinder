<template>
  <div>
    <q-list style="max-width: 600px" dense>
      <q-item tag="label">
        <q-item-section>
          <q-item-label>{{ $t('settings.subSource.assrt.title') }}</q-item-label>
          <q-item-label caption>
            <div>{{ $t('settings.subSource.assrt.captionLinks') }}</div>
            <ul class="q-pl-md">
              <li>{{ $t('settings.subSource.assrt.captionItem1') }}</li>
              <li>{{ $t('settings.subSource.assrt.captionItem2') }}</li>
              <li>{{ $t('settings.subSource.assrt.captionItem3') }}</li>
              <li>{{ $t('settings.subSource.assrt.captionItem4') }}</li>
            </ul>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.assrt_settings.enabled" />
        </q-item-section>
      </q-item>

      <q-item class="q-mt-sm">
        <q-item-section>
          <q-input
            :disable="!form.assrt_settings.enabled"
            v-model="form.assrt_settings.token"
            :placeholder="$t('settings.subSource.assrt.tokenPlaceholder')"
            :label="$t('settings.subSource.assrt.tokenLabel')"
            standout
            dense
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty')]"
          />
        </q-item-section>
      </q-item>

      <template v-if="form.subtitle_best_settings">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>{{ $t('settings.subSource.subtitleBest.title') }}</q-item-label>
            <q-item-label caption>
              <div>{{ $t('settings.subSource.subtitleBest.captionLinks') }}</div>
              <ul class="q-pl-md">
                <li>{{ $t('settings.subSource.subtitleBest.captionItem1') }}</li>
                <li>{{ $t('settings.subSource.subtitleBest.captionItem2') }}</li>
                <li>{{ $t('settings.subSource.subtitleBest.captionItem3') }}</li>
              </ul>
            </q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-toggle v-model="form.subtitle_best_settings.enabled" />
          </q-item-section>
        </q-item>

        <q-item class="q-mt-sm">
          <q-item-section>
            <q-input
              :disable="!form.subtitle_best_settings.enabled"
              v-model="form.subtitle_best_settings.api_key"
              :placeholder="$t('settings.subSource.subtitleBest.apiKeyPlaceholder')"
              :label="$t('settings.subSource.subtitleBest.apiKeyLabel')"
              standout
              dense
              :rules="[(val) => !!val || $t('validation.cannotBeEmpty')]"
            />
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

const { t } = useI18n();
const { subtitle_sources: form } = toRefs(formModel);
</script>
