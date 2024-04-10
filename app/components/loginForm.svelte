<script>
    import Tasks from './Tasks.svelte';
    import { navigate } from 'svelte-native'

    const AppSettings = require("tns-core-modules/application-settings");
    const Buffer = require('buffer/').Buffer
    let errorMessage = ''
    export let loadingIndicator = false
    let useApiKey = false

    const userData = {
        login: 'ruslang',
        password: 'pEAP3r9cBYHqacjy',
        api_key: '3aab169201bbb43147f2467cddb3f6ae2e448556'
    }

    async function logIn() {
        errorMessage = ''
        loadingIndicator = true

        let resultUser = await getUserCred(userData.login, userData.password, userData.api_key)
        if(!!resultUser) {
            AppSettings.setString('user_data', JSON.stringify(resultUser.user))
            navigate({ page: Tasks })
        } else {
            errorMessage = useApiKey ? 'Не верный ApiKey' : 'Не верный логин или пароль'
        }
        loadingIndicator = false
    }

    async function getUserCred (username, password, apiKey) {
        apiKey = `?key=${apiKey}`
        let headers = ''
        if(!useApiKey) {
            headers = new Headers({
			Authorization: `Basic ${Buffer.from(username + ':' + password, 'binary').toString('base64')}`
		})}

        return await fetch(`https://redmine.codedot.io/my/account.json${useApiKey ? apiKey : ''}`, { headers })
        .then((res) => res.json())
        .catch((e) => {e.message});
    };
</script>

    <flexboxLayout alignItems="center" justifyContent='center' flexDirection="column" row='1' width='60%'>
        <!-- <activityIndicator busy="{loadingIndicator}" /> -->
        <label text='Login'></label>
        {#if useApiKey}
            <textField hint='Apikey' width="100%" bind:text={userData.api_key} on:textChange={() => errorMessage = ''}/>
        {:else}
            <textField hint='Login' width="100%" bind:text={userData.login} on:textChange={() => errorMessage = ''}/>
            <textField hint='Password' width="100%" secure='true' bind:text={userData.password} on:textChange={() => errorMessage = ''}/>
        {/if}

        <flexboxLayout alignSelf="flex-start">
            <switch bind:checked={useApiKey} on:checkedChange={() => errorMessage = ''}></switch>
            <label text='Using apiKey'></label>
        </flexboxLayout>
        <button text='Log in' on:tap={logIn} width="100%" class="-primary"></button>
        <label class="eroor-messager" text={errorMessage} height='30' color='#ff3e3e'></label>
    </flexboxLayout>
