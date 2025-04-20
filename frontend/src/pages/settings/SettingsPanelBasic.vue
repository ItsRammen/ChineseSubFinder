<template>
  <div>
    <q-list style="max-width: 600px" dense>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.basic.scanTimingTitle') }}</q-item-label>
          <q-item>
            <q-item-section avatar top>
              <q-radio v-model="scanType" :val="0" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('settings.basic.scanIntervalLabel') }}</q-item-label>
              <q-item-label caption> {{ $t('settings.basic.scanIntervalCaption') }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-select
                v-model="scanCronString0"
                :options="scanIntervalOptions"
                standout
                dense
                style="width: 200px"
                :rules="[(val) => !!val || $t('validation.cannotBeEmpty')]"
                emit-value
                map-options
                :disable="scanType !== 0"
                @update:model-value="handleScanIntervalChange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar top>
              <q-radio v-model="scanType" :val="1" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('settings.basic.scanSpecTimeLabel') }}</q-item-label>
              <q-item-label caption> {{ $t('settings.basic.scanSpecTimeCaption') }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-select
                v-model="scanCronString1"
                :options="scanSpecTimeOptions"
                standout
                dense
                emit-value
                map-options
                style="width: 200px"
                :rules="[
                  (val) => !!val || !!val?.length || $t('validation.cannotBeEmpty'),
                  (val) => val.length <= 4 || $t('settings.basic.scanSpecTimeRule'),
                ]"
                :disable="scanType !== 1"
                @update:model-value="handleScanSpecTimeChange"
                multiple
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar top>
              <q-radio v-model="scanType" :val="2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('settings.basic.scanCustomRuleLabel') }}</q-item-label>
              <q-item-label caption>
                {{ $t('settings.basic.scanCustomRuleCaption1') }}
                <a href="https://pkg.go.dev/github.com/robfig/cron/v3" target="_blank" class="text-primary">
                  {{ $t('settings.basic.scanCustomRuleLink') }}
                </a>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-input
                v-model="scanCronString2"
                standout
                dense
                style="width: 200px"
                :rules="[(val) => !!val || $t('validation.cannotBeEmpty'), validateCronTime]"
                @update:model-value="handleScanCustomChange"
                :disable="scanType !== 2"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar top>
              <q-radio v-model="scanType" :val="3" @update:model-value="handleScanNoScanChange" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('settings.basic.noScanLabel') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('settings.basic.performanceTitle') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <div class="row">
            <q-radio v-model="form.threads" :val="1" :label="$t('settings.basic.performanceWeak')" />
            <q-radio v-model="form.threads" :val="3" :label="$t('settings.basic.performanceNormal')" />
            <q-radio v-model="form.threads" :val="6" :label="$t('settings.basic.performanceStrong')" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section class="items-start" top>
          <q-item-label>{{ $t('settings.basic.movieDirsTitle') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-btn
            v-if="!form.movie_paths?.length"
            icon="add"
            color="primary"
            dense
            rounded
            size="xs"
            :title="$t('buttons.add')"
            @click="form.movie_paths.push('')"
          ></q-btn>
          <template v-else v-for="(item, i) in form.movie_paths" :key="i">
            <div class="row items-center q-gutter-x-md">
              <q-input
                v-model="form.movie_paths[i]"
                :placeholder="$t('settings.basic.movieDirPlaceholder')"
                standout
                dense
                lazy-rules
                :rules="[(val) => !!val || $t('validation.cannotBeEmpty'), validateRemotePath]"
                style="width: 200px"
              />
              <q-btn
                v-if="i === 0"
                icon="add"
                color="primary"
                dense
                rounded
                size="xs"
                :title="$t('buttons.add')"
                @click="form.movie_paths.push('')"
              ></q-btn>
              <q-btn
                v-else
                icon="remove"
                color="negative"
                dense
                rounded
                size="xs"
                :title="$t('buttons.delete')"
                @click="form.movie_paths.splice(i, 1)"
              ></q-btn>
            </div>
          </template>
        </q-item-section>
      </q-item>

      <q-separator spaced inset></q-separator>

      <q-item>
        <q-item-section class="items-start" top>
          <q-item-label>{{ $t('settings.basic.seriesDirsTitle') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-btn
            v-if="!form.series_paths?.length"
            icon="add"
            color="primary"
            dense
            rounded
            size="xs"
            :title="$t('buttons.add')"
            @click="form.series_paths.push('')"
          ></q-btn>
          <template v-else v-for="(item, i) in form.series_paths" :key="i">
            <div class="row items-center q-gutter-md">
              <q-input
                v-model="form.series_paths[i]"
                :placeholder="$t('settings.basic.seriesDirPlaceholder')"
                standout
                dense
                :rules="[(val) => !!val || $t('validation.cannotBeEmpty'), validateRemotePath]"
                style="width: 200px"
              />
              <q-btn
                v-if="i === 0"
                icon="add"
                color="primary"
                dense
                rounded
                size="xs"
                :title="$t('buttons.add')"
                @click="form.series_paths.push('')"
              ></q-btn>
              <q-btn
                v-else
                icon="remove"
                color="negative"
                dense
                rounded
                size="xs"
                :title="$t('buttons.delete')"
                @click="form.series_paths.splice(i, 1)"
              ></q-btn>
            </div>
          </template>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { formModel } from 'pages/settings/use-settings';
import { validateCronTime, validateRemotePath } from 'src/utils/quasar-validators';
import { toRefs } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { common_settings: form } = toRefs(formModel);

const NO_SCAN_CRON_RULE = '@every 87600h';

const scanCronString0 = ref('');
const scanCronString1 = ref([]);
const scanCronString2 = ref('');
const scanType = ref(0);

if (form.value.scan_interval === NO_SCAN_CRON_RULE) {
  scanType.value = 3;
} else if (form.value.interval_or_assign_or_custom === 0) {
  scanType.value = 0;
  scanCronString0.value = form.value.scan_interval.split(' ').pop();
} else if (form.value.interval_or_assign_or_custom === 1) {
  scanType.value = 1;
  scanCronString1.value = form.value.scan_interval.split(' ')[1].split(',');
} else if (form.value.interval_or_assign_or_custom === 2) {
  scanType.value = 2;
  scanCronString2.value = form.value.scan_interval;
}

const baseScanIntervalOptions = ['4h', '5h', '6h', '7h', '8h', '9h', '10h'];
const baseScanSpecTimeOptions = Array.from({ length: 24 }, (_, i) => i.toString());

const scanIntervalOptions = computed(() =>
  baseScanIntervalOptions.map((val) => ({
    label: t(`settings.basic.scanIntervalOptions.${val}`),
    value: val,
  }))
);
const scanSpecTimeOptions = computed(() =>
  baseScanSpecTimeOptions.map((val) => ({
    label: t(`settings.basic.scanSpecTimeOptions.${val}`),
    value: val,
  }))
);

const handleScanIntervalChange = () => {
  formModel.common_settings.interval_or_assign_or_custom = 0;
  formModel.common_settings.scan_interval = `@every ${scanCronString0.value}`;
};

const handleScanSpecTimeChange = () => {
  formModel.common_settings.interval_or_assign_or_custom = 1;
  formModel.common_settings.scan_interval = `0 ${scanCronString1.value.join(',')} * * *`;
};

const handleScanCustomChange = () => {
  formModel.common_settings.interval_or_assign_or_custom = 2;
  formModel.common_settings.scan_interval = `${scanCronString2.value}`;
};

const handleScanNoScanChange = () => {
  formModel.common_settings.interval_or_assign_or_custom = 2;
  formModel.common_settings.scan_interval = NO_SCAN_CRON_RULE;
};

watch(
  () => formModel.common_settings.threads,
  (val) => {
    formModel.emby_settings.threads = val;
  }
);
</script>
