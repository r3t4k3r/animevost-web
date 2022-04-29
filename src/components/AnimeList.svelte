<script>
    import { Row, Col, Image, Badge, Progress } from "sveltestrap";
    import { scale, fade } from "svelte/transition";
    import Loading from "./Loading.svelte";
    import { Navigate } from "svelte-router-spa";
    import { uriHeader, uriHeaderWD } from "../config";
    export let animes;
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
                            <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                                <div in:scale>
                                    <img
                                        alt="logo"
                                        src={anime.urlImagePreview}
                                        style="height: 300px; width: 200px; border-radius: .25rem"
                                        on:error={(obj) => {obj.target.src=`${uriHeaderWD}/static/img/alpha.png`}}
                                    />
                                </div>
                                <div in:fade>
                                    <Progress multi>
                                        <Progress
                                            animated
                                            bar
                                            color="success"
                                            value={(anime.rating /
                                                anime.votes) *
                                                20}
                                        >
                                            {(
                                                anime.rating / anime.votes
                                            ).toFixed(2)}
                                        </Progress>
                                        <Progress
                                            bar
                                            color="danger"
                                            value={101 -
                                                (anime.rating / anime.votes) *
                                                    20}
                                        />
                                    </Progress>
                                </div>
                            </Navigate>
                        </Col>
                        <Col
                            class="col-xxl-8 col-xl-8 col-lg-7 col-md-8 col-sm-7 col-12"
                        >
                            <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                                <h4 in:fade>{anime.title.split("/")[0]}</h4>
                            </Navigate>
                            <div in:fade>
                                <h5>
                                    {anime.type} / {anime.year} /
                                    {#each anime.genre.split(",") as gen}
                                        <Badge class="me-2 mb-1 mt-1" primary>
                                            {gen.trim()}
                                        </Badge>
                                    {/each}
                                </h5>
                                <h5>
                                    {anime.title.split("[")[1].split("]")[0]}
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
            {/each}
        </Row>
    </div>
{:else}
    <Loading />
{/if}
