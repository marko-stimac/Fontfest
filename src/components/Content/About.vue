<template>
	<div class="content--help">

		<NavOther/>
		
		<h3>How it works</h3>
		<ul>
			<li>In the left sidebar you can filter font families to get a smaller selection or, better yet, select a few families as a favorites</li>
			<li>In the text panel experiment with various font options for each text element</li>
			<li>It takes a split of a second to load selected font family on change so that is why you see a flash of unstyled content </li>
		</ul>

		<h3>A few hints</h3>
		<ul>
			<li>You can use <strong>arrow up</strong> and <strong>arrow down</strong> to trigger font change in a single font presentation</li>
			<li>You can edit text both in typography mode and in a single font view, just left click on a text field</li>
			<li>When distraction mode is active you can press <strong>ESC</strong> to exit</li>
			<li>Randomizing styles does calculations with filtered settings, it only randomizes families and weights</li>
			<li>If you lock a text element, it won't trigger randomization</li>
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