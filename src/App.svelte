<script lang="ts">
	import {Router, Link, Route} from 'svelte-routing';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';
  	import Logout from './lib/Logout.svelte';

	export let url = "";
	const options = {
    
  	}
</script>

<SvelteToast {options} />
<Router {url}>
	<Route path="/dashboard" component={Home} />
	<Route path="/logout" component={Logout}/>
	<Route path="/"><Login /></Route>
</Router>