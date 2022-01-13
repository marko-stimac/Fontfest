<template>
	<div id="app">

		<header class="header">
			<div class="logo">
				<router-link :to="{name: 'Typography'}">
					<div class="logo__top"><span class="logo__strong">Font</span>Fest</div>
					<div class="logo__bot">Typography playground</div>
					
				</router-link>
			</div>
			<div class="topbar">
				<div class="topbar__left">
					<div class="text-uppercase">How to use</div>
					<ol>
						<li>Filter selection and choose your fonts</li>
						<li>Play with font combinations</li>
					</ol>
				</div>
				
				<div class="topbar__right">
					<ul class="nav nav--topbar">
						<li>
							<router-link :to="{name: 'Export'}">
								Export CSS
							</router-link>
						</li>
						<li>
							<router-link :to="{name: 'About'}" class="topbar__about">
								About
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</header>
			
		<div class="main">
			<div class="sidebar">
				<Settings/>
				<FontList/>
			</div>
			<div class="content">
				<div class="content__inside">
					<router-view/>
				</div>
			</div>
		</div>

		<footer class="footer">
			Made with <svg width="13" height="13" viewBox="0 0 512.000000 512.000000"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#DD2E44" stroke="none"><path d="M1180 4635 c-373 -64 -690 -257 -907 -551 -118 -161 -214 -386 -248 -584 -22 -125 -22 -328 -1 -449 71 -396 330 -816 785 -1272 417 -417 904 -793 1516 -1171 238 -147 228 -142 267 -122 152 79 620 382 865 560 921 671 1486 1341 1622 1922 98 419 -19 878 -307 1205 -417 472 -1073 608 -1646 343 -181 -83 -396 -259 -511 -416 -26 -36 -50 -65 -55 -65 -4 0 -34 36 -68 81 -122 162 -281 292 -477 389 -210 104 -392 146 -630 144 -71 -1 -164 -7 -205 -14z"/></g></svg> by <a class="footer__link" href="https://marko-stimac.github.io" target="_blank">Marko Štimac</a>
		</footer>


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
			loading() {
				return true
			}
		},
		created() {
			// Get a list of Google FontList
			this.$store.dispatch('getFontList')
			// Load default FontList
			this.$store.dispatch('loadFontList', 'Rubik:300i,400,800i')
			this.$store.dispatch('loadFontList', 'Montserrat:400')
			this.$store.dispatch('loadFontList', 'Nunito Sans:400,400i,500,600,700,700i')
			this.$store.dispatch('loadFontList', 'Alegreya:400,500,600,700,700i')
			this.$store.dispatch('loadFontList', 'Alegreya Sans:400,500,600,700')
		},
		mounted() {
			this.loaded = true
		}
	}
</script>


<style src="./assets/sass/styles.scss" lang="scss"></style>