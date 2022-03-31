<script>
    import { Spinner } from "sveltestrap";
    import { uriHeader } from "../config";
    let imgUrl = `${uriHeader}/static/img/loading.png`;
</script>

<div class="d-grid gap-5">
    <div class="d-flex justify-content-center">
        <img src={imgUrl} style="width:300px;height:300px;" alt="loading" />
    </div>
    <div class="d-flex justify-content-center">
        <h3>Загрузка <Spinner color="primary" /></h3>
    </div>
</div>
