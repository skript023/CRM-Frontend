<script lang="ts">
	import {Router, Route} from 'svelte-routing';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Login from './Login.svelte';
	import Home from './lib/Home.svelte';
  	import User from './lib/user/User.svelte';
  	import Register from './Register.svelte';
	import Profile from './lib/user/Profile.svelte';
	import AddUser from './lib/user/Add.svelte';
	import EditUser from './lib/user/Edit.svelte';
  	import Product from './lib/product/Product.svelte';
	import AddProduct from './lib/product/Add.svelte'
  	import EditProduct from './lib/product/Edit.svelte';
	import Role from './lib/role/Role.svelte';
	import RoleEdit from './lib/role/Edit.svelte';
  	import RoleAdd from './lib/role/Add.svelte';
  import NotFound from './NotFound.svelte';

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

	<Route path="/dashboard/product" component={Product}/>
	<Route path="/dashboard/product/add" component={AddProduct}/>
	<Route path="/dashboard/product/edit" component={EditProduct}/>

	<Route path="/dashboard/role" component={Role} />
	<Route path="/dashboard/role/add" component={RoleAdd}/>
	<Route path="/dashboard/role/edit" component={RoleEdit}/>

	<Route path="/signup" component={Register}/>
	<Route path="/"><Login /></Route>
	<Route component={NotFound}/>
</Router>