<script lang="ts">
	import {Router, Link, Route} from 'svelte-routing';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';
  	import Logout from './lib/Logout.svelte';
  	import User from './lib/user/User.svelte';
  	import Registration from './Registration.svelte';
	import Profile from './lib/user/Profile.svelte';
	import AddUser from './lib/user/Add.svelte';
	import EditUser from './lib/user/Edit.svelte';
	import DeleteUser from './lib/user/Delete.svelte';
  	import Product from './lib/product/Product.svelte';
	import AddProduct from './lib/product/Add.svelte'

	export let url = "";
	const options = {
    
  	}
</script>

<SvelteToast {options} />
<Router {url}>
	<Route path="/dashboard" component={Home} />
	<Route path="/dashboard/user" component={User} />
	<Route path="/dashboard/user/profile" component={Profile} />
	<Route path="/dashboard/user/add" component={AddUser}/>
	<Route path="/dashboard/user/edit" component={EditUser}/>
	<Route path="/dashboard/user/delete" component={DeleteUser}/>
	<Route path="/dashboard/product" component={Product}/>
	<Route path="/dashboard/product/add" component={AddProduct}/>
	<Route path="/logout" component={Logout}/>
	<Route path="/signup" component={Registration}/>
	<Route path="/"><Login /></Route>
</Router>