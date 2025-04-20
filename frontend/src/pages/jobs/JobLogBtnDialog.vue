<template>
  <q-btn :label="$t('jobs.logDialog.buttonLabel')" flat dense @click="show = true" color="primary" />

  <q-dialog v-model="show" @before-show="handleBeforeShow">
    <q-card style="width: 900px; max-width: 900px">
      <q-card-section>
        <div class="text-body1">{{ $t('jobs.logDialog.title') }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <log-viewer-raw :log-lines="logLines" style="height: 500px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import JobApi from 'src/api/JobApi';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SystemMessage } from 'src/utils/message';
import LogViewerRaw from 'components/LogViewerRaw';

const props = defineProps({
  data: {
    type: Object,
  },
});

const { t } = useI18n();
const show = ref(false);
const logLines = ref([]);

const getJobLog = async () => {
  const [res, err] = await JobApi.getLog(props.data.id);
  if (err != null) {
    SystemMessage.error(err.message);
  } else {
    logLines.value = res?.one_line;
  }
};

const handleBeforeShow = () => {
  getJobLog();
};
</script>
