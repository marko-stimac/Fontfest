<template>
	<div class="options" :class="{ active: getFontSettingsVisibility}">

		<button @click="disableSettingsVisibility" class="btn">
			<svg viewBox="0 0 24 24">
				<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
			</svg>
		</button>

		<div class="form-group">
			<label for="fontFamily" class="field-title">Font family (<router-link class="link" :to="{name: 'Font', params: {name: fontFamily}}">view family</router-link>):</label>
			<select id="fontFamily" class="form-control" v-model="fontFamily">
				<option :value="font.family" v-for="font in getFontsAvailable">{{ font.family }}</option>
			</select>
			<small class="form-group__small">(Options depend on filtered font list in the sidebar)</small>
		</div>

		<div class="form-group">
			<div class="field-title">Font weight:</div>
			<div v-for="weight in fontAvailableWeightsPure">
				<label><input type="radio" :value="weight" v-model="fontWeight">{{ weight }}</label>
			</div>
		</div>

		<div class="form-group">
			<label for="fontSize" class="field-title">Font size <span>(px)</span>:</label>
			<input id="fontSize" type="number" class="form-control" v-model="fontSize">
		</div>

		<div class="form-group">
			<label for="lineHeight" class="field-title">Line height:</label>
			<input id="lineHeight" type="number" class="form-control" v-model="lineHeight" step="0.1">
		</div>

		<div class="form-group">
			<label for="letterSpacing" class="field-title">Letter spacing <span>(em)</span>:</label>
			<input id="letterSpacing" type="number" class="form-control" v-model="letterSpacing" step="0.01">
		</div>

		<div class="form-group">
			<div class="field-title">Font style:</div>
			<div v-for="fontStyleOption in fontStyleOptions">
				<label><input type="radio" :value="fontStyleOption" v-model="fontStyle" name="fontstyle"> {{ fontStyleOption }}</label>
			</div>
		</div>

		<div class="form-group">
			<div class="field-title">Text transform:</div>
			<div v-for="textTransformOption in textTransformOptions">
				<label><input type="radio" :value="textTransformOption" v-model="textTransform" name="texttransform"> {{ textTransformOption }}</label>
			</div>
		</div>

		<div class="form-group">
			<label for="marginBottom" class="field-title">Margin bottom <span>(rem)</span>:</label>
			<input id="marginBottom" type="number" class="form-control" v-model="marginBottom" step="0.5">
		</div>


	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'underscore'

export default {
	name: 'options_font',
	data() {
		return {
			textTransformOptions: ['initial', 'uppercase', 'lowercase', 'capitalize'],
			fontStyleOptions: ['normal', 'italic']
		}
	},
	computed: {
		...mapGetters([
			'getFontsAll',
			'getFontsAvailable',
			'getFontSettingsVisibility',
			'getActiveFontIndex',
			'getActiveFontData'
			]),
		fontFamily: {
			get() {
				return this.getActiveFontData.styles.fontFamily
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					fontFamily: value
				}
				this.$store.commit('updateActiveFontFamily', payload)

				let font = value + ':' + this.fontAvailableWeightsPure.join()
				this.$store.dispatch('loadFontList', font)
			}
		},
		fontWeight: {
			get() {
				return this.getActiveFontData.styles.fontWeight
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					fontWeight: value
				}
				this.$store.commit('updateActiveFontWeight', payload)
			}
		},
		fontAvailableWeights() {

			// Get font variants
			let font =  this.getFontsAll.filter(font => {
				return font.family.indexOf(this.fontFamily) !== -1
			})
			if(_.has(font[0], 'variants') == false) 
				return

			return font[0].variants

		},
		fontAvailableWeightsPure() {

			let variants = this.fontAvailableWeights
			let weights = []

			if(!variants) return

			// Prepare weight (remove italics, set regular to 400)
			for(var i=0; i < variants.length; i++) {
				if(variants[i] == 'regular')
					weights.push(400)
				else {
					// Parse weight to integer so that we don't include italic
					let weight = parseInt(variants[i])
					if(weight)
						weights.push(weight)
				}
			}

			// Set unique
			let uniqueWeights = _.uniq(weights, (item, key, a) => { 
				return item
			})

			return uniqueWeights
		},
		fontSize: {
			get() {
				return parseInt(this.getActiveFontData.styles.fontSize, 10)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					fontSize: value
				}
				this.$store.commit('updateActiveFontSize', payload)
			}
		},
		lineHeight: {
			get() {
				return parseFloat(this.getActiveFontData.styles.lineHeight, 10)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					lineHeight: value
				}
				this.$store.commit('updateActiveLineHeight', payload)
			}
		},
		letterSpacing: {
			get() {
				return parseFloat(this.getActiveFontData.styles.letterSpacing, 10)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					letterSpacing: value
				}
				this.$store.commit('updateActiveLetterSpacing', payload)
			}
		},
		textTransform: {
			get() {
				return parseInt(this.getActiveFontData.styles.textTransform)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					textTransform: value
				}
				this.$store.commit('updateActiveTextTransform', payload)
			}
		},
		fontStyle: {
			get() {
				return parseInt(this.getActiveFontData.styles.fontStyle)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					fontStyle: value
				}
				this.$store.commit('updateActiveFontStyle', payload)
			}
		},
		marginBottom: {
			get() {
				return parseInt(this.getActiveFontData.styles.marginBottom, 10)
			},
			set(value) {
				let payload = {
					index: this.getActiveFontIndex,
					marginBottom: value
				}
				this.$store.commit('updateActiveMarginBottom', payload)
			}
		}
	},
	methods: {
		disableSettingsVisibility() {
			this.$store.commit('disableFontSettingsVisibility')
		}
	}
}
</script>
