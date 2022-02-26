<script>
    import {
        Accordion,
        AccordionItem,
        Card,
        Row,
        Col,
        Image,
        Badge,
    } from "sveltestrap";
    import { onMount } from "svelte";
    import { Navigate } from "svelte-router-spa";
    import InfiniteScroll from "svelte-infinite-scroll";
    import { uriHeader, apiUrl } from "../config";

    let page = 1;
    let animes = [];

    onMount(async () => {
        animes = await getAnimes();
    });

    async function getAnimes() {
        const response = await fetch(
            `${apiUrl}/last?page=${page}&quantity=10`,
            {
                mode: "cors", // 'cors' by default
            }
        );
        const json = await response.json();
        return json.data;
    }
</script>

<div class="d-grid gap-4 mt-3 mb-3">
    {#if animes.length > 0}
        {#each animes as anime (anime.id)}
            <Card>
                <Row>
                    <Col class="col-md-auto">
                        <Navigate to={`${uriHeader}/anime/${anime.id}`}>
                            <Image
                                src={anime.urlImagePreview}
                                class="float-start"
                                style="height: 300px; width: 200px; border-radius: .25rem"
                            />
                        </Navigate>
                    </Col>
                    <Col>
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
                                        <Badge class="me-2 mb-1 mt-1" primary
                                            >{gen.trim()}</Badge
                                        >
                                    {/each}
                                </h5>
                            </AccordionItem>
                            <AccordionItem header="Описание">
                                {@html anime.description}
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Card>
        {/each}
    {:else}
        loading
    {/if}
</div>
<InfiniteScroll
    hasMore={animes.length}
    threshold={1000}
    window="true"
    on:loadMore={async () => {
        page++;
        const data = await getAnimes();
        animes = [...animes, ...data];
    }}
/>
