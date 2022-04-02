<script>
    import { Spinner } from "sveltestrap";
    import { uriHeaderWD } from "../config";

    import { scale } from "svelte/transition";

    let imgUrl = `${uriHeaderWD}/static/img/loading.png`;
</script>

<div class="parent" in:scale="{{duration: 150}}" out:scale="{{duration: 300}}">
    <div class="d-grid gap-3 block">
        <div class="d-flex justify-content-center">
            <img src={imgUrl} class="img" alt="loading" />
        </div>
        <div class="d-flex justify-content-center">
            <h3>Загрузка <Spinner color="primary" /></h3>
        </div>
    </div>
</div>

<style>
    .parent {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
    }

    .block {
        width: 250px;
        height: 250px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -125px 0 0 -125px;
    }

    .img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        border: none;
    }
</style>
