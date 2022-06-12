<script>
	import { Container } from "sveltestrap";
	import NavBar from "./components/NavBar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";
	import {uriHeaderWD} from "./config";
	// const background_url = `${uriHeaderWD}/static/img/background.png`;
</script>
<!-- <div class="background" style="background-image: url({background_url});">
</div> -->
<NavBar/>

	<Container>
		<Router {routes} />
	</Container>

<!-- <style>
	.background {
		position: fixed; /* Фиксируем на одном месте */
    	left: 0; right: 0; /* Вся ширин */
    	top: 0; bottom: 0; /* Вся высота */
    	z-index: -1; 
		background-attachment: fixed;
		filter: blur(4px);
	}
</style> -->