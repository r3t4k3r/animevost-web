<script>
    import { FormGroup, Navbar, NavbarBrand, Input } from "sveltestrap";
    import { createEventDispatcher } from "svelte";
    import { uriHeader } from "../config";

    let searchInput = "";

    let dispatcher = createEventDispatcher();

    function handleInput() {
        const trimmedText = searchInput.trim();
        if (trimmedText !== "") {
            dispatcher("search", {
                text: trimmedText,
            });
        }
    }
</script>

<Navbar color="light" light class="fixed-top">
    <NavbarBrand href={`/${uriHeader}`}>Animevost</NavbarBrand>

    <FormGroup style="margin-bottom: 0!important">
        <Input
            type="search"
            name="search"
            placeholder="ваше любимое аниме"
            bind:value={searchInput}
            on:change={handleInput}
        />
    </FormGroup>
</Navbar>
<div style="margin-bottom: 5em" />
