<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import AddAnnotationPage from '../views/AddAnnotationPage.vue'
import Dialog from 'primevue/dialog'

const emit = defineEmits(['saveChanges', 'dialogClosed'])

const visible = ref(false)

const closeDialog = () => {
  visible.value = false
  emit('dialogClosed')
}

// annotate submit
const annotateColumn = () => {
  emit('saveChanges')
}
</script>
<template>
  <header class="fixed top-0 w-full z-1 justify-center items-center align-center flex">
    <div class="max-w-5xl flex justify-center items-center bg-white shadow-md w-full">
      <div class="m-2 flex items-center justify-evenly gap-4">
        <Button @click="annotateColumn">Save changes</Button>
        <Button label="Add annotation" icon="pi pi-external-link" @click="visible = true"></Button>
      </div>
      <div>
        <Dialog
          class="stickyHeaderAnnotationsDialog"
          v-model:visible="visible"
          modal
          header="Create annotation"
        >
          <AddAnnotationPage @close-dialog="closeDialog"> </AddAnnotationPage>
        </Dialog>
      </div>
    </div>
  </header>
</template>
<style>
.stickyHeaderAnnotationsDialog {
  width: 100% !important;
  height: 100% !important;
}

.stickyHeaderAnnotationsDialog.p-dialog {
  max-height: 100%;
}
.stickyHeaderAnnotationsDialog.p-dialog-content {
  @media screen and (max-width: 640px) {
    padding: 0px !important;
  }
}
</style>
