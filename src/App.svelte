<script lang="ts">
	import {Router, Link, Route} from 'svelte-routing';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';
  	import Logout from './lib/Logout.svelte';
  	import User from './lib/user/User.svelte';
  	import Registration from './lib/Registration.svelte';

	export let url = "";
	const options = {
    
  	}
</script>

<SvelteToast {options} />
<Router {url}>
	<Route path="/dashboard" component={Home} />
	<Route path="/dashboard/user" component={User} />
	<Route path="/logout" component={Logout}/>
	<Route path="/signup" component={Registration}/>
	<Route path="/"><Login /></Route>
</Router>