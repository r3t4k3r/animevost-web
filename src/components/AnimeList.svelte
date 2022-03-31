<script>
    import {
        Accordion,
        AccordionItem,
        Row,
        Col,
        Image,
        Badge,
    } from "sveltestrap";
    import Loading from "./Loading.svelte";
    import { Navigate } from "svelte-router-spa";
    import { uriHeader } from "../config";
    export let animes;
</script>

{#if animes.length > 0}
    <div class="d-grid gap-5 mb-5 mt-5">
        {#each animes as anime (anime.id)}
            <Row>
                <Col
                    class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12 d-flex justify-content-center"
                >
                    <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                        <Image
                            src={anime.urlImagePreview}
                            style="height: 300px; width: 200px; border-radius: .25rem"
                        />
                    </Navigate>
                </Col>
                <Col
                    class="col-xxl-10 col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12"
                >
                    <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                        <h4>{anime.title}</h4>
                    </Navigate>
                    <Accordion flush stayOpen>
                        <AccordionItem header="Год выпуска">
                            {anime.year}
                        </AccordionItem>
                        <AccordionItem header="Жанр">
                            <h5>
                                {#each anime.genre.split(",") as gen}
                                    <Badge class="me-2 mb-1 mt-1" primary>
                                        {gen.trim()}
                                    </Badge>
                                {/each}
                            </h5>
                        </AccordionItem>
                        <AccordionItem header="Описание">
                            {@html anime.description}
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        {/each}
    </div>
{:else}
    <Loading />
{/if}
