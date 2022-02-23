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
    import { link } from "svelte-routing";
    import InfiniteScroll from "svelte-infinite-scroll";

    let page = 1;
    let animes = [];

    onMount(async () => {
        animes = await getAnimes();
    });

    async function getAnimes() {
        const response = await fetch(
            `https://api.animevost.org/v1/last?page=${page}&quantity=10`
        );
        const json = await response.json();
        return json.data;
    }
</script>

<div class="d-grid gap-3 mt-3 mb-3">
    {#each animes as anime (anime.id)}
        <Card style="border: 0">
            <Row>
                <Col class="col-md-auto">
                    <a href={`/anime/${anime.id}`} use:link>
                        <Image
                            src={anime.urlImagePreview}
                            class="float-start"
                            style="height: 300px; width: 200px;"
                        />
                    </a>
                </Col>
                <Col>
                    <a href={`/anime/${anime.id}`} use:link>
                        <h4>
                            {anime.title}
                        </h4>
                    </a>
                    <Accordion flush stayOpen>
                        <AccordionItem active header="Год выпуска">
                            {anime.year}
                        </AccordionItem>
                        <AccordionItem active header="Жанр">
                            <h5>
                                {#each anime.genre.split(",") as gen}
                                    <Badge class="me-1" primary
                                        >{gen.trim()}</Badge
                                    >
                                {/each}
                            </h5>
                        </AccordionItem>
                        <AccordionItem header="Описание">
                            {@html anime.description}
                        </AccordionItem>
                    </Accordion>
                    <br />
                </Col>
            </Row>
        </Card>
    {/each}
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
