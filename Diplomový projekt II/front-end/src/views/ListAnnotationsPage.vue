<script setup lang="ts">
import SidebarNavigationComponent from '../components/SidebarNavigationComponent.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Column from 'primevue/column'
import VisualizeAnnotationsComponent from '../components/VisualizeAnnotationsComponent.vue'
import AddAnnotationPage from './AddAnnotationPage.vue'
import Dialog from 'primevue/dialog'
import { useRoute } from 'vue-router'
import { getAuth } from 'firebase/auth'

interface SelectedAnnotation {
  code: string
  name: string
}

const selectedAnnotation = ref<SelectedAnnotation[]>([])

interface ColumnForAnnotation {
  field: string
  header: string
}

let columns = ref<ColumnForAnnotation[]>([])

const selectedColumns = ref<ColumnForAnnotation[]>([])

const globalFilterValue = ref<string[]>([])

interface SelectAnnotation {
  code: string
  name: string
}

const annotationOptions = ref<SelectAnnotation[]>([])

interface SelectedAnnotationInformation {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
}
const selectedAnnotationInformation = ref<SelectedAnnotationInformation[]>([])
const auth = getAuth()

// Access the id parameter from the route
const route = useRoute()
let id: string | string[] | null = null
if (route) {
  id = route.params.id
}

const initPage = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  const response = await axios.get('http://localhost:3000/annotation/getAnnotations', {
    headers: {
      Authorization: `${firebaseToken}`
    }
  })

  if (response.data.length > 0) {
    annotationOptions.value = response.data.map((item: any) => ({
      code: item.id,
      name: item.graphStructure
    }))

    if (id) {
      const foundAnnotation = annotationOptions.value.find((option) => option.code === id)
      if (foundAnnotation) {
        selectedAnnotation.value = [foundAnnotation]
      }
    }

    tableData.value = response.data

    const columnKeys = Object.keys(response.data[0])

    columns = ref(
      columnKeys.map((key) => ({
        field: key,
        header: key
      }))
    )

    const columnOrder = [
      'id',
      'name',
      'shortcut',
      'description',
      'createdAt',
      'firebaseUserUID',
      'graphStructure'
    ]

    columns.value = columns.value.filter((column: any) => column.field !== 'relatedTo')

    const orderedColumns = columns.value
      .filter((column: any) => columnOrder.includes(column.field))
      .sort((a: any, b: any) => columnOrder.indexOf(a.field) - columnOrder.indexOf(b.field))

    columns.value = orderedColumns

    selectedColumns.value = columns.value
    if (selectedColumns.value) {
      globalFilterValue.value = selectedColumns.value.map((column: any) => column.field)
    } else {
      globalFilterValue.value = []
    }
    initFilters()
  }
}

onMounted(async () => {
  await initPage()
})

// data table part

const tableData = ref()
const filters = ref()

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

watch(selectedAnnotation, (newVal) => {
  // Find the object in tableData.value where the code matches the given code
  if (newVal.length > 0) {
    const matchingObject = tableData.value.find((obj: any) => obj.id === newVal[0].code)

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

// dialog
const visible = ref(false)

const closeDialog = async () => {
  await initPage()
  visible.value = false
}
</script>

<template>
  <SidebarNavigationComponent></SidebarNavigationComponent>
  <div class="pt-4 p-0 card max-w-screen-2xl mx-auto sm:p-5">
    <h1 class="text-center text-xl font-bold mb-2">List annotations</h1>

    <h1 class="text-center text-xl font-bold">
      Specify the related annotations for this annotation.
    </h1>

    <div class="card flex justify-content-center">
      <MultiSelect
        filter
        v-model="selectedAnnotation"
        :options="annotationOptions"
        optionLabel="name"
        placeholder="Select annotation"
        :selectionLimit="1"
        class="w-full md:w-20rem"
      />
    </div>

    <div v-if="selectedAnnotationInformation">
      <h1 class="text-center text-xl font-bold">Hover for more information</h1>
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
          <i v-if="index !== selectedAnnotationInformation.length - 1" class="pi pi-arrow-down"></i>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <Button label="Add annotation" icon="pi pi-external-link" @click="visible = true"></Button>
      <div>
        <Dialog
          class="listAnnotationsDialog"
          v-model:visible="visible"
          modal
          header="Create annotation"
        >
          <AddAnnotationPage @close-dialog="closeDialog()"> </AddAnnotationPage>
        </Dialog>
      </div>
    </div>

    <div class="text-center m-4 text-xl font-bold">
      <h1>Visualisation of annotations</h1>
    </div>

    <div class="text-center m-4" v-if="!(selectedAnnotationInformation.length > 0)">
      Select annotation to view it
    </div>

    <div class="mb-8 h-[50vh]" v-if="selectedAnnotationInformation.length > 0">
      <VisualizeAnnotationsComponent :selectedAnnotation="selectedAnnotationInformation" />
    </div>

    <div class="mt-4">
      <DataTable
        v-model:filters="filters"
        filterDisplay="menu"
        paginator
        :rows="5"
        :value="tableData"
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
        <template #empty> <p>No annotations found.</p></template>
        <template #footer v-if="tableData && selectedColumns.length === 0"
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

<style>
.graph-tooltip.p-tooltip {
  max-width: 30rem;
}

.listAnnotationsDialog {
  width: 100% !important;
  height: 100% !important;
}

.listAnnotationsDialog.p-dialog {
  max-height: 100%;
}

.listAnnotationsDialog.p-dialog-content {
  @media screen and (max-width: 640px) {
    padding: 0px !important;
  }
}
</style>
