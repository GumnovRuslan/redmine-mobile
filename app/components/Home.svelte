<script>
    // import { navigate } from 'svelte-native'
    import { Dialogs } from '@nativescript/core'
    var Buffer = require('buffer/').Buffer

    async function fn() {
        let resultUserData = null
        let userData = await getUserData()
        if(userData.result) {
            console.log('login start')
            resultUserData = await getUserCred(userData.userName, userData.password)
            console.log(resultUserData)
        }
        if(resultUserData) {
            console.log(resultUserData)
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
            password: 'pEAP3r9cBYHqacjy',
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
        let code = 'cnVzbGFuZzpwRUFQM3I5Y0JZSHFhY2p5'
        console.log('la la')

        const headers = new Headers({
			Authorization: `Basic ${Buffer.from(username + ':' + password, 'binary').toString('base64')}`
		});

        let result = await fetch('https://redmine.codedot.io/my/account.json', { headers })
        .then((res) => res.json())
        .catch((e) => {console.log(e.message)});
        return result
    };
</script>

<page>
		<actionBar title="Login" />
        <button text='log in' on:tap={fn} class="-primary"></button>
</page>

<page>

</page>



<style>
    .placeholder {
			font-size: 20;
	}

    label {
        font-size: 18;
    }

    .todo-item-completed {
        color: #939393;
        text-decoration: line-through;
    }
</style>
