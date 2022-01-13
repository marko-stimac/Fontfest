
import _ from 'underscore'

export const getters = {

	getFontsAll(state) {
		return state.fontsAll
	},

	getFontsAvailable(state) {

		if(state.fontsFavoritesBool) {
			return state.fontsAll.filter(font => font.favorite === true)
		}

		// Get fonts with letterform
		let fonts = state.fontsAll.filter(font => {
			return state.letterformsActive.indexOf(font.category) != -1
		});

		// Just return if no specific subset or favorites checkbox are selected
		if(state.subsetsActive == 'all' && state.filteredName == '')
			return fonts

		// Return fonts with subset
		let fontsWithSubset = fonts.filter(font => {
			return font.subsets.indexOf(state.subsetsActive) != -1
		})

		if(state.filteredName == '')
			return fontsWithSubset

		let fontsWithFilteredName = fontsWithSubset.filter(font => {
			// Returns a string independant of case
			return font.family.toLowerCase().indexOf(state.filteredName.toLowerCase()) !== -1
		})

		return fontsWithFilteredName

	},

	// Get favorited fonts
	getFontsFavoritesCount(state) {
		return state.fontsAll.filter(font => font.favorite === true).length
	},

	getFontsFavoritesBool(state) {
		return state.fontsFavoritesBool
	},

	// A list of languages (latin-ext, cyrillic, greek, etc.)
	getSubsets(state) {

		// Get a list of subsets as array
		var arr = state.fontsAll.map(function(item, key, a) { 
			return item.subsets
		});

		// Flatten arrays into one
		var mergedArr = [].concat.apply([], arr)

		// Return unique subsets
		return mergedArr.filter(function(el, index, arr) {
			return index == arr.indexOf(el)
		});

	},

	getSubsetsActive(state) {
		return state.subsetsActive
	},

	getLetterforms(state) {
		// Get a list of letterforms (sans-serif, serif...)
		return state.letterforms;
		//return _.uniq(_.flatten(_.pluck(state.fontsAll, 'category')))

	},

	getLetterformActive(state) {
		return state.letterformActive
	},
	
	getStyles(state) {
		return state.styles
	},

	getFontSettingsVisibility(state) {
		return state.settings.fontSettings.visibility
	},

	getActiveFontIndex(state) {
		return state.settings.fontSettings.activeFontIndex
	},

	getActiveFontData(state) {
		return state.textElements[state.settings.fontSettings.activeFontIndex]
	},

	getMaxWidth(state) {
		return state.maxWidth
	},

	getTextElements(state) {
		return state.textElements
	},

	getFontsFavorites(state) {
		return state.fontsFavorites
	}

}