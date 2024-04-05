<script>
    // import { navigate } from 'svelte-native'
    import { Dialogs } from '@nativescript/core'
    import { userData } from './stores/userStore.js'
    const Buffer = require('buffer/').Buffer

    let error = false
    let messageText = ''

    async function fn() {
        let resultUser = null
        error = false
        let login = await getUserData()
        if(login.result) {
            console.log('login start')
            resultUser = await getUserCred(login.userName, login.password)
            console.log(resultUser)
        } else {
            console.log('login cancel')
        }
        if(resultUser) {
            console.log('user True')
            userData.set(resultUser.user)
        } else {
            error = true
            messageText = 'Не верный логин или пароль'
            console.log('user false')
        }
    }

    async function getUserData() {
        let data = null
        await Dialogs.login({
            title: 'Login!',
            message: 'Enter your credentials',
            okButtonText: 'Login',
            cancelButtonText: 'Cancel',
            userName: 'ruslang',
            password: 'pEAP3r9cBYHqacjy1',
            // neutralButtonText: 'Neutral',
            // cancelable: true,
            // passwordHint: 'Your password',
            // userNameHint: 'Your username',
            }).then((result) => {
            data = result
        })
        return data
    }

    const getUserCred = async (username, password) => {
        const headers = new Headers({
			Authorization: `Basic ${Buffer.from(username + ':' + password, 'binary').toString('base64')}`
		});

        let result = await fetch('https://redmine.codedot.io/my/account.json', { headers })
        .then((res) => res.json())
        .catch((e) => {e.message});
        return result
    };
</script>

<page>
	<actionBar title="Login" />
    <flexboxLayout alignItems="center" justifyContent='center' flexDirection="column">
        <button text='log in' on:tap={fn} class="-primary"></button>
        {#if error}
            <label class="eroor-messager" text={messageText}></label>
        {/if}
    </flexboxLayout>

</page>


<style>
    .eroor-messager {
        color: red;
    }
</style>
