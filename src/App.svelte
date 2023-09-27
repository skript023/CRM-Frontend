<script lang="ts">
	import {Router, Link, Route} from 'svelte-routing';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';
  	import Logout from './lib/Logout.svelte';
  	import User from './lib/user/User.svelte';
  	import Registration from './Registration.svelte';
	import Profile from './lib/user/Profile.svelte';
	import Add from './lib/user/Add.svelte';
	import Edit from './lib/user/Edit.svelte';
	import Delete from './lib/user/Delete.svelte';
  	import Product from './lib/product/Product.svelte';

	export let url = "";
	const options = {
    
  	}
</script>

<SvelteToast {options} />
<Router {url}>
	<Route path="/dashboard" component={Home} />
	<Route path="/dashboard/user" component={User} />
	<Route path="/dashboard/user/profile" component={Profile} />
	<Route path="/dashboard/user/add" component={Add}/>
	<Route path="/dashboard/user/edit" component={Edit}/>
	<Route path="/dashboard/user/delete" component={Delete}/>
	<Route path="/dashboard/product" component={Product}/>
	<Route path="/logout" component={Logout}/>
	<Route path="/signup" component={Registration}/>
	<Route path="/"><Login /></Route>
</Router>