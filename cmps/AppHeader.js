export default {
	template: `
    <header class="app-header full" :class="{'menu-open':openMenu}">
      <router-link to="/" class="fa logo">AppSus</router-link>  
      <nav class="main-menu">
        <router-link to="/">Home</router-link>  
        <hr>
        <router-link to="/mail">Email</router-link>
        <router-link to="/note">Keep</router-link>
        <router-link to="/book">Book</router-link>
        <hr>
        <router-link to="/about">About</router-link>
      </nav>
      <button :class="btnIcon" class="btn-ham" @click="openMenu = !openMenu"></button>
      <div class="screen" @click="openMenu = false"></div>
    </header>
    `,
	data() {
		return {
			openMenu: false,
		}
	},
	watch: {
		route() {
			this.openMenu = false
		},
	},
	computed: {
		btnIcon() {
			return this.openMenu ? 'fa close' : 'fa bars'
		},
		route() {
			return this.$route
		},
	},
}
