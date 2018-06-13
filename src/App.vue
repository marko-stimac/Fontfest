<template>
	<div id="app" :class="{ 'dark-theme': darkTheme, 'distraction-mode': distractionMode }">
		<Loader v-show="!loaded"></Loader>
		<div v-if="loaded">
			
			<Settings/>
			<FontList/>
			<div class="content">
				<router-view>
				</router-view>
			</div>

		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Vuex, { mapGetters } from 'vuex'
	import router from './router'

	import Settings from './components/Settings.vue'
	import FontList from './components/FontList.vue'
	import Loader from './components/Partials/Loader.vue'

	export default {
		name: 'App',
		data() {
			return {
				loaded: false
			}
		},
		components: {
			Settings,
			FontList,
			Loader
		},
		computed: {
			...mapGetters([
				'getDarkTheme',
				'getDistractionMode'
				]),
			darkTheme() {
				return this.getDarkTheme 
			},
			distractionMode() {
				return this.getDistractionMode 
			},
			loading() {
				return true
			}
		},
		created() {
			// Get a list of Google FontList
			this.$store.dispatch('getFontList')
			// Load default FontList
			this.$store.dispatch('loadFontList', 'Roboto Condensed:300,300i,400,400i,700,700i')
			this.$store.dispatch('loadFontList', 'Ribeye:400')
		},
		mounted() {
			this.loaded = true
		}
	}
</script>


<style src="./assets/sass/styles.scss" lang="scss"></style>