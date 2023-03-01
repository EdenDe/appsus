import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetail from './apps/mail/pages/MailDetail.js'
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
		// mail
		{
			path: '/mail',
			component: MailIndex,
		},
		{
			path: '/mail/:mailId',
			component: MailDetail,
		},
		// notes
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
