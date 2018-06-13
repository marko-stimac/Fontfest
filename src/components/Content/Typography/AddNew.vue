<template>
	<div class="addnew text-center">
		<button @click="addNew" class="btn">Create new element +</button>
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
