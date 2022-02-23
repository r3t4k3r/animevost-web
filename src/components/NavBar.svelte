<script>
    import { FormGroup, Navbar, NavbarBrand, Input } from "sveltestrap";
    import { createEventDispatcher } from "svelte";

    export let name = "Animevost";

    let dispatcher = createEventDispatcher()

    let searchInput = "";

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
    <NavbarBrand>{name}</NavbarBrand>

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