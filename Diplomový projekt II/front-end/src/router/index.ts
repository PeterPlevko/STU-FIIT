import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/find-dataset',
      name: 'find-dataset',
      component: () => import('../views/FindDatasetPage.vue')
    },
    {
      path: '/selected-dataset/:id',
      name: 'selected-dataset',
      component: () => import('../views/SelectedDatasetPage.vue')
    },
    {
      path: '/list-annotations',
      name: 'list-annotations',
      component: () => import('../views/ListAnnotationsPage.vue')
    },
    {
      path: '/list-annotations/:id',
      name: 'list-annotations-with-id',
      component: () => import('../views/ListAnnotationsPage.vue')
    },
    {
      path: '/add-annotation',
      name: 'add-annotation',
      component: () => import('../views/AddAnnotationPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()

  // Wrap onAuthStateChanged in a Promise to wait for authentication state
  const waitForAuthState = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
        unsubscribe() // Stop listening after getting the auth state
        resolve(userAuth)
      })
    })
  }

  try {
    const userAuth = await waitForAuthState()

    if (userAuth) {
      const idTokenResult = await auth?.currentUser?.getIdTokenResult()
      const { claims } = idTokenResult!
      if (claims.admin && to.path.startsWith('/admin')) {
        next() // Allow access
      } else if (claims.admin) {
        next()
      } else if (!claims.admin && to.path.startsWith('/admin')) {
        next({ path: '/login' }) // Forbid access to admin if user is not admin
        alert('You must be admin in order to see this page')
      } else {
        next() // if user is not admin but is logged in, allow access to all other pages
      }
    } else {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        alert('You must be logged in to see this page')
        next({ path: '/login' })
      } else {
        next()
      }
    }
  } catch (error) {
    console.error('Error checking authentication state:', error)
    next()
  }
})

export default router
