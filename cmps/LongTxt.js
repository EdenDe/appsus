export default {
	props: ['txt'],
	template: `
        {{displayTxt}}  
        <button class="btn-long-text" @click="isShown=!isShown" v-if="txt.length > txtMaxLength ">
       		 Read {{isShown? 'less' : 'more'}}
        </button>
  `,
	data() {
		return {
			isShown: false,
			txtMaxLength: 100,
		}
	},
	computed: {
		displayTxt() {
			if (!this.isShown && this.txt.length > this.txtMaxLength)
				return this.txt.slice(0, this.txtMaxLength)

			return this.txt
		},
	},
}
