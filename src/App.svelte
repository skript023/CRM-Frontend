<script lang="ts">
	import {Router, Link, Route} from 'svelte-routing';
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';

	export let url = "";
</script>

<Router {url}>
	<Route path="/dashboard" component={Home} />
	<Route path="/"><Login /></Route>
</Router>