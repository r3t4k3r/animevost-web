<script>
	import { Styles, Container } from "sveltestrap";
	import NavBar from "./components/NavBar.svelte";
	import AnimeList from "./components/AnimeList.svelte";
	import Anime from './components/Anime.svelte'
	import { Router, Route } from "svelte-routing";

	function handleSearch(event) {
		console.log(event.detail.text);
	}
</script>

<Styles />
<Router>
	<NavBar on:search={handleSearch} />
	<Container sm>
		<Route path="/"><AnimeList /></Route>
		<Route path="/anime/:id" let:params>
			<Anime animeId={params.id}/>
		</Route>
	</Container>
</Router>
