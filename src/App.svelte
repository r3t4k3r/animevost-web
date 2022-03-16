<script>
	import { Container } from "sveltestrap";
	import NavBar from "./components/NavBar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css"
	/>
</svelte:head>

<NavBar/>
<Container>
	<Router {routes} />
</Container>
