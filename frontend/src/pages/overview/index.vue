<template>
  <q-page class="q-pa-md">
    <q-card v-if="systemState.jobStatus" flat>
      <header class="row items-center q-gutter-lg">
        <div>
          <div>
            {{ $t('overview.daemonProcess') }}
            <q-badge v-if="isJobRunning" color="positive">{{ $t('overview.statusRunning') }}</q-badge>
            <q-badge v-else color="grey">{{ $t('overview.statusNotRunning') }}</q-badge>
          </div>
          <div class="text-grey">{{ $t('overview.daemonCaption') }}</div>
        </div>
        <div>
          <q-btn v-if="isJobRunning" :label="$t('overview.forceStopButton')" color="negative" @click="stopJobs" :loading="submitting"></q-btn>
          <q-btn v-else :label="$t('overview.runNowButton')" color="primary" @click="startJobs" :loading="submitting"></q-btn>
        </div>
      </header>
    </q-card>
  </q-page>
</template>

<script setup>
import { getJobsStatus, isJobRunning, systemState } from 'src/store/systemState';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import JobApi from 'src/api/JobApi';
import { SystemMessage } from 'src/utils/message';

const { t } = useI18n();
const $q = useQuasar();

const submitting = ref(false);

const startJobs = () => {
  $q.dialog({
    title: t('overview.runNowDialogTitle'),
    cancel: true,
  }).onOk(async () => {
    submitting.value = true;
    const [, err] = await JobApi.start();
    submitting.value = false;
    if (err !== null) {
      SystemMessage.error(err.message);
      return;
    }
    getJobsStatus();
    SystemMessage.success(t('overview.startSuccessMessage'));
  });
};

const stopJobs = () => {
  $q.dialog({
    title: t('overview.forceStopDialogTitle'),
    cancel: true,
  }).onOk(async () => {
    submitting.value = true;
    const [, err] = await JobApi.stop();
    submitting.value = false;
    if (err !== null) {
      SystemMessage.error(err.message);
      return;
    }
    getJobsStatus();
    SystemMessage.success(t('overview.stopSuccessMessage'));
  });
};

onMounted(() => {
  getJobsStatus();
});
</script>
