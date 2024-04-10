<script>
    import Home from "./Home.svelte";
    import MyPage from "./MyPage.svelte";
    import AddTask from "./AddTask.svelte"
    import PageAllTasks from "./PageAllTasks.svelte";
    import { navigate } from "svelte-native";

    const AppSettings = require("tns-core-modules/application-settings");
</script>

<page>
    <actionBar title="My Tasks" class="action-bar" />
    <tabView>
        <tabViewItem title="My page">
            <flexboxLayout>
                <MyPage />
            </flexboxLayout>
        </tabViewItem>
        <tabViewItem title="Add Task">
            <flexboxLayout>
                <AddTask />
            </flexboxLayout>
        </tabViewItem>
        <tabViewItem title="All tasks">
            <flexboxLayout>
                <PageAllTasks />
            </flexboxLayout>
        </tabViewItem>
        <tabViewItem title="profile">
            <flexboxLayout flexDirection='column'>
                <button text='Log out' class="button" on:tap={() => {
                    AppSettings.remove('user_data')
                    navigate({page: Home})
                }}>
                </button>
            </flexboxLayout>
        </tabViewItem>
    </tabView>
</page>

<style>
    .button {
        background: rgb(255, 141, 141);
    }
</style>
