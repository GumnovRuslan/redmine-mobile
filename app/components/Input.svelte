<script>
    import { createEventDispatcher } from 'svelte'

    export let required = false;
    export let title = '';

    const dispatch = createEventDispatcher()
    let text = ''
</script>

<flexboxLayout flexDirection='column' width="100%" class="container">
    <flexboxLayout>
        <label text={title} class="input-title"></label >
        {#if required}
        <label text='*' class="input-title-mark"></label >
        {/if}
    </flexboxLayout>
    <textField hint={title} bind:text={text} on:textChange={() => {dispatch('input-value', {value: text})}} class="input" width='70%' color="#000"/>
</flexboxLayout>



<style>
    .container {
        border-radius: 20px;
        padding: 20px 0;
        background: #000;
        margin-bottom: 15px;
    }
    .input-title {
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .input-title-mark {
        margin-left: 15px;
        color: red;
    }
    .input {
        background: #587ca5;
        padding: 20px 45px;
        border-radius: 20px;
        font-size: 14px;
        margin: 0 20px;
    }
</style>
