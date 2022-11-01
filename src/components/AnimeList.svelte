<script>
    import { Row, Col, Spinner, Badge, Progress } from "sveltestrap";
    import Loading from "./Loading.svelte";
    import { Navigate } from "svelte-router-spa";
    import { uriHeader, uriHeaderWD } from "../config";
    import { fade, scale } from "svelte/transition";
    export let animes;
    export let hasSpinner = false;
</script>

{#if animes.length > 0}
    <div class="d-grid gap-5 mb-5">
        <Row>
            {#each animes as anime (anime.id)}
                <Col
                    class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                >
                    <Row class="mb-5">
                        <Col
                            class="col-xxl-4 col-xl-4 col-lg-5 col-md-4 col-sm-5 col-12 d-flex justify-content-center"
                        >
                            <div
                                style="background: url({anime.urlImagePreview})"
                                class="imagebackground"
                            />
                            <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                                <img
                                    in:fade
                                    alt="logo"
                                    src={anime.urlImagePreview}
                                    style="height: 300px; width: 200px; border-radius: .25rem;filter: unset;"
                                    on:error={(obj) => {
                                        obj.target.src = `${uriHeaderWD}/static/img/alpha.png`;
                                    }}
                                />
                                <Progress multi>
                                    <Progress
                                        bar
                                        color="success"
                                        value={(anime.rating / anime.votes) *
                                            20}
                                    >
                                        {(anime.rating / anime.votes).toFixed(
                                            1
                                        )}
                                    </Progress>
                                    <Progress
                                        bar
                                        color="danger"
                                        value={101 -
                                            (anime.rating / anime.votes) * 20}
                                    />
                                </Progress>
                            </Navigate>
                        </Col>
                        <Col
                            class="col-xxl-8 col-xl-8 col-lg-7 col-md-8 col-sm-7 col-12"
                        >
                            <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                                <h4 in:scale>
                                    {anime.title.split("/")[0]}
                                </h4>
                            </Navigate>
                            <h5>
                                {anime.type} / {anime.year} /
                                {#each anime.genre.split(",") as gen}
                                    <Badge class="me-2 mb-1 mt-1" primary>
                                        {gen.trim()}
                                    </Badge>
                                {/each}
                                / {anime.title.split("[")[1].split("]")[0]}
                            </h5>
                            {@html anime.description.slice(0, 200)}...
                        </Col>
                    </Row>
                </Col>
            {/each}
            {#if hasSpinner}
                <div style="text-align: center;">
                    <Spinner color="primary" />
                </div>
            {/if}
        </Row>
    </div>
{:else}
    <Loading />
{/if}

<style>
    .imagebackground {
        border-radius: 0.25rem;
        filter: blur(5px);
        position: absolute;
        height: 314px;
        width: 204px;
        z-index: -1;
    }
    @media screen and (max-width: 575px) {
        .imagebackground {
            width: 100%;
        }
    }
</style>
