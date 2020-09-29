import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing'
import Auth from '../views/Auth/index.vue'
import Login from '../views/Auth/Login/Login.vue'
import Register from '../views/Auth/Register/Register.vue'
import CreatePin from '../views/Auth/CreatePin/CreatePin.vue'
import PinSuccess from '../views/Auth/CreatePin/PinSuccess.vue'
import ForgotPassword from '../views/Auth/ForgotPassword/ForgotPassword.vue'
import NewPassword from '../views/Auth/ForgotPassword/NewPassword.vue'
import Main from '../views/Main/index.vue'
import Transfer from '../views/Main/Transfer/Index.vue'
import AddReceive from '../views/Main/Transfer/Transfer/Transfer.vue'
import Amount from '../views/Main/Transfer/amount/Amount.vue'
import Confirm from '../views/Main/Transfer/Confirm/Confirm.vue'
import Success from '../views/Main/Transfer/status/Succes.vue'
import Failed from '../views/Main/Transfer/status/Failed.vue'
import Home from '../views/Main/Home/Home.vue'
import Profile from '../views/Main/Profile/Profile.vue'
import Personal from '../views/Main/Personal/Personal.vue'
import ChangePassword from '../views/Main/ChangePassword/ChangePassword.vue'
import ChangePin from '../views/Main/ChangePin/ChangePin.vue'
import NewPin from '../views/Main/ChangePin/NewPin.vue'
import AddNumber from '../views/Main/PhoneNumber/AddNumber.vue'
import ManageNumber from '../views/Main/PhoneNumber/ManageNumber.vue'

Vue.use(VueRouter)

const routes = [ //
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: {
      name: 'Login'
    },
    // meta:
    children: [ //
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'sign-up',
        name: 'Register',
        component: Register
      },
      {
        path: 'create-pin',
        name: 'CreatePin',
        component: CreatePin
      },
      {
        path: 'success',
        name: 'PinSuccess',
        component: PinSuccess
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
      },
      {
        path: 'new-password',
        name: 'NewPassword',
        component: NewPassword
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    // meta:
    children: [ //
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Home
      },
      {
        path: 'transfer',
        name: 'Transfer',
        component: Transfer,
        children: [
          {
            path: 'amount',
            name: 'Amount',
            component: Amount
          },
          {
            path: 'addreceive',
            name: 'Add Receive',
            component: AddReceive
          },
          {
            path: 'confirm',
            name: 'Confirm',
            component: Confirm
          },
          {
            path: 'success',
            name: 'Success',
            component: Success
          },
          {
            path: 'failed',
            name: 'Failed',
            component: Failed
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'personal-info',
        name: 'Personal',
        component: Personal
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: ChangePassword
      },
      {
        path: 'change-pin',
        name: 'ChangePin',
        component: ChangePin
      },
      {
        path: 'new-pin',
        name: 'NewPin',
        component: NewPin
      },
      {
        path: 'add-phone',
        name: 'AddNumber',
        component: AddNumber
      },
      {
        path: 'manage-number',
        name: 'ManageNumber',
        component: ManageNumber
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
