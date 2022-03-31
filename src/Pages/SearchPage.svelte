<script>
    import { uriHeader, apiUrl } from "../config";
    import AnimeList from "../components/AnimeList.svelte";

    export let currentRoute;
    let name;
    let animes = [];
    let animeFound = true;

    let imgUrl = `${uriHeader}/static/img/404.png`;

    $: (async () => {
        name = currentRoute.namedParams.name;
        animes = await searchAnimeByName(name);
    })();

    async function searchAnimeByName(name) {
        try {
            animeFound = true;
            const response = await fetch(`${apiUrl}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                mode: "cors",
                body: `name=${name}`,
            });
            const json = await response.json();
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
    <div class="d-grid gap-5">
        <div class="d-flex justify-content-center">
            <img src={imgUrl} style="width:300px;height:300px;" alt="loading" />
        </div>
        <div class="d-flex justify-content-center">
            <h3>Ничего не найдено 404</h3>
        </div>
    </div>
{/if}
