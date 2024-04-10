<script>
    import { Dialogs } from "@nativescript/core";
    import Select from "./Select.svelte";
    import Input from "./Input.svelte";

    let taskData = {
        project_id: '',
        tracker_id: '',
        subject: '',
        description: '',
        status_id: '',
        priority_id: '',
        assignee: '',
        parent: '',
        start_date: '',
        due_date: '',
        estimate_time: ''
    }

    let xmlTaskDataSend = `
    <issue>
        <project_id>${taskData.project_id}</project_id>
        <tracker_id>${taskData.tracker_id}</tracker_id>
        <status_id>${taskData.status_id}</status_id>
        <priority_id>${taskData.priority_id}</priority_id>
        <subject>${taskData.subject}</subject>
        <description>${taskData.description}</description>
        <category_id></category_id>
        <fixed_version_id></fixed_version_id>
        <assigned_to_id></assigned_to_id>
        <parent_issue_id></parent_issue_id>
        <custom_fields></custom_fields>
        <watcher_user_ids></watcher_user_ids>
        <is_private>${false}</is_private>
        <estimated_hours>${taskData.estimate_time}</estimated_hours>
        <assigned_to><assigned_to>
    </issue>
    `

    let projectArr = ['TypeScript', 'JavaScript', 'Neither',]
    let trackerArr = ['Feature', 'Bug', 'Support',]
    let statusArr = ['To do', 'Estimate', 'Close', 'Rejected']
    let priority = ["Low", "Normal", "High", "Urgent", "Immediate"]

    async function selectPopup(arr) {
        return Dialogs.action({
        title: 'Action!',
        message: 'Choose your language:',
        cancelButtonText: 'Cancel',
        actions: arr,
        cancelable: true,
        destructiveActionsIndexes: [2],
      }).then((result) => {
        if(result == 'Cancel') return
        else return result
      })
    }

    function addIssue() {
        console.log(taskData)
    }

    function getId(arr, el) {
        const id = arr.indexOf(el)
        return id >= 0 ? id : ''
    }

</script>

<scrollView>
    <flexboxLayout flexDirection='column'>
        <flexboxLayout flexDirection='column' width='100%'>
            <Select title='Project' required={true}
            fun={() => selectPopup(projectArr)}
            on:select={(e) => {taskData.project_id = getId(projectArr, e.detail.detail.value)}}/>

            <Select title='Tracker' required={true}
            fun={() => selectPopup(trackerArr)}
            on:select={(e) => {taskData.tracker_id = getId(trackerArr, e.detail.detail.value)}}/>

            <Select title='Status' required={true}
            fun={() => selectPopup(statusArr)}
            on:select={(e) => {taskData.status_id = getId(statusArr, e.detail.detail.value)}}/>

            <Select title='Priority' required={true}
            fun={() => selectPopup(priority)}
            on:select={(e) => {taskData.priority_id = getId(priority, e.detail.detail.value)}}/>

            <Input title='Subject' required={true} on:input-value={(e) => taskData.subject = e.detail.detail.value}/>
            <Input title='Description' on:input-value={(e) => taskData.description = e.detail.detail.value}/>
            <Input title='Parent' on:input-value={(e) => taskData.parent = e.detail.detail.value}/>
            <Input title='Start Date' on:input-value={(e) => taskData.start_date = e.detail.detail.value}/>
            <Input title='Due Date' on:input-value={(e) => taskData.due_date = e.detail.detail.value}/>
            <Input title='Estimate' on:input-value={(e) => taskData.estimate_time = e.detail.detail.value}/>
        </flexboxLayout>
        <button text='Сreate a task' on:tap={addIssue} class="button"></button>
    </flexboxLayout>
</scrollView>

<style>
    .button {
        color: #000;
        background: #8dfc96;
    }
</style>
