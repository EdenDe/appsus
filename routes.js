import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import mail from './apps/mail/pages/MailIndex.js'
import keep from './apps/keep/pages/NoteIndex.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/mail',
      component: mail,
    },
    {
      path: '/keep',
      component: keep,
    },
  ],
}

export const router = createRouter(routerOptions)
