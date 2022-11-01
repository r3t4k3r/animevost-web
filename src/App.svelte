<script>
	import { Container } from "sveltestrap";
	import NavBar from "./components/NavBar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";
</script>

<NavBar />

<div style="margin-top: 3rem">
	<Container>
		<Router {routes} />
	</Container>
</div>
