<template>
  <div v-if="isInQueue" class="row items-center q-gutter-xs">
    <q-spinner-hourglass color="primary" size="22px" />
    <div v-if="!dense" style="font-size: 90%">{{ $t('library.uploadSubtitle.statusUploading') }}</div>
  </div>
  <q-btn
    v-else
    color="primary"
    flat
    dense
    icon="upload"
    v-bind="$attrs"
    :label="dense ? '' : $t('library.uploadSubtitle.buttonLabel')"
    @click="handleUploadClick"
    :title="$t('library.uploadSubtitle.buttonTitle')"
  />

  <q-input v-show="false" type="file" ref="qFile" v-model="uploadFile" accept=".srt,.ass,.ssa,.sbv,.webvtt" />
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSubtitleUploadList, subtitleUploadList } from 'pages/library/use-library';
import LibraryApi from 'src/api/LibraryApi';
import { SystemMessage } from 'src/utils/message';
import eventBus from 'vue3-eventbus';

const props = defineProps({
  path: String,
  dense: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const uploadFile = ref(null);
const qFile = ref(null);
const isInQueue = ref(false);

watchEffect(() => {
  isInQueue.value = subtitleUploadList.value.some((item) => item.video_f_path === props.path);
});

const handleUploadClick = () => {
  qFile.value.$el.click();
};

const upload = async () => {
  const formData = new FormData();
  formData.append('video_f_path', props.path);
  formData.append('file', uploadFile.value[0]);
  isInQueue.value = true;
  await LibraryApi.uploadSubtitle(formData);
  SystemMessage.success(t('library.uploadSubtitle.successMessage'), {
    timeout: 3000,
  });
  await getSubtitleUploadList();
  eventBus.emit('subtitle-uploaded');
};

watch(uploadFile, () => {
  upload();
});
</script>
