<template>
	<div class="content--help">

		<NavOther/>
		
		<h2>How it works</h2>
		<ul>
			<li>In the sidebar you can filter font families to get a smaller selection or, better yet, select a few families as a favorites</li>
			<li>In the text panel experiment with various font options for each text element</li>
			<li>It takes a split of a second to load selected font family on change so that is why you see a flash of unstyled content</li>
		</ul>

		<h2>A few hints</h2>
		<ul>
			<li>You can use <strong>arrow up</strong> and <strong>arrow down</strong> to trigger font change in a single font presentation</li>
			<li>You can edit text both in typography mode and in a single font view, just left click on a text field and start typing</li>
		</ul>
	</div>
</template>

<script>
import NavOther from '../Partials/NavOther.vue'

export default {
	name: 'About',
	components: {
		NavOther
	}
}
</script>