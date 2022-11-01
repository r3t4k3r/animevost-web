<script>
    import { onMount } from "svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import { apiUrl } from "../config";

    import AnimeList from "../components/AnimeList.svelte"

    let page = 1;
    let animes = [];

    onMount(async () => {
        animes = await getAnimes();
    });

    async function getAnimes() {
        const response = await fetch(
            `${apiUrl}/last?page=${page}&quantity=12`,
            {
                mode: "cors", // 'cors' by default
            }
        );
        const json = await response.json();
        return json.data;
    }
</script>

<AnimeList hasSpinner={true} {animes} />

<InfiniteScroll
    hasMore={animes.length}
    threshold={200}
    window="true"
    on:loadMore={async () => {
        page += 1;
        const data = await getAnimes();
        animes = [...animes, ...data];
    }}
/>
