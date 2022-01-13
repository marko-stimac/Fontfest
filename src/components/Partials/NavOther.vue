<template>
	<ul class="nav nav--other">
		
		<li>
			<router-link :to="{name: 'Typography'}">
				<svg width="25" height="7" viewBox="0 0 33 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="margin-right: .5rem">
				<path d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17158C4.7308 0.976313 4.7308 0.659731 4.53553 0.464469C4.34027 0.269206 4.02369 0.269206 3.82843 0.464469L0.646446 3.64645ZM33 3.5L1 3.5L1 4.5L33 4.5L33 3.5Z" fill="#3B6BE7"/>
				</svg>Back to playground
			</router-link>
		</li>
		<li :class="{navlinkfavoritehide: !isPageFont}">
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
		},
		isPageFont() {
			if(this.$route.name === 'About' || this.$route.name === 'Export') {
				return false;
			}
			return true;
		}
	},
	methods: {
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
