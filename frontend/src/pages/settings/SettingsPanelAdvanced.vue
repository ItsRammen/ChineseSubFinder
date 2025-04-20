<template>
  <div>
    <q-list dense style="max-width: 600px">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.proxy.useProxyLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.advanced.proxy.useProxyCaption') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.proxy_settings.use_proxy" />
        </q-item-section>
      </q-item>

      <q-item v-if="form.proxy_settings.use_proxy" class="q-mt-md" dense>
        <q-item-section>
          <div class="row q-gutter-sm no-wrap">
            <q-select
              v-model="form.proxy_settings.use_which_proxy_protocol"
              :options="proxyProtocolOptions"
              :label="$t('settings.advanced.proxy.protocolLabel')"
              standout
              dense
              emit-value
              map-options
              style="width: 100px"
            />
            <q-input v-model="form.proxy_settings.input_proxy_address" standout dense :label="$t('settings.advanced.proxy.serverLabel')" />
            <q-input v-model="form.proxy_settings.input_proxy_port" standout dense :label="$t('settings.advanced.proxy.portLabel')" />
            <q-input v-model="form.proxy_settings.local_http_proxy_server_port" standout dense :label="$t('settings.advanced.proxy.localPortLabel')" />
          </div>

          <div class="q-mt-sm row q-gutter-sm">
            <q-checkbox v-model="form.proxy_settings.need_pwd" left-label :label="$t('settings.advanced.proxy.authLabel')" />
            <q-input
              :disable="!form.proxy_settings.need_pwd"
              v-model="form.proxy_settings.input_proxy_username"
              standout
              dense
              :label="$t('settings.advanced.proxy.usernameLabel')"
            />
            <q-input
              :disable="!form.proxy_settings.need_pwd"
              v-model="form.proxy_settings.input_proxy_password"
              standout
              dense
              :label="$t('settings.advanced.proxy.passwordLabel')"
            />
          </div>

          <div class="q-mt-sm">
            <proxy-check-btn
              :settings="form.proxy_settings"
              :label="$t('settings.advanced.proxy.testButtonLabel')"
              size="md"
              icon="bolt"
              color="primary"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.debugModeLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.debug_mode" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.saveCacheLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.save_full_season_tmp_subtitles" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.subPriorityTitle') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <div class="row">
            <q-radio
              v-for="(v, k) in subTypePriorityOptions"
              :key="k"
              v-model="form.sub_type_priority"
              :val="~~k"
              :label="v.label"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.subNamingTitle') }}</q-item-label>
          <q-item v-for="(item, k) in subNameFormatOptions" :key="k" tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="form.sub_name_formatter" :val="~~k" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>
                {{ item.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-negative">* {{ $t('settings.advanced.subNamingWarning') }}</div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.skipChineseMovieLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.scan_logic.skip_chinese_movie" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.skipChineseSeriesLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.scan_logic.skip_chinese_series" />
        </q-item-section>
      </q-item>

      <q-item v-if="SUB_NAME_FORMAT_EMBY === form.sub_name_formatter" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.saveMultiSubLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.advanced.saveMultiSubCaption') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.save_multi_sub" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label class="q-mb-sm">{{ $t('settings.advanced.subSourcesTitle') }}</q-item-label>
          <q-item v-for="item in form.suppliers_settings" :key="item" clickable>
            <q-item-section avatar class="text-bold" style="width: 120px">
              {{ item.name }}
            </q-item-section>
            <q-item-section class="text-grey-8">
              <q-item-label :lines="1">
                {{ item.root_url }}
              </q-item-label>
              <q-item-label v-if="item.name !== 'csf'" style="font-size: 90%">
                {{ $t('settings.advanced.subSourceDailyLimit', { limit: item.daily_download_limit }) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <edit-sub-source-btn-dialog :data="item" @update="(data) => handleSubSourceUpdate(item, data)" />
            </q-item-section>
          </q-item>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label class="q-mb-sm">{{ $t('settings.advanced.queue.title') }}</q-item-label>
          <q-input
            class="col"
            v-model.number="form.task_queue.max_retry_times"
            :label="$t('settings.advanced.queue.maxRetryLabel')"
            :shadow-text="$t('settings.advanced.queue.maxRetryHint')"
            standout
            dense
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model.number="form.task_queue.one_job_time_out"
            :label="$t('settings.advanced.queue.timeoutLabel')"
            standout
            dense
            :suffix="$t('units.seconds')"
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model.number="form.task_queue.interval"
            :label="$t('settings.advanced.queue.intervalLabel')"
            :shadow-text="$t('settings.advanced.queue.intervalHint')"
            standout
            dense
            :suffix="$t('units.seconds')"
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model.number="form.task_queue.expiration_time"
            :label="$t('settings.advanced.queue.expirationLabel')"
            :shadow-text="$t('settings.advanced.queue.expirationHint')"
            standout
            dense
            :suffix="$t('units.days')"
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model.number="form.task_queue.download_sub_during_x_days"
            :label="$t('settings.advanced.queue.internalSubExpirationLabel')"
            :shadow-text="$t('settings.advanced.queue.internalSubExpirationHint')"
            standout
            dense
            :suffix="$t('units.days')"
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model.number="form.task_queue.one_sub_download_interval"
            :label="$t('settings.advanced.queue.retryIntervalLabel')"
            standout
            dense
            :suffix="$t('units.hours')"
            :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
          />
          <q-input
            class="col"
            v-model="form.task_queue.check_pulic_ip_target_site"
            :label="$t('settings.advanced.queue.publicIpCheckSiteLabel')"
            :shadow-text="$t('settings.advanced.queue.publicIpCheckSiteHint')"
            standout
            dense
          />
          <div class="text-warning">
            * {{ $t('settings.advanced.queue.publicIpCheckSiteWarning') }}
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.cacheTtlTitle') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <div class="row no-wrap q-gutter-xs">
            <q-input class="col" standout dense v-model.number="form.download_file_cache.ttl"> </q-input>
            <q-select
              standout
              dense
              :options="cacheUnitOptions"
              emit-value
              map-options
              v-model.number="form.download_file_cache.unit"
            ></q-select>
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section class="items-start" top>
          <q-item-label>{{ $t('settings.advanced.customExtTitle') }}</q-item-label>
          <q-item-label caption>{{ $t('settings.advanced.customExtCaption') }}</q-item-label>
          <template v-for="(item, i) in form.custom_video_exts" :key="i">
            <div class="row items-center q-gutter-x-md" :class="{ 'q-mt-md': i === 0 }">
              <q-input
                v-model="form.custom_video_exts[i]"
                placeholder=""
                standout
                dense
                :rules="[(val) => !!val || $t('validation.cannotBeEmpty') ]"
              />
              <q-btn
                icon="remove"
                color="negative"
                dense
                rounded
                size="xs"
                :title="$t('buttons.delete')"
                @click="form.custom_video_exts.splice(i, 1)"
              ></q-btn>
            </div>
          </template>
        </q-item-section>
        <q-item-section side top>
          <q-btn
            icon="add"
            color="primary"
            dense
            rounded
            size="xs"
            :title="$t('buttons.add')"
            @click="form.custom_video_exts.push('')"
          ></q-btn>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.fixTimelineLabel') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle v-model="form.fix_time_line" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('settings.advanced.tmdb.enableLabel') }}</q-item-label>
          <!--          <q-item-label caption>支持HTTP代理</q-item-label>-->
        </q-item-section>
        <q-item-section avatar top>
          <q-toggle v-model="form.tmdb_api_settings.enable" />
        </q-item-section>
      </q-item>

      <template v-if="form.tmdb_api_settings.enable">
        <q-item>
          <div class="text-warning">
            * {{ $t('settings.advanced.tmdb.warning') }}
          </div>
        </q-item>
        <q-item class="q-mt-md" dense>
          <q-item-section>
            <q-input
              v-model="form.tmdb_api_settings.api_key"
              standout
              dense
              :label="$t('settings.advanced.tmdb.apiKeyLabel')"
              :rules="[(val) => (form.tmdb_api_settings.enable && !!val) || $t('validation.cannotBeEmpty') ]"
            />
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-checkbox
              v-model="form.tmdb_api_settings.use_alternate_base_url"
              :label="$t('settings.advanced.tmdb.useAlternateUrlLabel')"
              :title="$t('settings.advanced.tmdb.useAlternateUrlTitle')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <btn-check-tmdb-api />
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup>
import {
  SUB_NAME_FORMAT_EMBY,
  SUB_NAME_FORMAT_NORMAL,
  SUB_NAME_FORMAT_NAME_MAP,
  SUB_TYPE_PRIORITY_NAME_MAP,
  PROXY_TYPE_NAME_MAP,
  SUB_NAME_VIDEO,
} from 'src/constants/SettingConstants';
import { formModel } from 'pages/settings/use-settings';
import { toRefs } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ProxyCheckBtn from 'components/ProxyCheckBtn';
import EditSubSourceBtnDialog from 'pages/settings/BtnDialogEditSubSource';
import BtnCheckTmdbApi from 'pages/settings/BtnCheckTmdbApi';

const { t } = useI18n();
const { advanced_settings: form } = toRefs(formModel);

const baseSubNameFormatDescMap = {
  [SUB_NAME_FORMAT_NORMAL]: 'AAA.zh.ass or AAA.zh.default.ass',
  [SUB_NAME_FORMAT_EMBY]: 'AAA.chinese(简英,subhd).ass or AAA.chinese(简英,xunlei).default.ass',
  [SUB_NAME_VIDEO]: 'AAA.ass or AAA.srt',
};

const proxyProtocolOptions = computed(() =>
  Object.keys(PROXY_TYPE_NAME_MAP).map((key) => ({
    label: t(`settings.advanced.proxy.protocolOptions.${key}`),
    value: key,
  }))
);

const subTypePriorityOptions = computed(() => {
  const options = {};
  for (const key in SUB_TYPE_PRIORITY_NAME_MAP) {
    options[key] = { label: t(`settings.advanced.subPriorityOptions.${key}`) };
  }
  return options;
});

const subNameFormatOptions = computed(() => {
  const options = {};
  for (const key in SUB_NAME_FORMAT_NAME_MAP) {
    options[key] = {
      label: t(`settings.advanced.subNamingOptions.${key}.label`),
      description: t(`settings.advanced.subNamingOptions.${key}.description`),
    };
  }
  return options;
});

const cacheUnitOptions = computed(() => [
  { label: t('units.hours'), value: 'hour' },
  { label: t('units.seconds'), value: 'second' },
]);

const handleSubSourceUpdate = (item, data) => {
  formModel.advanced_settings.suppliers_settings[item.name].root_url = data.url;
  formModel.advanced_settings.suppliers_settings[item.name].daily_download_limit = data.dailyLimit;
};
</script>
