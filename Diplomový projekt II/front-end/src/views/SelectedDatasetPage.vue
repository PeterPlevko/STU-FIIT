<script setup lang="ts">
import SidebarNavigationComponent from '../components/SidebarNavigationComponent.vue'
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import SelectedDatasetCardComponent from '../components/SelectedDatasetCardComponent.vue'
import StickyHeaderComponent from '../components/StickyHeaderComponent.vue'
import DatasetInformationComponent from '../components/DatasetInformationComponent.vue'
import TableComponent from '../components/TableComponent.vue'
import { getAuth } from 'firebase/auth'

interface ColumnForAnnotation {
  field: string
  header: string
}

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
const columns = ref<ColumnForAnnotation[]>([])
const route = useRoute()
const id = ref<any>(null)
const datasetInformation = ref<typeof DatasetInformationComponent>()
const dataset = ref<any>(null)
const auth = getAuth()
const refreshPageKey = ref(0)

onMounted(async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  const db = getFirestore()
  const datasetsCollection = collection(db, 'datasets')
  // table part
  const param = route.params.id
  id.value = param
  const docRef = await getDoc(doc(datasetsCollection, id.value))
  dataset.value = docRef.data()
  if (dataset.value) {
    dataset.value.id = id.value
    const result = Papa.parse(dataset.value.csvData, {
      header: true,
      dynamicTyping: true
    })

    dataset.value.csvData = result.data
    const columnKeys = Object.keys(dataset.value.csvData[0])
    columns.value = columnKeys.map((key) => ({
      field: key,
      header: key
    }))
  }

  // annotations part
  const response = await axios.get('http://localhost:3000/annotation/getAnnotations', {
    headers: {
      Authorization: `${firebaseToken}`
    }
  })

  if (response.data.length > 0) {
    anotationsResponse.value = response.data
  }
})

// annotate submit
let columnData: any[] = []
const itemRefs = ref<(typeof SelectedDatasetCardComponent)[]>([])

const annotateColumn = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  const dataFromChildComponent = await datasetInformation.value?.requestData()

  const dataThing = {
    datasetDescription: dataFromChildComponent.datasetDescription,
    id: dataset.value.id
  }

  axios
    .post('http://localhost:3000/dataset/updateDatasetDescription', dataThing, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    })
    .then((response) => {
      if (response.data) {
        notify({
          title: 'Description',
          text: 'Description was updated successfully',
          type: 'success'
        })
      }
    })
    .catch((error) => {
      console.error('Request failed:', error)
      if (error.response && error.response.status === 403) {
        notify({
          title: 'Log in',
          text: 'You need to be logged in to update dataset description',
          type: 'error'
        })
      }
    })

  columnData = []
  // Access child components using refs
  if (Array.isArray(itemRefs.value)) {
    // Loop through child components and request data
    for (const child of itemRefs.value) {
      const data = await child.requestData()

      // Add the data to the array or handle it as needed
      columnData.push(data)
    }
  }

  const data = {
    firebaseDatasetID: dataset.value.id,
    columns: columnData
  }

  const data1 = {
    firebaseDatasetID: dataset.value.id,
    columns: columnData
  }
  axios
    .post('http://localhost:3000/column/updateOrCreate', data1, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    })
    .then((response) => {
      if (response.data) {
        notify({
          title: 'Column updated',
          text: 'Column updated successfully.',
          type: 'success'
        })
      } else {
        notify({
          title: 'Column was not updated',
          text: 'Column was not updated successfully',
          type: 'error'
        })
      }
    })
    .catch((error) => {
      console.error('Request failed:', error)
      if (error.response && error.response.status === 403) {
        notify({
          title: 'Log in',
          text: 'You need to be logged in to update column description',
          type: 'error'
        })
      }
    })

  axios
    .post('http://localhost:3000/annotation/annotateColumn', data, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    })
    .then((response) => {
      refreshPageKey.value++

      if (response.data) {
        notify({
          title: 'Column annotated',
          text: 'Column annotated successfully.',
          type: 'success'
        })
      } else {
        notify({
          title: 'Column was not annotated',
          text: 'Column was not annotated',
          type: 'error'
        })
      }
    })
    .catch((error) => {
      console.error('Request failed:', error)
      if (error.response && error.response.status === 403) {
        notify({
          title: 'Log in',
          text: 'You need to be logged in to annotate columns',
          type: 'error'
        })
      }
    })
}

const refetchData = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  // annotations part
  const response = await axios.get('http://localhost:3000/annotation/getAnnotations', {
    headers: {
      Authorization: `${firebaseToken}`
    }
  })

  if (response.data.length > 0) {
    anotationsResponse.value = []
    anotationsResponse.value = response.data
    refreshPageKey.value++
  }
}
</script>

<template>
  <SidebarNavigationComponent></SidebarNavigationComponent>

  <StickyHeaderComponent
    @dialogClosed="refetchData()"
    @saveChanges="annotateColumn()"
  ></StickyHeaderComponent>

  <DatasetInformationComponent
    ref="datasetInformation"
    v-if="dataset"
    :dataset="dataset"
  ></DatasetInformationComponent>

  <TableComponent v-if="id" :idProps="id"></TableComponent>

  <div class="flex justify-center items-center">
    <div class="m-10 bg-white p-5 rounded-lg max-w-5xl">
      <h1>Annotation part</h1>
    </div>
  </div>

  <div :key="refreshPageKey">
    <div :key="anotationsResponse.length" v-if="anotationsResponse.length !== 0">
      <SelectedDatasetCardComponent
        v-for="(column, index) in columns"
        ref="itemRefs"
        :key="index"
        :columnName="column.field"
        :datasetId="dataset.id"
        :anotationsResponse="anotationsResponse"
        :index="index"
      />
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

<style>
.selectDatasetTable .p-datatable .p-datatable-footer {
  background-color: white;
  font-weight: 400;
}
</style>
