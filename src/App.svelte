<script lang="ts">
    import {Router, Link, Route} from 'svelte-routing';
    import Login from "./routes/Login.svelte";
    import Home from "./routes/Home.svelte";
    export let url = "";
</script>

<body>
    <Router {url}>
        <div>
          <Route path="/dashboard" component={Home} />
          <Route path="/"><Login /></Route>
        </div>
      </Router>
</body>