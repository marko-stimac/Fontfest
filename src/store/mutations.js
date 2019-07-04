
import Vue from 'vue'

export const mutations = {
	updateFonts(state, fonts) {
		state.fontsAll = fonts
		state.fontsAll.forEach(font => {
			Vue.set(font, 'favorite', false)
		})
	},
	updateSubsetsActive(state, subset) {
		state.subsetsActive = subset
	},
	updateLetterformsActive(state, value) {
		state.letterformsActive = value
	},
	updateFilteredName(state, value) {
		state.filteredName = value
	},
	addNewElement(state) {
		var newElement = {
			text: 'The quick brown fox jumps over the lazy dog',
			styles: 
			{
				fontFamily: 'Roboto Condensed',
				fontWeight: 400,
				fontSize: '26px',
				lineHeight: '1.5',
				letterSpacing: '0em',
				textTransform: 'initial',
				fontStyle: 'normal',
				marginBottom: '1rem'
			},
			lock: false
		}
		state.textElements.push(newElement)
	},
	toggleDarkTheme(state, value) {
		state.settings.darkTheme = state.settings.darkTheme !== true
	},
	// Toggle option visibility
	enableFontSettingsVisibility(state, value) {
		state.settings.fontSettings.visibility = true
	},
	disableFontSettingsVisibility(state, value) {
		state.settings.fontSettings.visibility = false
	},
	updateFontSettingsIndex(state, value) {
		state.settings.fontSettings.activeFontIndex = value
	},
	updateTextElementsOrder(state, textElements) {
		state.textElements = textElements
	},
	updateTextElementLock(state, index) {
		state.textElements[index].lock = state.textElements[index].lock !== true
	},
	// Update single font
	updateActiveFontFamily(state, payload) {
		state.textElements[payload.index].styles.fontFamily = payload.fontFamily
	},
	updateActiveFontWeight(state, payload) {
		state.textElements[payload.index].styles.fontWeight = payload.fontWeight
	},
	updateActiveFontSize(state, payload) {
		state.textElements[payload.index].styles.fontSize = payload.fontSize + 'px'
	},
	updateActiveLineHeight(state, payload) {
		state.textElements[payload.index].styles.lineHeight = payload.lineHeight
	},
	updateActiveLetterSpacing(state, payload) {
		state.textElements[payload.index].styles.letterSpacing = payload.letterSpacing + 'em'
	},
	updateActiveTextTransform(state, payload) {
		state.textElements[payload.index].styles.textTransform = payload.textTransform
	},
	updateActiveFontStyle(state, payload) {
		state.textElements[payload.index].styles.fontStyle = payload.fontStyle
	},
	updateActiveMarginBottom(state, payload) {
		state.textElements[payload.index].styles.marginBottom = payload.marginBottom + 'rem'
	},
	// Set font as favorite
	addToFavorites(state, family) {

		let font = state.fontsAll.filter(font => font.family === family)
		if(font[0])
			font[0].favorite = true 

	},
	// Remove font from favorites
	removeFromFavorites(state, family) {

		let font = state.fontsAll.filter(font => font.family === family)
		if(font[0])
			font[0].favorite = false

		// If favorites empty disable select box in settings
		let favoritesExists = state.fontsAll.filter(font => font.favorite == true)
		if(!favoritesExists.length)
			state.fontsFavoritesBool = false

	},
	updateFontsFavoriteBool(state) {
		state.fontsFavoritesBool = state.fontsFavoritesBool !== true
	}
}