<script>
    import { onMount } from "svelte";
    import { Player, DefaultUi } from "@vime/svelte";
    import {
        Card,
        Button,
        CardBody,
        CardHeader,
        CardTitle,
        CardText,
        Badge,
    } from "sveltestrap";
    import { apiUrl } from "../config";
    import Loading from "../components/Loading.svelte";
    import { fade, scale } from "svelte/transition";

    export let currentRoute;
    let animeId = currentRoute.namedParams.id;

    let duration = -1;
    let currentTime = 0;
    let paused = true;

    let animeInfo = {};
    let series = [];
    let isLoaded = false;
    let selectedSeria = {};

    onMount(async () => {
        animeInfo = await getAnimeInfo(animeId);
        series = await getAnimePlaylist(animeId);
        selectedSeria = series[0] || [];
        isLoaded = true;
    });

    async function getAnimeInfo(id) {
        const response = await fetch(`${apiUrl}/info`, {
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
        const response = await fetch(`${apiUrl}/playlist`, {
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
            const matchA = a.name.match(/\d+/);
            const matchB = b.name.match(/\d+/);
            return matchA && matchB ? Number(matchA[0]) - Number(matchB[0]) : 1;
        });
        return json;
    }

    function onPausedUpdate(event) {
        paused = event.detail;
    }

    function onTimeUpdate(event) {
        currentTime = event.detail;
    }

    function keydownHandler(event) {
        if (String(event.target) === "[object HTMLBodyElement]") {
            switch (event.code) {
                case "ArrowLeft":
                    event.preventDefault();
                    currentTime = currentTime - 10;
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    currentTime = currentTime + 10;
                    break;
                case "Space":
                    event.preventDefault();
                    paused = !paused;
                    break;
            }
        }
    }

    function seriesHandler(seria) {
        selectedSeria = seria;
    }
	
    function getStd(seria) {
		return seria.hd !== undefined ? seria.hd : seria.std;
	}
</script>

<svelte:body on:keydown={keydownHandler} />

{#if isLoaded}
    <h4 in:fade>
        {animeInfo.title}
        <Badge class="me-2 mb-1 mt-1"
            >{selectedSeria.name || "Нет серий, Анонс?"}</Badge
        >
    </h4>
    <div in:fade style="max-width:800px" class="mx-auto">
        {#if series.length > 0}
            <div style="max-width:800px">
                <Player
                    on:vmCurrentTimeChange={onTimeUpdate}
                    on:vmPausedChange={onPausedUpdate}
                    {currentTime}
                    {duration}
                    {paused}
                    volume={80}
                >
                    <vm-video>
                        <source data-src={getStd(selectedSeria)} type="video/mp4" />
                        <track kind="captions" />
                    </vm-video>
                    <DefaultUi noDblClickFullscreen />
                </Player>
            </div>
        {/if}
    </div>
    {#if series.length > 0}
        <Card class="mb-3 mt-3">
            <CardHeader>
                <CardTitle>Серии</CardTitle>
            </CardHeader>
            <CardBody>
                {#each series as seria (seria.name)}
                    {#if seria.name === selectedSeria.name}
                        <!-- если эта серия выбрана -->
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
                            secondary
                            on:click={() => seriesHandler(seria)}
                        >
                            {seria.name}
                        </Button>
                    {/if}
                {/each}
            </CardBody>
        </Card>
    {/if}
    <Card class="mb-1">
        <CardBody>
            <CardText>
                <b>Описание:</b>
                {@html animeInfo.description}
            </CardText>
        </CardBody>
    </Card>
    <Card class="mb-1">
        <CardBody>
            <CardText>
                <b>Жанр:</b>
                <h5 style="display: inline">
                    {#each animeInfo.genre.split(",") as gen}
                        <Badge class="me-2 mb-1 mt-1" primary
                            >{gen.trim()}</Badge
                        >
                    {/each}
                </h5>
            </CardText>
        </CardBody>
    </Card>
    <Card class="mb-1">
        <CardBody>
            <CardText>
                <b>Год выпуска:</b>
                {animeInfo.year}
            </CardText>
        </CardBody>
    </Card>
    {#if animeInfo.director}
        <Card class="mb-1">
            <CardBody>
                <CardText>
                    <b>Создатель:</b>
                    {animeInfo.director}
                </CardText>
            </CardBody>
        </Card>
    {/if}
{:else}
    <Loading />
{/if}
