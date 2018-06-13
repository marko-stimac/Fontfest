<template>
	<div @keyup.esc="closeDistractionMode">

		<button @click="closeDistractionMode" class="btn btn--close-distraction is-hidden">
			<svg viewBox="0 0 24 24">
				<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
			</svg>
		</button>

		<div class="content--typography">
			<div class="inside">

				<NavTypography/>

				<!-- {{ content }} -->


				<!-- <div id="toolbar">
					<select class="ql-size">
						<option value="small">adf</option>
						<option selected>asdf</option>
					</select>
					<button class="ql-bold">asdfasdf</button>
					<button class="ql-script" value="sub">asdfasdf</button>
				</div> -->
				<!-- <quill-editor v-model="content"
				ref="myQuillEditor"
				:options="editorOption"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)">
			</quill-editor> -->

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
						<!-- 	edit button
						<button class="btn">
								<svg viewBox="0 0 24 24">
									<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
								</svg>
							</button> -->
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
			<!-- <div class="slider">
				<input type="range" min="0" max="960" value="sliderValue" class="slider__input" @change="changeSliderValue">
			</div>
			{{sliderValue}} -->
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

//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.snow.css'
//import Quill from 'quill'

//import { quillEditor } from 'vue-quill-editor'

export default {
	name: 'Typography',
	data() {
		return {
			fontSettingsVisibility: false,
		/*	sliderValue: 960,
			content: '<h2>I am Example</h2>',
			editorOption: {
				modules: {
					container:
					[
					[{ 'placeholder': ['[GuestName]', '[HotelName]'] }], 
					['clean']  
					],
					handlers: {
						"placeholder": function (value) { 
							if (value) {
								const cursorPosition = this.quill.getSelection().index;
								this.quill.insertText(cursorPosition, value);
								this.quill.setSelection(cursorPosition + value.length);
							}
						}
					}
				}
			}  */          
		}
	},
	created() {

		// Listen for user key events
		this.listenUserEvent()

	},
	mounted() {
		

		
		const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
		placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
		document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
		= 'Insert placeholder' + document.querySelector('.ql-placeholder .ql-picker-label').innerHTML;
		
	},
	components: {
		NavTypography,
		Draggable,
		Options,
		AddNew,
		//quillEditor
	},
	methods: {
		enableFontSettingsVisibility(index) {
			this.$store.commit('enableFontSettingsVisibility')
			this.$store.commit('updateFontSettingsIndex', index-1)
		},
		removeElement(index) {
			this.$store.dispatch('removeTextElement', index-1)
		},
		listenUserEvent() {
			var self = this
			document.onkeydown = function(e) {
				e = e || window.event;
				if(e.keyCode == 27)
					self.$store.commit('closeDistractionMode')
			};
		},
		closeDistractionMode() {
			this.$store.commit('closeDistractionMode')
		},
		toggleLock(index) {
			this.$store.commit('updateTextElementLock', index-1)
		},
		changeSliderValue(a,b) {
		},
		checkMove(evt) {
			//return false
		},
		/*onEditorBlur(quill) {
			console.log('editor blur!', quill)
		},
		onEditorFocus(quill) {
			console.log('editor focus!', quill)
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		}*/
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
		},
		changeSliderValue: {
			get() {
				return this.sliderValue
			},
			set(value) {
				this.sliderValue = 400
			}
		},
		/*editor() {
			return this.$refs.myQuillEditor.quill
		}*/
	},
	mounted() {
		//this.toolbar = document.getElementById('#toolbar');
		//console.log('this is current quill instance object', this.editor)
	}
}
</script>
