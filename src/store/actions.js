
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

	removeTextElement(context, index) {
		context.state.textElements.splice(index, 1)
	}

}