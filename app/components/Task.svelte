<script>
    export let item = {}
</script>


<gridLayout columns="50, *" flexWrap='nowrap' class="container" flexShrink='0'>
    <label text="{item.id}" col='0'></label>
    <label text="{item.subject}" col='1' textWrap="true"></label>
</gridLayout>

<style>
    .container {
        display: flex;
        flex-direction: row;
        background: #4b4b4b;
        padding: 15px;
    }
</style>
