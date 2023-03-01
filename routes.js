import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import mail from './apps/mail/pages/MailIndex.js'
import note from './apps/keep/pages/NoteIndex.js'
import addNote from './apps/keep/cmps/addNote.js'

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
      path: '/note',
      component: note,
    },
    {
      path: '/note/edit',
      component: addNote,
    },
  ],
}

export const router = createRouter(routerOptions)
