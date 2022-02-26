<script>
	import { Styles, Container } from "sveltestrap";
	import NavBar from "./components/NavBar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";

	function handleSearch(event) {
		console.log(event.detail.text);
	}

</script>

<Styles />
<NavBar on:search={handleSearch} />
<Container sm>
	<Router {routes} />
</Container>
