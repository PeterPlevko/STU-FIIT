<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { notify } from '@kyvg/vue3-notification'
import SelectButton from 'primevue/selectbutton'
import { httpsCallable } from 'firebase/functions'
import { getFunctions } from 'firebase/functions'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import SidebarNavigationComponent from '../../components/SidebarNavigationComponent.vue'
import Button from 'primevue/button'

interface UserData {
  id: string
  role: {
    admin?: boolean
    user?: boolean
  }
  email: string
}

interface UserRoles {
  [key: string]: string
}

const userRoles = ref<UserRoles>({})
const user = ref()
const users = ref<UserData[]>([])
const roleOptions = ['admin', 'user']
onMounted(async () => {
  const auth = getAuth()

  auth.onAuthStateChanged((userAuth) => {
    user.value = userAuth
  })

  const db = getFirestore()

  const rolesCollection = collection(db, 'roles')

  const snapshot = await getDocs(rolesCollection)
  snapshot.forEach((doc) => {
    const userData = doc.data() as UserData
    userData.id = doc.id
    users.value.push(userData)
    const userRole = userData.role.user ? 'user' : 'admin'
    if (userRole) {
      userRoles.value[userData.id] = userRole
    }
  })
})

const submitRoleChange = (uid: string) => {
  const selectedRole = userRoles.value[uid]
  let functions = getFunctions()
  var addMessage = httpsCallable(functions, 'SetUserRole')

  var data = { uid: uid, role: { [selectedRole]: true } }

  addMessage(data)
    .then(function () {
      notify({
        title: 'Role change',
        text: `User's role with id ${uid} has been changed to ${selectedRole}!`,
        type: 'success'
      })
    })
    .catch(function (error: any) {
      console.log(error)
    })
}
</script>

<template>
  <SidebarNavigationComponent></SidebarNavigationComponent>
  <div class="mt-4">
    <div class="flex justify-center items-center">
      <h1 class="text-4xl">Admin</h1>
    </div>
    <div class="flex justify-center items-center m-4">
      <p class="text-2xl" v-if="user">User: {{ user.email }}</p>
    </div>

    <div class="flex items-center justify-center">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                data-label="id"
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ user.id }}
              </th>

              <td data-label="Name" scope="row" class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4">
                <SelectButton
                  class="min-w-150"
                  v-model="userRoles[user.id]"
                  :options="roleOptions"
                  aria-labelledby="basic"
                />
              </td>
              <td class="px-6 py-4">
                <Button size="small" label="Submit" @click="submitRoleChange(user.id)"></Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- <AdminTable></AdminTable> -->
</template>
<style scoped>
.min-w-150 {
  min-width: 150px;
}
</style>
