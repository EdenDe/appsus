import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailDetail from './apps/mail/pages/EmailDetails.js'
import EmailAll from './apps/mail/pages/EmailAll.js'
import EmailCompose from './apps/mail/cmps/EmailCompose.js'

import note from './apps/keep/pages/NoteIndex.js'
import AddNote from './apps/keep/cmps/AddNote.js'
import EmailCompose from './apps/mail/cmps/EmailCompose.js'
import BookDetails from './apps/book/pages/BookDetails.js'
import BookIndex from './apps/book/pages/BookIndex.js'
import BookEdit from './apps/book/pages/BookEdit.js'
import BookAdd from './apps/book/cmps/BookAdd.js'

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
      component: EmailIndex,
      children: [
        {
          path: '',
          component: EmailAll,
          props: true,
          children: [
            {
              path: 'compose',
              component: EmailCompose,
            },
          ],
        },
        {
          path: ':mailId',
          component: EmailDetail,
          props: false,
        },
      ],
    },
    {
      path: '/note',
      component: note,
      children: [
        {
          path: 'edit/:noteId?',
          component: AddNote,
        },
      ],
    },
    {
      path: '/book',
      component: BookIndex,
    },
    {
      path: '/book/:bookId',
      component: BookDetails,
    },
    {
      path: '/book/edit/:bookId?',
      component: BookEdit,
    },
    {
      path: '/book/add/',
      component: BookAdd,
    },
    {
      path: '/:catchAll(.*)',
      component: HomePage,
    },
  ],
}

export const router = createRouter(routerOptions)
