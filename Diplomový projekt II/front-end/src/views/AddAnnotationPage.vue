<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import { ref, onMounted, watch } from 'vue'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import DataTable from 'primevue/datatable'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Column from 'primevue/column'
import VisualizeAnnotationsComponent from '../components/VisualizeAnnotationsComponent.vue'

interface SelectedAnnotation {
  code: string
  name: string
}

const selectedAnnotation1 = ref<SelectedAnnotation[]>([])

const selectedAnnotation2 = ref<SelectedAnnotation[]>([])

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
const annotationOptionsOnlyChildren = ref<SelectAnnotation[]>([])

interface SelectedAnnotationInformation {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
}
const selectedAnnotationInformation1 = ref<SelectedAnnotationInformation[]>([])

const selectedAnnotationInformation2 = ref<SelectedAnnotationInformation[]>([])

onMounted(async () => {
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

    annotationOptionsOnlyChildren.value = response.data
      .filter((item: any) => !item.graphStructure.includes('->'))
      .map((item: any) => ({
        code: item.id,
        name: item.graphStructure
      }))

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
})

const emit = defineEmits(['close-dialog'])

const auth = getAuth()
const name = ref('')
const shortcut = ref('')
const description = ref('')

const relatedTo = ref<string | null>(null)

const submitAnnotation = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  if (name.value === '') {
    notify({
      title: 'Name',
      text: 'Name cannot be empty',
      type: 'error'
    })
    return
  }

  if (shortcut.value === '') {
    notify({
      title: 'Shortcut',
      text: 'Shortcut cannot be empty',
      type: 'error'
    })
    return
  }

  if (description.value === '') {
    notify({
      title: 'Description',
      text: 'Description cannot be empty',
      type: 'error'
    })
    return
  }

  if (selectedAnnotation1.value.length > 0) {
    relatedTo.value = selectedAnnotation1.value[0].code
  }

  const data = {
    firebaseUserUID: auth.currentUser?.uid,
    name: name.value,
    shortcut: shortcut.value,
    description: description.value,
    relatedTo: relatedTo.value,
    createdAt: new Date()
  }

  axios
    .post('http://localhost:3000/annotation/createAnnotation', data, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    })
    .then((response) => {
      if (response.data) {
        notify({
          title: 'Annotation added',
          text: 'Annotation added',
          type: 'success'
        })
      }
      emit('close-dialog')
    })
    .catch((error) => {
      console.error('Request failed:', error)
      if (error.response && error.response.status === 403) {
        notify({
          title: 'Log in',
          text: 'You need to be logged in to add an annotation',
          type: 'error'
        })
      }
    })
}

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

watch(selectedAnnotation1, (newVal) => {
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

    selectedAnnotationInformation1.value = transformToNestedArray(matchingObject)
  } else {
    // Handle the case when no matching object is found

    selectedAnnotationInformation1.value = []
  }
})

watch(selectedAnnotation2, (newVal) => {
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

    selectedAnnotationInformation2.value = transformToNestedArray(matchingObject)
  } else {
    // Handle the case when no matching object is found

    selectedAnnotationInformation2.value = []
  }
})

const deleteAnnotation = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  if (selectedAnnotation1.value[0]) {
    axios
      .delete(
        `http://localhost:3000/annotation/deleteAnnotation/${selectedAnnotation1.value[0].code}`,
        {
          headers: {
            Authorization: `${firebaseToken}`
          }
        }
      )
      .then(async (response) => {
        if (response.data) {
          notify({
            title: 'Annotation deleted',
            text: 'Annotation deleted',
            type: 'success'
          })
          emit('close-dialog')

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

            annotationOptionsOnlyChildren.value = response.data
              .filter(
                (item: any) => item.relatedTo.length > 0 && !item.graphStructure.includes('->')
              )
              .map((item: any) => ({
                code: item.id,
                name: item.graphStructure
              }))
          }

          selectedAnnotation1.value = []
        }
      })
      .catch((error) => {
        console.error('Request failed:', error)
        if (error.response && error.response.status === 403) {
          notify({
            title: 'Log in',
            text: 'You need to be logged in to delete an annotation',
            type: 'error'
          })
        }
      })
  } else {
    notify({
      title: 'Missing annotation',
      text: 'Please select annotation that you want to delete',
      type: 'error'
    })
  }
}

const connectAnnotations = async () => {
  const firebaseToken = await (await auth?.currentUser?.getIdTokenResult())?.token

  if (selectedAnnotation1.value[0]) {
    if (selectedAnnotation2.value[0]) {
      if (selectedAnnotation1.value[0].code === selectedAnnotation2.value[0].code) {
        notify({
          title: 'Annotations are the same',
          text: 'You can not connect the same annotation to itself',
          type: 'error'
        })
        return
      }
    }
  }

  if (selectedAnnotation1.value[0]) {
    if (selectedAnnotation2.value[0]) {
      const data = {
        annotationParent: selectedAnnotation1.value[0].code,
        annotationChild: selectedAnnotation2.value[0].code
      }
      axios
        .post('http://localhost:3000/annotation/connectAnnotations', data, {
          headers: {
            Authorization: `${firebaseToken}`
          }
        })
        .then((response) => {
          if (response.data) {
            notify({
              title: 'Annotations connected',
              text: 'Annotations connected',
              type: 'success'
            })
          }
          emit('close-dialog')
        })
        .catch((error) => {
          console.error('Request failed:', error)
          if (error.response && error.response.status === 403) {
            notify({
              title: 'Log in',
              text: 'You need to be logged in to connect an annotation',
              type: 'error'
            })
          }
        })
    } else {
      notify({
        title: 'Missing annotation',
        text: 'Please select child annotation that you want to connect',
        type: 'error'
      })
    }
  } else {
    notify({
      title: 'Missing annotation',
      text: 'Please select parent annotation that you want to connect',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="text-center mb-2 text-xl font-bold">
    <h1>Add annotation</h1>
  </div>

  <div>
    <div class="mb-4 flex justify-content-center">
      <div class="flex flex-column gap-2">
        <label for="username">Name</label>
        <InputText id="username" v-model="name" aria-describedby="username-help" />
        <small id="username-help">Enter name of annotation</small>
      </div>
    </div>
    <div class="mb-4 flex justify-content-center">
      <div class="flex flex-column gap-2">
        <label for="username">Shortcut</label>
        <InputText id="username" v-model="shortcut" aria-describedby="username-help" />
        <small id="username-help">Enter the shortcut of an annotation</small>
      </div>
    </div>
    <div class="mb-4 flex justify-content-center">
      <div class="flex flex-column gap-2">
        <label for="username">Description</label>
        <InputText id="username" v-model="description" aria-describedby="username-help" />
        <small id="username-help">Enter the description of an annotation</small>
      </div>
    </div>
  </div>

  <h1 class="text-center text-xl font-bold">
    Specify the related annotations for this annotation (parent).
  </h1>

  <div class="card flex flex-col justify-content-center sm:flex-row">
    <MultiSelect
      filter
      v-model="selectedAnnotation1"
      :options="annotationOptions"
      optionLabel="name"
      placeholder="Select annotation"
      :selectionLimit="1"
      class="w-full md:w-20rem mb-2 sm:mb-0"
    />

    <Button
      v-tooltip="'This will delete annotation and all its relationships'"
      class="sm:ml-2"
      type="button"
      icon="pi pi-delete-left"
      label="Delete annotation"
      @click="deleteAnnotation()"
    ></Button>
  </div>

  <div class="mb-4" v-if="selectedAnnotationInformation1.length > 0">
    <h1 class="text-center text-xl font-bold">Hover for more information</h1>
    <div class="mt-2 flex items-center flex-col">
      <div
        v-for="(item, index) in selectedAnnotationInformation1"
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
        <i v-if="index !== selectedAnnotationInformation1.length - 1" class="pi pi-arrow-down"></i>
      </div>
    </div>
  </div>

  <div class="text-center mb-4" v-if="!(selectedAnnotationInformation1.length > 0)">
    Select annotation to view it
  </div>

  <div class="h-[50vh]" v-if="selectedAnnotationInformation1.length > 0">
    <VisualizeAnnotationsComponent
      :index="1"
      :selectedAnnotation="selectedAnnotationInformation1"
    />
  </div>

  <div class="flex justify-center m-4">
    <Button @click="submitAnnotation()">Add annotation</Button>
  </div>

  <h1 class="text-center text-xl font-bold">
    Specify the related annotations for this annotation (child).
  </h1>

  <div class="card flex flex-col justify-content-center sm:flex-row">
    <MultiSelect
      filter
      v-model="selectedAnnotation2"
      :options="annotationOptionsOnlyChildren"
      optionLabel="name"
      placeholder="Select annotation"
      :selectionLimit="1"
      class="w-full md:w-20rem mb-2 sm:mb-0"
    />

    <Button
      v-tooltip="
        'This will connect the two selected annotations you can only connect children that does not have any related to relationship othervise it would break the rule'
      "
      class="sm:ml-2"
      type="button"
      icon="pi pi-arrows-h"
      label="Connect annotation"
      @click="connectAnnotations()"
    ></Button>
  </div>

  <div class="mb-4" v-if="selectedAnnotationInformation2.length > 0">
    <h1 class="text-center text-xl font-bold">Hover for more information</h1>
    <div class="mt-2 flex items-center flex-col">
      <div
        v-for="(item, index) in selectedAnnotationInformation2"
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
        <i v-if="index !== selectedAnnotationInformation2.length - 1" class="pi pi-arrow-down"></i>
      </div>
    </div>
  </div>

  <div class="text-center mb-4" v-if="!(selectedAnnotationInformation2.length > 0)">
    Select annotation to view it
  </div>

  <div class="h-[50vh]" v-if="selectedAnnotationInformation2.length > 0">
    <VisualizeAnnotationsComponent
      :index="2"
      :selectedAnnotation="selectedAnnotationInformation2"
    />
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
      <template #empty> <p>No datasets found.</p></template>
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
</template>

<style>
.graph-tooltip.p-tooltip {
  max-width: 30rem;
}
</style>
