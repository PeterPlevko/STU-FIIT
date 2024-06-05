<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
const auth = getAuth()

const props = defineProps({
  dataset: Object
})
onMounted(async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  const response = await axios.get(
    `http://localhost:3000/dataset/getDatasetDescription/${props.dataset?.id}`,
    {
      headers: {
        Authorization: `${firebaseToken}`
      }
    }
  )

  datasetDescription.value = response.data
})
const datasetDescription = ref<any>(null)
const descriptionPopUpVisible = ref(false)
const newDatasetDescription = ref('')

const changeDescription = () => {
  if (newDatasetDescription.value !== '') {
    datasetDescription.value = newDatasetDescription.value
    descriptionPopUpVisible.value = false
    newDatasetDescription.value = ''
  } else {
    notify({
      title: 'Description',
      text: 'Description cannot be empty',
      type: 'error'
    })
  }
}

const requestData = async () => {
  return {
    datasetDescription: datasetDescription.value
  }
}

defineExpose({
  requestData
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="sm:m-10 bg-white p-5 rounded-lg max-w-5xl mt-20">
      <div class="flex flex-col items-center">
        <h1 class="m-2 text-xl font-bold">Dataset name</h1>
        <h1 v-if="dataset">{{ dataset.datasetName }}</h1>
        <h1 v-else>Name not found</h1>
      </div>
      <div class="flex flex-col items-center">
        <h1 class="m-2 text-xl font-bold">Dataset description</h1>
        <h1 v-if="datasetDescription">{{ datasetDescription }}</h1>
        <h1 v-else>Dataset description not found</h1>
      </div>
      <div class="mt-2 flex flex-col items-center">
        <Button @click="descriptionPopUpVisible = true">Change description</Button>
      </div>
      <div>
        <Dialog
          v-model:visible="descriptionPopUpVisible"
          modal
          header="Change dataset description"
          :style="{ width: '40vw' }"
        >
          <div class="flex flex-col items-center">
            <p v-if="datasetDescription">{{ datasetDescription }}</p>
            <p v-else>No description yet</p>
            <InputText class="m-2" type="text" v-model="newDatasetDescription" />
            <Button class="m-2" @click="changeDescription">Save description</Button>
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
