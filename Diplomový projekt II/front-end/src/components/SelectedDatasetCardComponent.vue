<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import VisualizeAnnotationsComponent from './VisualizeAnnotationsComponent.vue'
import { getAuth } from 'firebase/auth'

const props = defineProps({
  columnName: String,
  datasetId: String,
  index: Number,
  anotationsResponse: {
    type: Array as () => SelectedAnnotationInformation[],
    default: () => []
  }
})

const columnDescription = ref('')
const descriptionPopUpVisible = ref(false)
const newColumnDescription = ref('')

interface SelectedAnnotationInformation {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
}

interface Annotations {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
}

const annotations = ref<Annotations[]>([])

const selectedAnnotationInformation = ref<SelectedAnnotationInformation[]>([])

const changeDescription = () => {
  if (newColumnDescription.value !== '') {
    columnDescription.value = newColumnDescription.value
    descriptionPopUpVisible.value = false
    newColumnDescription.value = ''
  } else {
    notify({
      title: 'Description',
      text: 'Description cannot be empty',
      type: 'error'
    })
  }
}

const annotationOptions = ref<SelectAnnotation[]>([])

interface SelectAnnotation {
  code: string
  name: string
}

const auth = getAuth()

const selectedAnnotation = ref<SelectAnnotation[]>([])

onMounted(async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  // Encode the name parameter so there are no problem is name is something/something because that would be a problem
  if (props.columnName && props.datasetId) {
    const encodedColumnName = encodeURIComponent(props.columnName)
    const encodedDatasetId = encodeURIComponent(props.datasetId)

    axios
      .get(`http://localhost:3000/column/getColumnDescription/`, {
        params: {
          datasetId: encodedDatasetId,
          columnName: encodedColumnName
        },
        headers: {
          Authorization: `${firebaseToken}`
        }
      })
      .then((response) => {
        if (response.data) {
          columnDescription.value = response.data.columnDescription
        } else {
          columnDescription.value = ''
        }
      })
      .catch((error) => {
        console.error('Request failed:', error)
      })
  }

  annotationOptions.value = props.anotationsResponse.map((item: any) => ({
    code: item.id,
    name: item.graphStructure
  }))

  // get what it is annotated by

  if (props.datasetId && props.columnName) {
    const encodedDatasetId = encodeURIComponent(props.datasetId)
    const encodedColumnName = encodeURIComponent(props.columnName)
    axios
      .get('http://localhost:3000/annotation/getColumnAnnotations/', {
        params: {
          datasetId: encodedDatasetId,
          columnName: encodedColumnName
        },
        headers: {
          Authorization: `${firebaseToken}`
        }
      })
      .then((response) => {
        if (response.data) {
          annotations.value = response.data
        }
      })
      .catch((error) => {
        console.error('Request failed:', error)
      })
  }
})

watch(selectedAnnotation, (newVal) => {
  // Find the object in tableData.value where the code matches the given code
  if (newVal.length > 0) {
    const matchingObject = props.anotationsResponse.find((obj: any) => obj.id === newVal[0].code)

    // If a matching object is found, assign it to selectedAnnotationInformation
    const transformToNestedArray = (obj: any) => {
      const result = [obj] // Include the top-level object in the result
      if (obj.relatedTo) {
        obj.relatedTo.forEach((related: any) => {
          result.push(...transformToNestedArray(related))
        })
      }
      return result
    }

    selectedAnnotationInformation.value = transformToNestedArray(matchingObject)
  } else {
    // Handle the case when no matching object is found
    selectedAnnotationInformation.value = []
  }
})

const requestData = async () => {
  // Perform any asynchronous operations or data retrieval
  // For example, you can fetch data related to the column
  let selectedAnnotationId
  if (selectedAnnotation.value[0]) {
    selectedAnnotationId = selectedAnnotation.value[0].code
  } else {
    selectedAnnotationId = null
  }

  return {
    columnName: props.columnName,
    columnDescription: columnDescription.value,
    selectedAnnotationId: selectedAnnotationId
  }
}

defineExpose({
  requestData
})
</script>
<template>
  <div class="flex justify-center items-center mt-12 mb-12">
    <div class="flex items-center flex-col bg-white 2xl:flex-row">
      <div class="sm:m-10 sm:p-5 bg-white rounded-lg max-w-5xl">
        <div class="flex flex-col items-center">
          <div class="m-2 text-xl font-bold">
            <p>Column selected:</p>
          </div>
          <div>
            <p>{{ columnName }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="m-2 text-xl font-bold">
            <p>Columns description:</p>
          </div>
          <div class="mb-2 text-center">
            <p v-if="columnDescription">{{ columnDescription }}</p>
            <p v-else>No description yet</p>
          </div>
          <div>
            <Button @click="descriptionPopUpVisible = true">Change description</Button>
          </div>
          <div>
            <Dialog
              v-model:visible="descriptionPopUpVisible"
              modal
              header="Change description"
              :style="{ width: '40vw' }"
            >
              <div class="flex flex-col items-center">
                <p v-if="columnDescription">{{ columnDescription }}</p>
                <p v-else>No description yet</p>
                <InputText class="m-2" type="text" v-model="newColumnDescription" />
                <Button class="m-2" @click="changeDescription">Save description</Button>
              </div>
            </Dialog>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div class="m-2 text-xl font-bold">
            <p>Annotations:</p>
          </div>
          <div v-if="annotations.length !== 0">
            <p
              v-for="annotation in annotations"
              :key="annotation.id"
              v-tooltip="{
                value: `<div><h1>ID: ${annotation.id}</h1><h1>Name: ${annotation.name}</h1><h1>Shortcut: ${annotation.shortcut}</h1><h1>Description: ${annotation.description}</h1><h1>Created at: ${annotation.createdAt}</h1><h1>Firebase user UID: ${annotation.firebaseUserUID}</h1></div>`,
                escape: true,
                class: 'graph-tooltip',
                fitContent: true,
                pt: {
                  arrow: {
                    style: {
                      borderBottomColor: 'var(--primary-color)'
                    }
                  },
                  text: 'bg-primary font-medium'
                }
              }"
            >
              <a
                :href="`/list-annotations/${annotation.id}`"
                target="_blank"
                class="text-blue-500 hover:underline hover:text-blue-700"
                >{{ annotation.shortcut }}</a
              >
            </p>
          </div>
          <div v-else>This columns has not been annotated yet</div>
        </div>

        <div class="flex flex-col items-center">
          <div class="m-2 text-xl font-bold">
            <p>Select annotation to annotate column:</p>
          </div>

          <MultiSelect
            filter
            v-model="selectedAnnotation"
            :options="annotationOptions"
            optionLabel="name"
            placeholder="Select annotation"
            :selectionLimit="1"
            class="w-20rem"
          />
        </div>

        <div class="mt-2 flex items-center flex-col">
          <div
            v-for="(item, index) in selectedAnnotationInformation"
            :key="item.id"
            class="flex items-center flex-col"
          >
            <span
              v-tooltip="{
                value: `<div><h1>ID: ${item.id}</h1><h1>Name: ${item.name}</h1><h1>Shortcut: ${item.shortcut}</h1><h1>Description: ${item.description}</h1><h1>Created at: ${item.createdAt}</h1><h1>Firebase user UID: ${item.firebaseUserUID}</h1></div>`,
                escape: true,
                class: 'graph-tooltip',
                fitContent: true,
                pt: {
                  arrow: {
                    style: {
                      borderBottomColor: 'var(--primary-color)'
                    }
                  },
                  text: 'bg-primary font-medium'
                }
              }"
              >[{{ item.shortcut }}]</span
            >
            <i
              v-if="index !== selectedAnnotationInformation.length - 1"
              class="pi pi-arrow-down"
            ></i>
          </div>
        </div>
      </div>
      <div class="border-l border-solid border-gray-300 h-full"></div>

      <div class="h-[50vh] w-full max-w-7xl" v-if="selectedAnnotationInformation.length > 0">
        <VisualizeAnnotationsComponent
          :selectedAnnotation="selectedAnnotationInformation"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.graph-tooltip.p-tooltip {
  max-width: 30rem;
}
</style>
