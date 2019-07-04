<template>
	<div class="settings">

		<div class="settings__info">Filtering <strong>{{ getFontsAvailable.length }}</strong> from <strong>{{ getFontsAll.length }}</strong> fonts</div>
		<div class="settings__selected">Currently selected: <strong>{{ getFontsFavoritesCount }}</strong></div>

		<div class="settings__group">
			<label class="settings__group-title">Filter by name:</label>
			<input class="form-control" type="text" :id="nameActive" v-model="nameActive" @keyup="filterName" :disabled="getFontsFavoritesBool">
		</div>

		<div class="settings__group">
			<label for="subset" class="settings__group-title">Languages:</label>
			<select id="subset" class="form-control" v-model="subsetsActive" :disabled="getFontsFavoritesBool">
				<option value="all">All</option>
				<option :value="subset" v-for="subset in getSubsets">{{ subset }}</option>
			</select>
		</div>

		<div class="settings__group">
			<div class="settings__group-title settings__group-title--categories">Categories:</div>
			<div class="checkbox" v-for="letterform in getLetterforms">
				<label>
					<input type="checkbox" :value="letterform" v-model="letterformsActive" :disabled="getFontsFavoritesBool">
					<span class="label">{{ letterform }}</span>
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>

		<div class="settings__group">
			<label class="settings__group-title">Sorted by:</label>
			<select class="form-control" v-model="sortingActive" :disabled="getFontsFavoritesBool">
				<option value="alpha" id="alpha">Alpha</option>
				<option value="date" id="date">Date</option>
				<option value="popularity" id="popularity">Popularity</option>
				<option value="style" id="style">Style</option>
				<option value="trending" id="trending">Trending</option>
			</select>
		</div>
		
		<div class="settings__group">
			<div class="checkbox">
				<label>
					<input type="checkbox" v-model="getFontsFavoritesBool" :disabled="!getFontsFavoritesCount">
					<span class="label">Favorites only 
						<span class="sublabel">(<strong>{{ getFontsFavoritesCount }}</strong>)</span>
					</span>
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Settings',
	data() {
		return {
			nameActive: ''
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
