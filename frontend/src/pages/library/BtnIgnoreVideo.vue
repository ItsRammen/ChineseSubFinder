<template>
  <q-btn
    v-if="isSkipped"
    color="warning"
    round
    flat
    dense
    icon="lock"
    @click.stop
    :title="$t('library.ignoreVideo.buttonTitleLocked')"
    @click="skip"
    v-bind="$attrs"
  />
  <q-btn
    v-else
    color="grey"
    round
    flat
    dense
    icon="lock"
    @click.stop
    :title="$t('library.ignoreVideo.buttonTitleUnlocked')"
    @click="skip"
    v-bind="$attrs"
  />
</template>

<script setup>
import LibraryApi from 'src/api/LibraryApi';
import { SystemMessage } from 'src/utils/message';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useEventBus from 'src/composables/use-event-bus';
import { checkIsVideoLocked } from 'pages/library/use-library';

const props = defineProps({
  path: String,
  videoType: Number,
});

const { t } = useI18n();
const $q = useQuasar();

const isSkipped = ref(null);

const getIsSkipped = async () => {
  isSkipped.value = await checkIsVideoLocked({
    video_type: props.videoType,
    physical_video_file_full_path: props.path,
    is_bluray: false,
    is_skip: true,
  });
};

const skip = async () => {
  $q.dialog({
    title: t('common.confirmationTitle'),
    message: isSkipped.value
      ? t('library.ignoreVideo.unlockDialogMessage')
      : t('library.ignoreVideo.lockDialogMessage'),
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const [res] = await LibraryApi.setSkipInfo({
      video_skip_infos: [
        {
          video_type: props.videoType,
          physical_video_file_full_path: props.path,
          is_bluray: false,
          is_skip: !isSkipped.value,
        },
      ],
    });
    if (res) {
      SystemMessage.success(t('common.operationSuccess'));
      getIsSkipped();
    }
  });
};

useEventBus(`refresh-skip-status-${props.path}`, (flag) => {
  if (flag !== undefined) {
    isSkipped.value = flag;
  } else {
    getIsSkipped();
  }
});

onMounted(() => {
  getIsSkipped();
});
</script>
