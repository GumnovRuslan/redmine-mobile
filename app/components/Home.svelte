<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-native'
    import Tasks from './Tasks.svelte';
    import LoginForm from './loginForm.svelte';
    const AppSettings = require("tns-core-modules/application-settings");

    let loadingIndicator = false
    onMount(() => {
        if(AppSettings.getString('user_data')) {
            loadingIndicator = true
            navigate({ page: Tasks })
        }
    })
</script>

<page>
	<actionBar title="Redmine Mobile" />
    <LoginForm {loadingIndicator}/>
</page>

<style>
</style>
