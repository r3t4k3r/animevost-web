<script>
    import { uriHeaderWD, apiUrl } from "../config";
    import { scale } from "svelte/transition";
    import AnimeList from "../components/AnimeList.svelte";

    export let currentRoute;
    let name;
    let animes = [];
    let animeFound = true;

    let imgUrl = `${uriHeaderWD}/static/img/404.png`;

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

<h2>Результат поиска по запросу "{decodeURI(name)}"</h2>
{#if animeFound}
    <AnimeList {animes} />
{:else}
    <div class="parent" in:scale out:scale>
        <div class="d-grid gap-3 block">
            <div class="d-flex justify-content-center">
                <img src={imgUrl} class="img" alt="loading" />
            </div>
            <div class="d-flex justify-content-center">
                <h3>По вашему запросу ничего не найдено</h3>
            </div>
        </div>
    </div>
{/if}

<style>
    .parent {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
    }

    .block {
        width: 250px;
        height: 250px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -125px 0 0 -125px;
    }

    .img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        border: none;
    }
</style>
