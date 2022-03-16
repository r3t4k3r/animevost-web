import AnimeListPage from "./Pages/AnimeListPage.svelte";
import AnimePage from "./Pages/AnimePage.svelte";
import NotFoundPage from "./Pages/NotFoundPage.svelte";
import SearchPage from "./Pages/SearchPage.svelte";

import { uriHeader } from "./config"

const routes = [
    {
        name: `${uriHeader}/`,
        component: AnimeListPage
    },
    {
        name: `${uriHeader}/anime/:id`,
        component: AnimePage
    },
    {
        name: `${uriHeader}/search/:name`,
        component: SearchPage
    },
    {
        name: '404',
        path: '/404',
        component: NotFoundPage
    }
]

export { routes }