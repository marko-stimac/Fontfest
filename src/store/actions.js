
import axios from 'axios'
import WebFont from 'webfontloader'	

export const actions = {

	// Get a list of Google fonts
	getFontList({commit}, sortby=this.state.sortingActive) {

		var apiKey = 'AIzaSyCLrBqJfm8-1Ao3DGVdaK3LuFZI92lWOdE';
		var url = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=' + sortby + '&key=' + apiKey;
		var self = this;

		axios.get(url).then(
			response => commit('updateFonts', response.data.items),
			err => console.log(err)
			);		

		// Update active sort
		this.state.sortingActive = sortby	

	},

	// Load default fonts
	loadFontList(context, font = null) {

		WebFont.load({
			classes: false,
			google: {
				families: [font]
			}
		});

	},

	// Randomize CSS for elements
	randomizeStyles(context, fontsAvailable) {

		// For each text element
		context.state.textElements.forEach((el, index) => {

			// Skip if locked
			if(el.lock)
				return

			// Randomize font
			let fontRandom = fontsAvailable[Math.floor(Math.random() * fontsAvailable.length)]
			// Set new font family
			el.styles.fontFamily = fontRandom.family

			// Randomize font weight
			let fontWeightRandom = fontRandom.variants[Math.floor(Math.random() * fontRandom.variants.length)]
			// If font weight is 'regular' or 'italic' then save it as 400, otherwise remove i
			if(fontWeightRandom == 'regular' || fontWeightRandom == 'italic')
				fontWeightRandom = 400
			else
				fontWeightRandom = fontWeightRandom.trim('i')
			// Set new font weight
			el.styles.fontWeight = fontWeightRandom

			// Load new font
			let font = fontRandom.family + ':' + fontRandom.variants.join()
			context.dispatch('loadFontList', font)
		})

	},

	removeTextElement(context, index) {
		context.state.textElements.splice(index, 1)
	}

}