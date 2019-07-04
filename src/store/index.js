
import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import predefined from './predefined/default'

Vue.use(Vuex)

export const store = new Vuex.Store({
 		// strict: true,
 		state: {
 			fontsAll: [],
 			getFontsFavoritesCount: 0,
 			fontsFavoritesBool: false,
 			subsetsActive: 'latin-ext',
 			letterforms: ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'],
 			letterformsActive: ['serif', 'sans-serif', 'display'],
 			sortingActive: 'alpha',
 			filteredName: '',
 			fontParagraph: 'The quick brown fox jumps over the lazy dog',
 			textElements: predefined,
 			settings: {
 				fontSettings: {
 					activeFontIndex: 0,
 					visibility: false
 				},
 				darkTheme: false
 			}
 		},
 		getters,
 		mutations,
 		actions
 	})
