<script>
    export let animeId;
    import { onMount } from "svelte";
    import VideoPlayer from "svelte-video-player";
    import { Accordion, Button, AccordionItem, Badge } from "sveltestrap";

    let animeInfo = {};
    let series = [];
    let isLoaded = false;
    let selectedSeria = {};

    onMount(async () => {
        animeInfo = await getAnimeInfo(animeId);
        series = await getAnimePlaylist(animeId);
        selectedSeria = series[0];
        isLoaded = true;
        console.log(document.body.clientHeight);
    });

    async function getAnimeInfo(id) {
        const response = await fetch("https://api.animevost.org/v1/info", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: `id=${id}`, // body data type must match "Content-Type" header
        });
        const json = await response.json();
        return json.data[0];
    }

    async function getAnimePlaylist(id) {
        const response = await fetch("https://api.animevost.org/v1/playlist", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: `id=${id}`, // body data type must match "Content-Type" header
        });
        const json = await response.json();
        json.sort((a, b) => {
            return Number(a.name.split(" ")[0]) - Number(b.name.split(" ")[0]);
        });
        return json;
    }

    function seriesHandler(seria) {
        selectedSeria = seria;
    }
</script>

{#if isLoaded}
    <div style="max-width:800px" class="mx-auto">
        <h1>{selectedSeria.name}</h1>
        <VideoPlayer
            poster={selectedSeria.preview}
            source={selectedSeria.hd ? selectedSeria.hd: selectedSeria.std}
            skipSeconds="10"
            timeDisplay="true"
            color="#0c63e4"
            chunkBars="true"
            bufferedColor="#0c63e4"
        />
    </div>
    <Accordion flush stayOpen class="mt-3">
        <AccordionItem active header="Серии">
            {#each series as seria (seria.name)}
                {#if seria.name === selectedSeria.name}
                    <Button
                        class="me-2 mb-1 mt-1"
                        primary
                        on:click={() => seriesHandler(seria)}
                    >
                        {seria.name}
                    </Button>
                {:else}
                    <Button
                        class="me-2 mb-1 mt-1"
                        outline
                        primary
                        on:click={() => seriesHandler(seria)}
                    >
                        {seria.name}
                    </Button>
                {/if}
            {/each}
        </AccordionItem>
        <AccordionItem active header="Год выпуска">
            {animeInfo.year}
        </AccordionItem>
        <AccordionItem active header="Жанр">
            <h5>
                {#each animeInfo.genre.split(",") as gen}
                    <Badge class="me-1" primary>{gen.trim()}</Badge>
                {/each}
            </h5>
        </AccordionItem>
        <AccordionItem active header="Создатель">
            {animeInfo.director}
        </AccordionItem>
        <AccordionItem active header="Описание">
            {@html animeInfo.description}
        </AccordionItem>
    </Accordion>
{/if}
