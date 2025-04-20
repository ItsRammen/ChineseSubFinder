<template>
  <div>
    <q-list style="max-width: 600px" dense>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.experiment.autoEncode.title') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.experiment.autoEncode.caption') }}</q-item-label>
          <q-item v-if="form.auto_change_sub_encode.enable">
            <q-item-section avatar top>
              <q-radio
                v-for="(item, k) in encodeOptions"
                :key="k"
                :label="item.label"
                v-model="form.auto_change_sub_encode.des_encode_type"
                :val="~~k"
              />
            </q-item-section>
          </q-item>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.auto_change_sub_encode.enable" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" :disable="!isChsChtChangerEnable" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.experiment.chsChtConvert.title') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.experiment.chsChtConvert.caption') }}</q-item-label>
          <q-item v-if="form.chs_cht_changer.enable">
            <q-item-section avatar top>
              <q-radio
                :disable="!isChsChtChangerEnable"
                v-for="(item, k) in chsChtOptions"
                :key="k"
                :label="item.label"
                v-model="form.chs_cht_changer.des_chinese_language_type"
                :val="~~k"
              />
            </q-item-section>
          </q-item>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle :disable="!isChsChtChangerEnable" v-model="form.chs_cht_changer.enable" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.experiment.remoteChrome.title') }}</q-item-label>
          <q-item-label caption>
            <span v-html="$t('settings.experiment.remoteChrome.caption')"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.remote_chrome_settings.enable" />
        </q-item-section>
      </q-item>

      <template v-if="form.remote_chrome_settings.enable">
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.experiment.remoteChrome.dockerUrlLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model="form.remote_chrome_settings.remote_docker_url"
              :placeholder="$t('settings.experiment.remoteChrome.dockerUrlPlaceholder')"
              standout
              dense
              :rules="[(val) => (form.remote_chrome_settings.enable && !!val) || $t('validation.cannotBeEmpty') ]"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.experiment.remoteChrome.adblockPathLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model="form.remote_chrome_settings.remote_adblock_path"
              :placeholder="$t('settings.experiment.remoteChrome.adblockPathPlaceholder')"
              standout
              dense
              :rules="[(val) => (form.remote_chrome_settings.enable && !!val) || $t('validation.cannotBeEmpty') ]"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('settings.experiment.remoteChrome.userDataDirLabel') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model="form.remote_chrome_settings.remote_user_data_dir"
              :placeholder="$t('settings.experiment.remoteChrome.userDataDirPlaceholder')"
              standout
              dense
              :rules="[(val) => (form.remote_chrome_settings.enable && !!val) || $t('validation.cannotBeEmpty') ]"
            />
          </q-item-section>
        </q-item>
      </template>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.experiment.localChrome.title') }}</q-item-label>
          <q-item-label caption>
            <span v-html="$t('settings.experiment.localChrome.caption')"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.local_chrome_settings.enabled" />
        </q-item-section>
      </q-item>

      <template v-if="form.local_chrome_settings.enabled">
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.local_chrome_settings.local_chrome_exe_f_path"
              :label="$t('settings.experiment.localChrome.pathLabel')"
              :placeholder="$t('settings.experiment.localChrome.pathPlaceholder')"
              standout
              dense
              :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
            />
          </q-item-section>
        </q-item>
      </template>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.experiment.apiKey.title') }}</q-item-label>
          <q-item-label caption>
            <span v-html="$t('settings.experiment.apiKey.caption')"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.api_key_settings.enabled" />
        </q-item-section>
      </q-item>

      <template v-if="form.api_key_settings.enabled">
        <q-item>
          <q-btn :label="$t('settings.experiment.apiKey.regenerateButton')" color="primary" size="sm" @click="generateApiKey" />
        </q-item>
        <q-item class="q-mt-sm">
          <q-item-section>
            <q-input
              v-model="form.api_key_settings.key"
              standout
              dense
              :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
              readonly
            >
              <template #append>
                <copy-to-clipboard-btn v-if="form.api_key_settings.key" :text="form.api_key_settings.key" size="sm" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup>
import { formModel } from 'pages/settings/use-settings';
import { toRefs } from '@vueuse/core';
import {
  AUTO_CONVERT_LANG_NAME_MAP,
  DESC_ENCODE_TYPE_NAME_MAP,
  DESC_ENCODE_TYPE_UTF8,
} from 'src/constants/SettingConstants';
import { computed } from 'vue';
import CopyToClipboardBtn from 'components/CopyToClipboardBtn';

const { experimental_function: form } = toRefs(formModel);

const isChsChtChangerEnable = computed(
  () =>
    formModel.experimental_function.auto_change_sub_encode?.enable &&
    formModel.experimental_function.auto_change_sub_encode?.des_encode_type === DESC_ENCODE_TYPE_UTF8
);

const generateUuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const generateApiKey = () => {
  const uuid = generateUuid();
  formModel.experimental_function.api_key_settings.key = uuid;
};
</script>
