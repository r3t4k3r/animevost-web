<script>
    import { onMount } from "svelte";
    import {
        Accordion,
        Row,
        Spinner,
        Col,
        CardHeader,
        Card,
        CardText,
        CardBody,
        CardTitle,
    } from "sveltestrap";
    import Loading from "../components/Loading.svelte";
    import { Navigate } from "svelte-router-spa";
    import { apiUrl, uriHeaderWD, uriHeader } from "../config";

    let isLoaded = false;
    let schedule = [];
    let animes = [];

    onMount(async () => {
        schedule = await getRasp();
        animes = await getAnimeInfo(getAnimeIdsFromRasp());
        joinAnimesToObject();
        isLoaded = true;
    });

    async function getRasp() {
        const response = await fetch(`${apiUrl}/rasp`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            referrerPolicy: "no-referrer",
        });
        const json = await response.json();
        return json;
    }

    async function getAnimeInfo(ids) {
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
            body: `id=${ids.join("%2C")}`, // body data type must match "Content-Type" header
        });
        const json = await response.json();
        return json.data;
    }

    function getAnimesByDay(day) {
        return schedule.filter((anime) => anime.day === day);
    }

    function getAnimeIdsFromRasp() {
        return schedule.map((anime) => anime.id);
    }

    function getAnimeInfoById(id) {
        return animes.filter((anime) => anime.id == id)[0];
    }

    function joinAnimesToObject() {
        schedule = schedule.map((anime) => {
            return { ...anime, ...getAnimeInfoById(anime.id) };
        });
    }

    function getNameByNumber(number) {
        switch (number) {
            case 0:
                return "Понедельник";
            case 1:
                return "Вторник";
            case 2:
                return "Среда";
            case 3:
                return "Четверг";
            case 4:
                return "Пятница";
            case 5:
                return "Суббота";
            case 6:
                return "Воскресенье";
        }
    }
</script>

{#if isLoaded}
    <h2 class="mb-5">Расписание</h2>
    <Accordion flush stayOpen class="mt-3">
        {#each [0, 1, 2, 3, 4, 5, 6] as number (number)}
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle>
                        {getNameByNumber(number)}
                        {#if new Date().getDay() === (number === 6 ? 0 : number + 1)}
                            <Spinner size="sm" color='success' type="grow" />
                        {/if}
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Row>
                            {#each getAnimesByDay(number) as anime (anime.id)}
                                <Col
                                    class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6"
                                >
                                    <Navigate
                                        to={`${uriHeader}/anime/${anime.id}`}
                                    >
                                        <img
                                            alt="logo"
                                            src={anime.urlImagePreview}
                                            style="width: 100%; border-radius: .25rem;"
                                            on:error={(obj) => {
                                                obj.target.src = `${uriHeaderWD}/static/img/alpha.png`;
                                            }}
                                        />
                                        <div class="mb-3">
                                            {anime.name}
                                        </div>
                                    </Navigate>
                                </Col>
                            {/each}
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        {/each}
    </Accordion>
{:else}
    <Loading />
{/if}
