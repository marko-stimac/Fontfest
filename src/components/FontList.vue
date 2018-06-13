<template>

	<ul class="fontlist" v-if="getFontsAvailable.length > 0">
		<li v-for="(font, index) in getFontsAvailable" :key="index++">
			<router-link :to="{name: 'Font', params: {name: font.family}}">
				{{ font.family }}
			</router-link>
			<span class="favorite" v-bind:class="[font.favorite ? 'favorite--yes' : 'favorite--no']">
				<button class="btn" @click="toggleFavorite(font.family, font.favorite)">
					<svg viewBox="0 0 24 24">
						<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
					</svg>
				</button>
			</span>
		</li>
	</ul>
	<ul class="fontlist fontlist--empty text-center" v-else>
		<li>- Font selection is empty -</li>
	</ul>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Fontlist',
	computed: {
		...mapGetters([
			'getFontsAvailable'
			])
	},
	methods: {
		toggleFavorite(family, favorite) {
			if(favorite)
				this.$store.commit('removeFromFavorites', family)
			else
				this.$store.commit('addToFavorites', family)
		}
	}
}
</script>
