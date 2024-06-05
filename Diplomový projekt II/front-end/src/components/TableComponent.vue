<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Papa from 'papaparse'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

const props = defineProps({
  idProps: String
})

interface ColumnForAnnotation {
  field: string
  header: string
}

const globalFilterValue = ref<any>(null)

const tableData = ref()

const dataLoaded = ref(false)

const selectedColumns = ref<ColumnForAnnotation[]>([])

const columns = ref<ColumnForAnnotation[]>([])

const onToggle = (val: any) => {
  selectedColumns.value = columns.value.filter((col: any) => val.includes(col))
}

const id = ref<any>(null)

const dataset = ref<any>(null)
const db = getFirestore()
const datasetsCollection = collection(db, 'datasets')

const filters = ref()
const datasetDescription = ref<any>(null)

interface AnotationsResponse {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
  relatedTo: AnotationsResponse[]
}
const anotationsResponse = ref<AnotationsResponse[]>([])

const annotationOptions = ref<SelectAnnotation[]>([])

interface SelectAnnotation {
  code: string
  name: string
}

const auth = getAuth()

onMounted(async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  id.value = props.idProps
  const docRef = await getDoc(doc(datasetsCollection, id.value))
  dataset.value = docRef.data()
  if (dataset.value) {
    dataset.value.id = id.value

    const result = Papa.parse(dataset.value.csvData, {
      header: true,
      dynamicTyping: true
    })

    dataset.value.csvData = result.data

    tableData.value = dataset.value.csvData

    const columnKeys = Object.keys(dataset.value.csvData[0])

    columns.value = columnKeys.map((key) => ({
      field: key,
      header: key
    }))

    selectedColumns.value = columns.value.slice(0, 3)
    globalFilterValue.value = selectedColumns.value.map((column: any) => column.field)

    const response = await axios.get(
      `http://localhost:3000/dataset/getDatasetDescription/${dataset.value.id}`,
      {
        headers: {
          Authorization: `${firebaseToken}`
        }
      }
    )

    datasetDescription.value = response.data

    dataLoaded.value = true
    initFilters()
  }

  // annotations part
  const response = await axios.get('http://localhost:3000/annotation/getAnnotations', {
    headers: {
      Authorization: `${firebaseToken}`
    }
  })

  if (response.data.length > 0) {
    anotationsResponse.value = response.data
    annotationOptions.value = response.data.map((item: any) => ({
      code: item.id,
      name: item.graphStructure
    }))
  }
})

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  if (columns.value) {
    columns.value.forEach((column: any) => {
      const filterKey = column.field
      const filter = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      }
      filters.value[filterKey] = filter
    })
  }
}

initFilters()

const clearFilter = () => {
  initFilters()
}

const exportCSV = () => {
  const csvString = Papa.unparse(dataset.value.csvData)

  const blob = new Blob([csvString], { type: 'text/csv' })

  const blobUrl = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = blobUrl
  a.download = `${dataset.value.datasetName}.csv`

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)
}

const exportAnnotations = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  const encodedId = encodeURIComponent(dataset.value.id)
  axios
    .get(`http://localhost:3000/annotation/getExport/${encodedId}`, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    })
    .then(async (response) => {
      if (response.data) {
        // user information
        const usersCollection = collection(db, 'roles')
        const userInformation = await (
          await getDoc(doc(usersCollection, response.data.dataset.firebaseUserUID))
        ).data()
        response.data.dataset.email = userInformation?.email
        const role = userInformation?.role

        let finalRole = ''
        if (role) {
          for (const key in role) {
            finalRole = key
          }
        }
        if (finalRole !== '') {
          response.data.dataset.role = finalRole
        }
        // dataset information

        const datasetInformation = await (
          await getDoc(doc(datasetsCollection, response.data.dataset.firebaseDatasetID))
        ).data()

        // Create a new object with all key-value pairs from datasetInformation except for "csvData"
        const newData = { ...datasetInformation }
        delete newData.csvData // Exclude the "csvData" property
        delete newData.id // Exclude the "id" property

        // Merge the new data into response.data[0].dataset
        response.data.dataset = {
          ...response.data.dataset,
          ...newData
        }

        // export the object
        const jsonData = JSON.stringify(response.data, null, 2)

        // Create a Blob and Object URL for the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        // Create an anchor element to trigger the download
        const a = document.createElement('a')
        a.href = url

        a.download = `${dataset.value.datasetName}.json`

        // Simulate a click event to trigger the download
        a.click()

        // Release the Object URL
        URL.revokeObjectURL(url)
      }
    })
    .catch((error) => {
      console.error('Request failed:', error)
    })
}
</script>
<template>
  <div v-if="dataLoaded">
    <div class="mx-auto max-w-7xl selectDatasetTable">
      <Toolbar class="mb-4 justify-center">
        <template #start>
          <div class="flex items-center flex-column lg:flex-row gap-2 lg:gap-0">
            <div>
              <MultiSelect
                :maxSelectedLabels="2"
                :modelValue="selectedColumns"
                :options="columns"
                optionLabel="header"
                @update:modelValue="onToggle"
                display="chip"
                placeholder="Select Columns"
                class="w-full md:w-20rem"
              />
            </div>
            <div v-if="selectedColumns" class="ml-3 font-normal">
              {{ selectedColumns.length }} of {{ columns.length }} columns selected
            </div>
            <div class="ml-2">
              <Button label="Export dataset" icon="pi pi-upload" @click="exportCSV()"></Button>
            </div>
            <div class="ml-2">
              <Button
                label="Export annotations"
                icon="pi pi-upload"
                @click="exportAnnotations()"
              ></Button>
            </div>
          </div>
        </template>
      </Toolbar>

      <DataTable
        v-model:filters="filters"
        filterDisplay="menu"
        class="max-w-7xl"
        paginator
        :rows="5"
        :value="tableData"
        tableStyle="min-width: 50rem"
        :globalFilterFields="globalFilterValue"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              @click="clearFilter()"
            ></Button>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  class="w-full"
                />
              </span>
            </div>
          </div>
        </template>
        <template #empty> <p>No datasets found.</p></template>
        <template #footer v-if="dataset && selectedColumns.length === 0"
          ><div class="bg-white"><p>No columns selected.</p></div></template
        >
        <Column
          :exportable="true"
          :sortable="true"
          v-for="(col, index) of selectedColumns"
          :field="col.field"
          :header="col.header"
          :key="col.field + '_' + index"
          :filter-field="col.field"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
