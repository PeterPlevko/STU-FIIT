<script setup lang="ts">
import SidebarNavigationComponent from '../components/SidebarNavigationComponent.vue'
import { ref, onMounted } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import FileUpload from 'primevue/fileupload'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const datasets = ref()
const selectedDatasets = ref()
const filters = ref()

const db = getFirestore()
const datasetsCollection = collection(db, 'datasets')

const getDatasets = (data: any) =>
  data.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
    publishDate: new Date(doc.data().publishDate)
  }))

const loadDatasets = async () => {
  try {
    const querySnapshot = await getDocs(datasetsCollection)
    const data = querySnapshot.docs.map((doc) => doc)
    datasets.value = getDatasets(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  await loadDatasets()
})

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    datasetName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    authorName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    publishDate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    },
    size: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  }
}

initFilters()

const formatDate = (value: any) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const clearFilter = () => {
  initFilters()
}

// csv file upload
import { getAuth } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'

const auth = getAuth()

const SMALL_FILE_SIZE_THRESHOLD = 1000000 // 1 MB
const MEDIUM_FILE_SIZE_THRESHOLD = 5000000 // 5 MB
const fileInputKey = ref(0)

const onUpload = async (event: any) => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token
  if (firebaseToken) {
    const parsedCSVData = ref<string | null>(null)
    const timestamp = ref<string | null>(null)
    const userEmail = ref<string | null>(null)
    const userUID = ref<string | null>(null)

    const datasetSize = ref<string | null>(null)
    const fileName = ref<string | null>(null)
    const files = event.files

    if (files && files.length > 0) {
      const file = files[0]
      fileName.value = file.name
      if (fileName.value) {
        fileName.value = fileName.value.replace('.csv', '')
      }

      const size = file.size
      if (size <= SMALL_FILE_SIZE_THRESHOLD) {
        datasetSize.value = 'small'
      } else if (size <= MEDIUM_FILE_SIZE_THRESHOLD) {
        datasetSize.value = 'medium'
      } else {
        datasetSize.value = 'big'
      }

      const auth = getAuth()
      userEmail.value = auth.currentUser?.email ?? null
      userUID.value = auth.currentUser?.uid ?? null

      const now = new Date()
      timestamp.value = now.toLocaleString()

      const reader = new FileReader()

      await new Promise<void>((resolve, reject) => {
        reader.onload = (event) => {
          const content = event.target?.result as string

          parsedCSVData.value = content
          resolve()
        }

        reader.onerror = (event) => {
          notify({
            title: 'Dataset',
            text: 'Dataset was not succesfully uploaded',
            type: 'error'
          })
          const error = event.target?.error
          reject(new Error(`Error reading the file: ${error}`))
        }

        notify({
          title: 'Dataset',
          text: 'Dataset was succesfully uploaded',
          type: 'success'
        })
        reader.readAsText(file)
      })
    }

    if (parsedCSVData.value) {
      try {
        const db = getFirestore()
        const datasetsCollection = collection(db, 'datasets')

        const data = {
          datasetName: fileName.value,
          authorName: userEmail.value,
          authorUID: userUID.value,
          publishDate: timestamp.value,
          size: datasetSize.value,
          csvData: parsedCSVData.value
        }

        const document = await addDoc(datasetsCollection, data)

        await loadDatasets()

        let neo4jDatasetData = {
          datasetName: fileName.value,
          firebaseUserUID: userUID.value,
          firebaseDatasetID: document.id
        }
        // here i will send the request to the server
        axios
          .post('http://localhost:3000/dataset/createDataset', neo4jDatasetData, {
            headers: {
              Authorization: `${firebaseToken}`
            }
          })
          .then((response) => {
            if (response.data) {
              /* empty */
            }
          })
          .catch((error) => {
            console.error('Request failed:', error)
            if (error.response && error.response.status === 403) {
              notify({
                title: 'Log in',
                text: 'You need to be logged in to create a dataset',
                type: 'error'
              })
            }
          })

        fileInputKey.value++
      } catch (error) {
        console.error('Error saving data to Firestore', error)
      }
    }
  } else {
    notify({
      title: 'Log in',
      text: 'You need to be logged in to create a dataset',
      type: 'error'
    })
    fileInputKey.value++
    return
  }
}
</script>
<template>
  <SidebarNavigationComponent></SidebarNavigationComponent>
  <div class="flex justify-center items-center">
    <div class="m-10 bg-white p-5 rounded-lg max-w-5xl">
      <h1>Find your dataset</h1>
    </div>
  </div>

  <div>
    <div class="mx-auto card max-w-7xl">
      <FileUpload
        class="mb-4"
        mode="basic"
        accept=".csv"
        :maxFileSize="1000000"
        @select="onUpload"
        :auto="false"
        :fileLimit="1"
        chooseLabel="Upload CSV dataset file"
        :key="fileInputKey"
      />
      <DataTable
        v-model:filters="filters"
        v-model:selection="selectedDatasets"
        :value="datasets"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="menu"
        :globalFilterFields="['id', 'datasetName', 'authorName', 'publishDate', 'size']"
      >
        <template #header>
          <div class="flex justify-content-between">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              @click="clearFilter()"
            ></Button>
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="w-full"
              />
            </span>
          </div>
        </template>
        <template #empty> No datasets found. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="id" header="ID" sortable style="min-width: 7rem">
          <template #body="{ data }">
            <a :href="`/selected-dataset/${data.id}`" class="text-blue-500 underline">{{
              data.id
            }}</a>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by id"
            />
          </template>
        </Column>
        <Column field="datasetName" header="Dataset name" sortable style="min-width: 14rem">
          <template #body="{ data }">
            {{ data.datasetName }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by datasetName"
            />
          </template>
        </Column>
        <Column field="authorName" header="Author's name" sortable style="min-width: 14rem">
          <template #body="{ data }">
            {{ data.authorName }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by authorName"
            />
          </template>
        </Column>
        <Column
          field="publishDate"
          header="Publish date"
          sortable
          filterField="publishDate"
          dataType="date"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{ formatDate(data.publishDate) }}
          </template>
          <template #filter="{ filterModel }">
            <Calendar
              v-model="filterModel.value"
              dateFormat="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              mask="99/99/9999"
            />
          </template>
        </Column>
        <Column field="size" header="size" sortable style="min-width: 7rem">
          <template #body="{ data }">
            {{ data.size }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by size"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
html {
  font-size: 14px;
}

body {
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);
  padding: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

p {
  line-height: 1.75;
}
</style>
