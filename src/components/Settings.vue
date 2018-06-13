<template>
	<div class="settings">

		<div class="brand"><router-link :to="{name: 'Typography'}">Fontfest</router-link></div>
		<div class="families-info">Available <strong>{{ getFontsAvailable.length }}</strong> / {{ getFontsAll.length }} fonts</div>

		<div class="form-group">
			<label class="field-title">Filter by name</label>
			<input class="form-control" type="text" :id="nameActive" v-model="nameActive" @keyup="filterName" :disabled="getFontsFavoritesBool">
		</div>

		<div class="form-group">
			<div class="checkbox">
				<label>
					<input type="checkbox" v-model="getFontsFavoritesBool" :disabled="!getFontsFavoritesCount">
					<span class="label">Favorites only 
						<span class="sublabel">({{ getFontsFavoritesCount }})</span>
					</span>
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>

		<div class="form-group">
			<div class="field-title">Categories</div>
			<div class="checkbox" v-for="letterform in getLetterforms">
				<label>
					<input type="checkbox" :value="letterform" v-model="letterformsActive" :disabled="getFontsFavoritesBool">
					<span class="label">{{ letterform }}</span>
					<div class="checkbox__indicator"></div>
				</label>
			</div>
		</div>

		<div class="form-group">
			<label for="subset" class="field-title">Languages</label>
			<select id="subset" class="form-control" v-model="subsetsActive" :disabled="getFontsFavoritesBool">
				<option value="all">All</option>
				<option :value="subset" v-for="subset in getSubsets">{{ subset }}</option>
			</select>
		</div>

		<div class="form-group">
			<label class="field-title">Sorting</label>
			<select class="form-control" v-model="sortingActive" :disabled="getFontsFavoritesBool">
				<option value="alpha" id="alpha">Alpha</option>
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
