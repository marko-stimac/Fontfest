<template>
	<div class="content--font" v-if="font">

		<NavOther/>

		<div class="content--font__inside">

			<div class="title-wrapper">
				<h1 :style="{ fontFamily: $route.params.name }">{{ $route.params.name }}</h1>

			</div>


			<div class="content-wrapper" :style="{ fontFamily: $route.params.name }">
				<div class="text" v-for="variant in fontVariantsNoItalics">
					<span class="title nowrap" contenteditable="true" :style="{ fontWeight: variant }">
						{{ text }}
					</span>
					<span class="variant">{{ variant }}</span>
				</div>
			</div>

			<div class="meta-wrapper">
				<dl>
					<dt>Category</dt>
					<dd>{{ font.category }}</dd>
				</dl>
				<dl>
					<dt>Variants</dt>
					<dd>
						<ul>
							<li v-for="variant in font.variants">
								{{ variant }}
							</li>					
						</ul>
					</dd>
				</dl>
				<dl>
					<dt>Subsets</dt>
					<dd>
						<ul>
							<li v-for="subset in fontSubsets">
								{{ subset }}
							</li>					
						</ul>
					</dd>
				</dl>
				<dl>
					<dt>Version</dt>
					<dl>{{ font.version }}</dl>
					<dt>Last modified</dt>
					<dd>{{ lastModified }}</dd>
				</dl>
				<dl>
					<dt>
						<a class="link" :href="externalLink($route.params.name)" target="_blank">View {{ $route.params.name }} on Google fonts</a>
					</dt>
				</dl>
			</div>

			<div class="files-wrapper">
				<dl>
					<dt>Download files</dt>
					<dd>
						<ul>
							<li v-for="(file, index) in font.files">
								<a class="link" :href="file">{{ index }}</a>
							</li>
						</ul>
					</dd>
				</dl>
			</div>

		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'underscore'

import NavOther from '../Partials/NavOther.vue'

export default {
	name: 'Font',
	data() {
		return {
			text: 'The quick brown fox jumps over the lazy dog'
		}
	},
	components: {
		NavOther
	},
	computed: {
		...mapGetters([
			'getFontsAll',
			'getFontsAvailable'
			]),
		font() {

			var font = this.getFontsAll.filter(font => {
				return font.family === this.$route.params.name
			})
			return font[0]

		},
		fontSubsets() {

			return this.font.subsets.sort()

		},
		fontVariantsNoItalics() {

			// Remove italics
			var variants = this.font.variants.filter(item => {
				return item.indexOf('italic') == -1
			})

			// Change 'regular' to 400
			for(var i=0; i < variants.length; i++) {
				variants[i] = variants[i].replace(/regular/g, '400');
			}

			return variants

		},
		lastModified() {

			let date = this.font.lastModified;
			return date;

		}
	},
	watch: {
		'$route' (to, from) {
			var font = this.font.family + ':' + this.font.variants.join()
			this.$store.dispatch('loadFontList', font)
		}
	},
	methods: {
		// Go to previous/next font on up/down key event
		listenUserEvents() {

			var self = this
			document.onkeydown = function(e) {
				e = e || window.event;

				// Get current font index
				let currentFontIndex = self.getFontsAvailable.map(font => { 
					return font.family
				}).indexOf(self.$route.params.name);

				let triggerFontFamily = ''

				if(e.keyCode == 38 || e.keyCode == 40) {

					// If arrow key up is pressed direction is to index before, else direction is index after
					let direction = e.keyCode == 38 ? -1 : +1

					// Get font family and trigger route change
					triggerFontFamily = self.getFontsAvailable[currentFontIndex + direction]
					if(triggerFontFamily)
						self.$router.push({ name: 'Font', params: { name: triggerFontFamily.family }})

				}

			};

		},
		// Disables scroll on keydown which would trigger because of event in listenUserEvents()
		disableScroll() {

			/*window.addEventListener("keydown", function(e) {
				if([40].indexOf(e.keyCode) > -1) {
					e.preventDefault();
				}
			}, false);*/

		},
		externalLink(routeName) {
			let family = routeName.split(' ').join('+')
			return 'https://fonts.google.com/specimen/' + family
		}
	},
	created() {

		this.listenUserEvents()
		this.disableScroll()

	}
}
</script>
