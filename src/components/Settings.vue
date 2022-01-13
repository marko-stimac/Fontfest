<template>
	<div class="settings">

		<div class="sidebar__info">
			<div class="sidebar__infotop">
				<div>Filtering <span class="sidebar__strong">{{ getFontsAvailable.length }}</span> from <span class="sidebar__strong">{{ getFontsAll.length }}</span> fonts</div>
				<div class="sidebar__selected">
					Favorites: <span class="sidebar__strong">{{ getFontsFavoritesCount }}</span>
				</div>
			</div>
			<div class="checkbox" v-if="getFontsFavoritesCount">
				<label>
					<input type="checkbox" v-model="getFontsFavoritesBool" :disabled="!getFontsFavoritesCount">
						<span class="label">Show favorites only 
						<!--<span class="sublabel">(<strong>{{ getFontsFavoritesCount }}</strong>)</span>--></span>
					
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>
		
		<div class="sidebar__group" :class="{ inactive: !nameActive}" v-if="!getFontsFavoritesBool">
			<label class="sidebar__group-title">Filter by name:</label>
			<input class="form-control sidebar__nameinput" type="text" :id="nameActive" v-model="nameActive" @keyup="filterName" :disabled="getFontsFavoritesBool">
		</div>

		<div class="sidebar__group" v-if="!getFontsFavoritesBool">
			<label for="subset" class="sidebar__group-title">Language:</label>
			<select id="subset" class="form-control" v-model="subsetsActive" :disabled="getFontsFavoritesBool">
				<option value="all">All</option>
				<option :value="subset" v-for="subset in getSubsets">{{ subset }}</option>
			</select>
		</div>

		<div class="sidebar__group" v-if="!getFontsFavoritesBool">
			<div class="sidebar__group-title sidebar__group-title--categories">Font type:</div>
			<div class="checkbox" v-for="letterform in getLetterforms">
				<label>
					<input type="checkbox" :value="letterform" v-model="letterformsActive" :disabled="getFontsFavoritesBool">
					<span class="label">{{ letterform }}</span>
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>

		<div class="sidebar__group" v-if="!getFontsFavoritesBool">
			<label class="sidebar__group-title">Sorted by:</label>
			<select class="form-control" v-model="sortingActive" :disabled="getFontsFavoritesBool">
				<option value="alpha" id="alpha">Alphabet</option>
				<option value="date" id="date">Date</option>
				<option value="popularity" id="popularity">Popularity</option>
				<option value="style" id="style">Style</option>
				<option value="trending" id="trending">Trending</option>
			</select>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'sidebar',
	data() {
		return {
			nameActive: '',
		}
	},
	methods: {
		change() {
			this.$store.dispatch('getFontList', 'popularity')
		},
		filterName() {
			this.$store.commit('updateFilteredName', this.nameActive)
		}
	},
	computed: {
		...mapGetters([
			'getFontsAll',
			'getFontsAvailable',
			'getSubsets',
			'getLetterforms',
			'getFontsFavoritesBool',
			'getFontsFavoritesCount'
			]),
		subsetsActive: {
			get() {
				return this.$store.getters.getSubsetsActive
			},
			set(value) {
				this.$store.commit('updateSubsetsActive', value)
			}
		},
		letterformsActive: {
			get() {
				return this.$store.state.letterformsActive
			},
			set(value) {
				this.$store.commit('updateLetterformsActive', value)
			}
		},
		sortingActive: {
			get() {
				return this.$store.state.sortingActive
			},
			set(value) {
				this.$store.dispatch('getFontList', value)
			}
		},
		getFontsFavoritesBool: {
			get() {
				return this.$store.state.fontsFavoritesBool
			},
			set(value) {
				this.$store.commit('updateFontsFavoriteBool')
			}
		}
	}
}
</script>
