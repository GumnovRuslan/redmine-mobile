<script>
    import { Template } from "@nativescript/core";
    import Task from "./Task.svelte";
</script>

<gridLayout rows="*">
    <tabView>
        <tabViewItem title="detail">
            <flexboxLayout></flexboxLayout>
        </tabViewItem>
        <tabViewItem title="Report">
            <flexboxLayout></flexboxLayout>
        </tabViewItem>
    </tabView>
    <!-- <button text="delete tasks" row='0' on:tap={() => {list = []}}></button> -->
        <!-- <listView items='{list}' row="0" colSpan="2" class='list' >
            <Template let:item>
                <Task {item}/>
            </Template>
        </listView> -->
</gridLayout>
