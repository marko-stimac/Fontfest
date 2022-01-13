<template>
	<div class="addnew text-center">
		<button @click="addNew" class="btn btn-primary">
			<svg width="11" height="11" viewBox="0 0 512.000000 512.000000">
			<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
			fill="#000000" stroke="none">
			<path d="M2471 5103 c-24 -9 -63 -35 -86 -58 -80 -79 -75 -8 -75 -1187 l0
			-1048 -1048 0 c-1179 0 -1108 4 -1187 -75 -98 -98 -98 -252 0 -350 79 -79 8
			-75 1187 -75 l1048 0 0 -1048 c0 -1179 -4 -1108 75 -1187 98 -98 252 -98 350
			0 79 79 75 8 75 1187 l0 1048 1048 0 c1179 0 1108 -4 1187 75 98 98 98 252 0
			350 -79 79 -8 75 -1187 75 l-1048 0 0 1048 c0 1179 4 1108 -75 1187 -69 70
			-169 91 -264 58z"/>
			</g>
			</svg>
			<span style="margin-left: .5rem">Add text block</span>
		</button>
	</div>
</template>

<script>

	export default {
		name: 'AddTextElement',
		methods: {
			addNew() {
				this.$store.commit('addNewElement')
			}
		}
	}
</script>
