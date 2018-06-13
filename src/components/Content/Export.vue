<template>
	<div class="content--export">

		<NavOther/>

		<h1>Export settings</h1>

		<!-- <input type="text" v-model="message">
		<button type="button"
		v-clipboard:copy="message"
		v-clipboard:success="onCopy"
		v-clipboard:error="onError">Copy!</button> -->

		<!-- {{  fonts }} -->
		<!-- <link href="https://fonts.googleapis.com/css?family=" rel="stylesheet"> -->
		<div v-for="(el, i) in getTextElements">div:nth-child({{ i }}) {<br>
			font-family: '{{ el.styles.fontFamily}}';<br>
			font-weight: {{ el.styles.fontWeight }} ;<br>
			font-size: {{ el.styles.fontSize}};<br>
			line-height: {{ el.styles.lineHeight }};<br>
			letter-spacing: {{ el.styles.letterSpacing }};<br>
			text-transform: {{ el.styles.textTransform }};<br>
			margin-bottom: {{ el.styles.marginBottom }};<br>
			font-style: normal;<br>
		}<br><br>
	</div>

</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import _ from 'underscore'
import VueClipboard from 'vue-clipboard2'	

import NavOther from '../Partials/NavOther.vue'

Vue.use(VueClipboard)

export default {
	name: 'Export',
	data: function () {
		return {
			message: 'Copy These Text'
		}
	},
	components: {
		NavOther
	},
	computed: {
		...mapGetters([
			'getTextElements'
			]),
		fonts() {
			var arr = this.getTextElements.map(el => {
				return [el.styles.fontFamily, el.styles.fontWeight]
			})
			return arr 
			return arr = _.uniq(arr, (item, key, a) => {
				return item.a
			})
		}
	},
	methods: {
		onCopy: function (e) {
			alert('You just copied: ' + e.text)
		},
		onError: function (e) {
			alert('Failed to copy texts')
		}
	}
}
</script>
