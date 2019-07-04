<template>
	<div>

		<NavTypography/>

		<div class="content--typography">
			<div class="inside">

			<draggable v-model="textElements" :move="checkMove" :options="{handle: '.btn-drag'}" >
				<transition-group>
					<div class="is-draggable" v-for="(element, index) in textElements" :key="index++">
						<div 
						class="is-editable" 
						contenteditable="true" 
						:style="element.styles" 
						:class="{active: getFontSettingsVisibility && getActiveFontIndex == index-1}">
						{{ element.text }}
						</div>
						<div class="buttons">
			
							<!-- Settings -->
							<button @click="enableFontSettingsVisibility(index)" class="btn">
								<svg viewBox="0 0 24 24">
									<path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
								</svg>
							</button>
							<!-- Drag -->
							<button class="btn btn-drag">
								<svg viewBox="0 0 24 24">
									<path d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
								</svg>
							</button>
							<!-- Locked -->
							<button class="btn" :class="{locked: element.lock}" @click="toggleLock(index)">
								<svg viewBox="0 0 24 24">
									<path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
								</svg>
							</button>
							<!-- Remove -->
							<button @click="removeElement(index)" class="btn">
								<svg viewBox="0 0 24 24">
									<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
								</svg>
							</button>
						</div>
					</div>
				</transition-group>
			</draggable>

			<Options/>
			<AddNew/>

		</div>
	</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'

import NavTypography from '../Partials/NavTypography.vue'
import Options from './Typography/Options.vue'
import AddNew from './Typography/AddNew.vue'


export default {
	name: 'Typography',
	data() {
		return {
			fontSettingsVisibility: false,     
		}
	},
	created() {

		// Listen for user key events
		this.listenUserEvent()

	},
	components: {
		NavTypography,
		Draggable,
		Options,
		AddNew,
	},
	methods: {
		enableFontSettingsVisibility(index) {
			this.$store.commit('enableFontSettingsVisibility')
			this.$store.commit('updateFontSettingsIndex', index-1)
		},
		removeElement(index) {
			this.$store.dispatch('removeTextElement', index-1)
		},
		toggleLock(index) {
			this.$store.commit('updateTextElementLock', index-1)
		},
		checkMove(evt) {
			//return false
		}
	},
	computed: {
		...mapGetters([
			'getStyles',
			'getMaxWidth',
			'getFontSettingsVisibility',
			'getActiveFontIndex'
			]),
		textElements: { 
			get() {
				return this.$store.getters.getTextElements
			},
			set(value) {
				this.$store.commit('updateTextElementsOrder', value)
			}
		}
	}
}
</script>
