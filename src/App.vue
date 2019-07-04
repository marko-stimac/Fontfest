<template>
	<div id="app" :class="{ 'dark-theme': darkTheme }">
			
		<div class="leftside">
			<div class="topbar topbar--sidebar">
				<h1 class="topbar__title">1. Filter selection and choose your fonts</h1>
			</div>
			<div class="leftside__inside">
				<Settings/>
				<FontList/>
			</div>
		</div>
		<div class="content">
			<div class="topbar topbar--content">
				<h2 class="topbar__title">2. Play with font combinations</h2>
				<router-link :to="{name: 'About'}" class="topbar__about">
					About
				</router-link>
			</div>
			<div class="content__inside">
				<router-view/>
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

	export default {
		name: 'App',
		data() {
			return {
				loaded: false
			}
		},
		components: {
			Settings,
			FontList
		},
		computed: {
			...mapGetters([
				'getDarkTheme'
				]),
			darkTheme() {
				return this.getDarkTheme 
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
		},
		mounted() {
			this.loaded = true
		}
	}
</script>


<style src="./assets/sass/styles.scss" lang="scss"></style>