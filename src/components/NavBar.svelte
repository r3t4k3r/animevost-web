<script>
    import {
        Navbar,
        NavbarBrand,
        Input,
        Button,
        ModalHeader,
        Modal,
        ModalBody,
        ModalFooter,
        NavItem,
        NavLink,
        NavbarToggler,
        Collapse,
        Nav,
    } from "sveltestrap";
    import { uriHeader, uriHeaderWD } from "../config";
    import { navigateTo } from "svelte-router-spa";

    let searchInput = "";

    let modalOpen = false;
    const toggleModal = () => (modalOpen = !modalOpen);

    let navOpen = false;
    const toggleNav = () => (navOpen = !navOpen);

    function handleInput(event) {
        const trimmedText = searchInput.trim();
        if (trimmedText !== "" && event.key === "Enter") {
            searchInput = "";
            navigateTo(`${uriHeader}/search/${trimmedText}`);
        }
    }
    function handleUpdate(event) {
        navOpen = event.detail.isOpen;
    }
</script>

<Navbar color="dark" dark class="sticky-top" expand="md">
    <NavbarBrand href={`/${uriHeader}`}>Animevost</NavbarBrand>
    <!-- search -->
    <NavbarToggler on:click={toggleNav} />
    <Collapse isOpen={navOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            <NavItem>
                <NavLink on:click={toggleModal}>О сайте</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={`${uriHeader}/schedule`}>Расписание</NavLink>
            </NavItem>
            <Input
                type="search"
                name="search"
                placeholder="найдите любимое аниме"
                bind:value={searchInput}
                on:keydown={handleInput}
                style="width:15em"
            />
        </Nav>
    </Collapse>
</Navbar>
<Modal isOpen={modalOpen} toggle={toggleModal}>
    <ModalHeader {toggleModal}>О сайте</ModalHeader>
    <ModalBody>
        Исходный код: <a
            target="_blank"
            href="https://github.com/r3t4k3r/animevost-web">тут</a
        ><br />
        Спасибо: <a target="_blank" href="https://animevost.org">Animevost</a> и
        <a target="_blank" href="https://alpha1918.moe/">Альфа 1918</a><br /><br
        />
        <div class="d-flex justify-content-center">
            <img
                alt="logo"
                src={`${uriHeaderWD}/static/img/loading.png`}
                style="height: 300px; width: 300px; border-radius: .25rem;"
            />
        </div>
        <br />
        Сбер для донатов: 5469610011057477
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" on:click={toggleModal}>Закрыть</Button>
    </ModalFooter>
</Modal>
<div style="margin-bottom: 3em" />
