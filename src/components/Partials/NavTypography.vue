<template>
	<ul class="nav nav--typography">
		
		<li>
			<button class="btn" @click="randomizeStyles">Randomize styles</button>
		</li>
		<li>
			<button class="btn" @click="toggleDarkTheme">Inverse background</button>
		</li>
		<li>
			<button class="btn disabled" @click="toggleDistractionMode">Distraction free mode</button>
		</li>
		<li>
			<router-link :to="{name: 'Export'}">
				Export CSS
			</router-link>
		</li>

	</ul>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Nav_typography',
		computed: {
			...mapGetters([
				'getFontsAvailable'
				])
		},
		methods: {
			toggleDarkTheme() {
				this.$store.commit('toggleDarkTheme')
			},
			toggleDistractionMode() {
				this.$store.commit('toggleDistractionMode')
			},
			randomizeStyles() {
				this.$store.dispatch('randomizeStyles', this.getFontsAvailable)
			}
		}
	}
</script>
