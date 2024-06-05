<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section> Create channel </q-card-section>
      <q-card-section>
        <q-input
          v-model="channelName"
          label="Channel channel"
          filled
          class="q-mt-sm"
          style="width: 100%"
          :rules="nameRules"
        />
      </q-card-section>

      <q-card-section>
        <q-toggle
          v-model="isPrivate"
          label="I secretChannel the license and terms"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="createChannel()" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const $q = useQuasar();
    const channelName = ref('');
    const isPrivate = ref(false);
    const nameRules = [(value: string) => !!value || 'Field is required'];

    return {
      nameRules,
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      isPrivate,
      channelName,

      createChannel() {
        if (channelName.value) {
          onDialogOK({
            channelName: channelName.value,
            isPrivate: isPrivate.value,
          });
        } else {
          $q.notify({
            color: 'negative',
            message: 'You need to set channel name',
          });
        }
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
