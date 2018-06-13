<template>
	<div class="content--help">

		<NavOther/>
		
		<h3>How it works</h3>
		<ul>
			<li>On the left side you can filter families or set restriction to a few favorited families and then you can set various options for each text element</li>
			<li>It takes a split of a second to load selected font family on change so that is why you see a flash of unstyled content </li>
		</ul>

		<h3>A few hints</h3>
		<ul>
			<li>You can use <strong>arrow up</strong> and <strong>arrow down</strong> to trigger font change in single font presentation</li>
			<li>You can edit text both in typography mode and in a single font view, just click on a text field</li>
			<li>When distraction mode is active you can press <strong>ESC</strong> to exit</li>
			<li>Randomizing styles does calculations with filtered settings, it only randomizes families and weights</li>
			<li>Locked element doesn't trigger randomize</li>
		</ul>

		<h3>To do - some ideas for future implementing (maybe)</h3>
		<ul>
			<li>Loader so that FOUT (Flash Of Unstyled Text) is not seen</li>
			<li>Button for copying export to clipboard</li>
			<li>Loading font currently doesn't load subsets</li>
			<li>Add slider as an option to slide the width of text elements (e.g. to test for smaller screens)</li>
			<li>Edit button for text editing because current possibility to edit isn't clear for new users</li>
			<li>Add support for italics</li>
			<li>When changing family reset weight to weight in previous family (or default 400) because the font doesn't get rendered properly</li>
			<li>TinyMCE or similar editor</li>
			<li>Color mode</li>
			<li>Load predefined pairings and real world text examples</li>
			<li>Maybe set permanent favorites using local storage and/or a posibility for users to show them to others depending on query strings</li>
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