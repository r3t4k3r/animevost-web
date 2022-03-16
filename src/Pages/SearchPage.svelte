<script>
    import { apiUrl } from "../config";
    import AnimeList from "../components/AnimeList.svelte";

    export let currentRoute;
    let name;
    let animes = [];
    let animeFound = true;

    $: (async () => {
        name = currentRoute.namedParams.name;
        animes = await searchAnimeByName(name);
    })();

    async function searchAnimeByName(name) {
        try {
            const response = await fetch(`${apiUrl}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                mode: "cors",
                body: `name=${name}`,
            });
            const json = await response.json();
            animeFound = true;
            return json.data;
        } catch (e) {
            animeFound = false;
            return [];
        }
    }
</script>

{#if animeFound}
    <AnimeList {animes} />
{:else}
    К сожалению ничего не найдено (
{/if}
