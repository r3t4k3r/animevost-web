<script>
    import { FormGroup, Navbar, NavbarBrand, Input } from "sveltestrap";
    import { createEventDispatcher } from "svelte";

    export let name = "Animevost";

    const URI_HEADER = "/animevost-web";
    let searchInput = "";

    let dispatcher = createEventDispatcher()

    function handleInput() {
        const trimmedText = searchInput.trim();
        if (trimmedText !== "") {
            dispatcher('search', {
                text: trimmedText,
            })
        }
    }
</script>

<Navbar color="light" light class="fixed-top">
    <NavbarBrand href={`${URI_HEADER}/`}>{name}</NavbarBrand>

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