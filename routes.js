import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailDetail from './apps/mail/pages/EmailDetails.js'
import EmailAll from './apps/mail/pages/EmailAll.js'
import note from './apps/keep/pages/NoteIndex.js'
import AddNote from './apps/keep/cmps/addNote.js'
import EmailCompose from './apps/mail/cmps/EmailCompose.js'

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

		// notes
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
	],
}

export const router = createRouter(routerOptions)
