<script>
    import { createEventDispatcher } from 'svelte'
    export let title
    export let fun = async () => {}
    export let select = 'none'
    export let required = false

    const dispatch = createEventDispatcher()

    async function change() {
        let result = await fun()
        if(result) {
            select = result
            dispatch('select', {value: select})
        }
    }
</script>


<flexboxLayout flexDirection='column' class="select" on:tap={change}>
    <flexboxLayout>
        <label text={title} class="select__title"></label >
        {#if required}
            <label text='*' class="select__title-mark"></label >
        {/if}
    </flexboxLayout>

    <label bind:text={select} class="select__value"></label>
</flexboxLayout>

<style>
    .select {
        margin-bottom: 15px;
        background: #000;
        border-radius: 20px;
        padding: 20px;
    }
    .select__title {
        font-size: 16px;
        margin-bottom: 10px;
    }
    .select__title-mark {
        margin-left: 15px;
        color: red;
    }
    .select__value {
        background: #587ca5;
        padding: 20px 45px;
        font-size: 14px;
        margin-right: 20px;
        border-radius: 20px;
    }
</style>
