<script>
    import { onMount } from 'svelte';
    import { Template } from 'svelte-native/components'
    import Task from "./Task.svelte";
    import { getTasks } from './utils/ApiService.js'
    const AppSettings = require("tns-core-modules/application-settings");

    onMount(() => {
        fun(userData.api_key, userData.id)
        allTasks(userData.api_key, allTasksOffset, 10)
    })

    let myTasksArr = []
    let allTasksArr = []
    let allTasksOffset = 0
    let allTasksLimit = 10
    const userData = JSON.parse(AppSettings.getString('user_data'))

    async function fun (apiKey, userId) {
        let result = await getTasks(apiKey, userId)
        myTasksArr = result.issues
    }

    async function allTasks(apiKey, offset, limit) {
        let result = await getTasks(apiKey, '', offset, limit)
        allTasksArr = [...allTasksArr, ...result.issues]
        allTasksOffset += limit
    }
</script>

<tabView>
    <tabViewItem title="Мои Задачи">
        <gridLayout rows="*">
            <listView items='{myTasksArr}'>
                <Template let:item>
                    <Task {item}/>
                </Template>
            </listView>
        </gridLayout>
    </tabViewItem>
    <tabViewItem title="Все задачи">
        <flexboxLayout>
            <listView items='{allTasksArr}' on:loadMoreItems={() => {allTasks(userData.api_key, allTasksOffset, allTasksLimit)}}>
                <Template let:item>
                    <Task {item}/>
                </Template>
            </listView>
        </flexboxLayout>
    </tabViewItem>
</tabView>
