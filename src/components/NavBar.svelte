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
        Icon,
    } from "sveltestrap";
    import { uriHeader, uriHeaderWD } from "../config";
    import { navigateTo, Navigate } from "svelte-router-spa";

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

<!-- <div class="nbar">
    <ul class="navbar">
        <li>
            <div on:click={() => navigateTo(`${uriHeader}/`)}>
                <span class="icon"><Icon name="house" /></span>
                Главная
            </div>
        </li>
        <li>
            <div on:click={() => navigateTo(`${uriHeader}/schedule`)}>
                <span class="icon"><Icon name="card-list" /></span>
                Расписание
            </div>
        </li>
        <li>
            <div on:click={() => navigateTo(`${uriHeader}/about`)}>
                <span class="icon"><Icon name="info-circle" /></span>
                О сайте
            </div>
        </li>
    </ul>
</div> -->

<Navbar color="dark" dark class="sticky-top" expand="md">
    <NavbarBrand href={`/${uriHeader}`}>
        <span class="icon"><Icon name="house" /></span>
        Animevost
    </NavbarBrand>
    <NavbarToggler on:click={toggleNav} />
    <Collapse isOpen={navOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            <NavItem>
                <NavLink on:click={toggleModal}>
                    <span class="icon"><Icon name="info-circle" /></span>
                    О сайте
                    </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={`${uriHeader}/schedule`}>
                    <span class="icon"><Icon name="card-list" /></span>
                    Расписание
                </NavLink>
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
                src={`${uriHeaderWD}/static/img/love.png`}
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
<!-- <style>
    .spacer-top {
        margin-top: 5em;
        z-index: 0;
    }

    .nbar {
        position: sticky;
    }
    li {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 0 16px;
        text-decoration: none;
        font-size: 13px;
        list-style-type: none; /* Убираем маркеры */
        z-index: 101;
    }
    .icon {
        display: block;
        font-size: 20px;
    }
    ul {
        padding-left: 0; /* Сдвигаем список влево */
    }

    @media (max-width: 756px) {
        .nbar {
            position: sticky;
        }
        li {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 0 16px;
            text-decoration: none;
            font-size: 13px;
            list-style-type: none; /* Убираем маркеры */
            z-index: 101;
        }
        .icon {
            display: block;
            font-size: 20px;
        }
        ul {
            padding-left: 0; /* Сдвигаем список влево */
        }
    }
</style> -->
