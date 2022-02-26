import AnimeList from "./components/AnimeList.svelte";
import Anime from "./components/Anime.svelte";
import NotFound from "./components/NotFound.svelte";
import { uriHeader } from "./config"

const routes = [
    {
        name: `${uriHeader}/`,
        component: AnimeList
    },
    {
        name: `${uriHeader}/anime/:id`,
        component: Anime
    },
    {
        name: '404',
        path: '404',
        component: NotFound
    }
]

export { routes }