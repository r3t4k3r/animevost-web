<script>
    import { FormGroup, Navbar, NavbarBrand, Input } from "sveltestrap";
    import { uriHeader } from "../config";
    import { navigateTo } from 'svelte-router-spa'

    let searchInput = "";

    function handleInput() {
        const trimmedText = searchInput.trim();
        if (trimmedText !== "") {
            searchInput=""
            navigateTo(`${uriHeader}/search/${trimmedText}`);
        }
    }
</script>

<Navbar color="dark" light class="fixed-top">
    <NavbarBrand href={`/${uriHeader}`}>Animevost</NavbarBrand>

    <FormGroup style="margin-bottom: 0!important">
        <Input
            type="search"
            name="search"
            placeholder="найдите любимое аниме"
            bind:value={searchInput}
            on:change={handleInput}
        />
    </FormGroup>
</Navbar>
<div style="margin-bottom: 5em" />
