<template>
	<ul class="nav nav--other">
		
		<li>
			<router-link :to="{name: 'Typography'}">
				← Back to playground
			</router-link>
		</li>
		<li>
			<button class="btn btn--favorite" @click="toggleFavorite">
				<span class="favorite" v-if="favorite">
					Remove from favorites
				</span>
				<span v-else>
					Add to favorites
				</span>
			</button>
		</li>

	</ul>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'underscore'

export default {
	name: 'Nav_other',
	computed: {
		...mapGetters([
			'getFontsAvailable'
			]),
		// Check if this font is favorited
		favorite() {
			for(let i=0; i<this.getFontsAvailable.length; i++) {
				if(this.getFontsAvailable[i]['family'] == this.$route.params.name) {
					return this.getFontsAvailable[i]['favorite']
				}
			}
		}
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
		},
		toggleFavorite() {
			if(!this.favorite) {
				this.$store.commit('addToFavorites', this.$route.params.name)
			}
			else {
				this.$store.commit('removeFromFavorites', this.$route.params.name)
			}
		}
	}
}
</script>
