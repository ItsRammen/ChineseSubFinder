<template>
  <q-form ref="form" class="q-gutter-md">
    <div class="row items-center q-gutter-sm">
      <div class="text-h6">{{ $t('setup.scanForm.movieFoldersTitle') }}</div>
      <q-btn
        icon="add"
        color="primary"
        dense
        rounded
        size="xs"
        :title="$t('buttons.add')"
        @click="setupState.form.movieFolder.push('')"
      ></q-btn>
    </div>
    <template v-for="(item, i) in setupState.form.movieFolder" :key="i">
      <div class="row items-center q-gutter-xs">
        <q-input
          class="col-11"
          filled
          v-model="setupState.form.movieFolder[i]"
          :label="$t('setup.scanForm.movieFolderLabel', { index: i > 0 ? i + 1 : '' })"
          :hint="$t('setup.scanForm.movieFolderHint')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('validation.cannotBeEmpty'), validateRemotePath]"
        />
        <q-btn
          v-if="i !== 0"
          icon="remove"
          color="negative"
          dense
          rounded
          size="xs"
          :title="$t('buttons.delete')"
          @click="setupState.form.movieFolder.splice(i, 1)"
        ></q-btn>
      </div>
    </template>

    <div class="row items-center q-gutter-sm">
      <div class="text-h6">{{ $t('setup.scanForm.seriesFoldersTitle') }}</div>
      <q-btn
        icon="add"
        color="primary"
        dense
        rounded
        size="xs"
        :title="$t('buttons.add')"
        @click="setupState.form.seriesFolder.push('')"
      ></q-btn>
    </div>
    <template v-for="(item, i) in setupState.form.seriesFolder" :key="i">
      <div class="row items-center q-gutter-xs">
        <q-input
          class="col-11"
          filled
          v-model="setupState.form.seriesFolder[i]"
          :label="$t('setup.scanForm.seriesFolderLabel', { index: i > 0 ? i + 1 : '' })"
          :hint="$t('setup.scanForm.seriesFolderHint')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('validation.cannotBeEmpty'), validateRemotePath]"
        />
        <q-btn
          v-if="i !== 0"
          icon="remove"
          color="negative"
          dense
          rounded
          size="xs"
          :title="$t('buttons.delete')"
          @click="setupState.form.seriesFolder.splice(i, 1)"
        ></q-btn>
      </div>
    </template>
  </q-form>
</template>

<script setup>
import { validateRemotePath } from 'src/utils/quasar-validators';
import { setupState } from 'pages/setup/use-setup';
import { useI18n } from 'vue-i18n';

// Use i18n even if only $t is used in the template, for consistency
const { t } = useI18n();
</script>
