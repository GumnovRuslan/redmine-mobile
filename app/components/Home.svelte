<script>
    import { Template } from 'svelte-native/components'

    let dones=[] //completed items go here
		const removeFromList = (list, item) => list.filter(t => t !== item);
		const addToList = (list, item) => [item, ...list]

    let todos = []
    let textFieldValue = ""

    async function onItemTap(args) {
		let result = await action("What do you want to do with this task?", "Cancel", [
				"Mark completed",
				"Delete forever"
		]);

		console.log(result); // Logs the selected option for debugging.
		let item = todos[args.index]
		switch (result) {
				case "Mark completed":
						dones = addToList(dones, item) // Places the tapped active task at the top of the completed tasks.
						todos = removeFromList(todos, item) // Removes the tapped active task.
						break;
				case "Delete forever":
						todos = removeFromList(todos, item) // Removes the tapped active task.
						break;
				case "Cancel" || undefined: // Dismisses the dialog
						break;
		}
	}

    function onButtonTap() {
        if (textFieldValue === "") return; // Prevents users from entering an empty string.
        console.log("New task added: " + textFieldValue + "."); // Logs the newly added task in the console for debugging.
        todos = [{ name: textFieldValue }, ...todos] // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
        textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }

    async function onDoneTap(args) {
        let result = await action("What do you want to do with this task?", "Cancel", [
                "Mark To Do",
                "Delete forever"
        ]);

        console.log(result); // Logs the selected option for debugging.
        let item = dones[args.index]

        if(result = "Mark To Do") {
            todos = addToList(todos, item)
            dones = removeFromList(dones, item)
        } else if(result = "Delete forever") {
            dones = removeFromList(dones, item)
        }
    }
</script>

<page>
		<actionBar title="My Tasks" />

		<tabView>
				<tabViewItem title="To Do">
                    <gridLayout columns="*,120" rows="70,*">
                            <!-- Configures the text field and ensures that pressing Return on the keyboard
                                    produces the same result as tapping the button. -->
                            <textField col="0" row="0" bind:text="{textFieldValue}" hint="Type new task..." editable="true" class="placeholder"
                                    on:returnPress="{onButtonTap}" />
                                <button col="1" row="0" text="Add task" on:tap="{onButtonTap}" class="-primary" />

                            <listView items="{todos}" on:itemTap="{onItemTap}" row="1" colSpan="2">
                                    <Template let:item>
                                            <label text="{item.name}" textWrap="true" />
                                    </Template>
                            </listView>
                    </gridLayout>
				</tabViewItem>
				<tabViewItem title="Completed">
                    <listView items="{dones}" on:itemTap="{onDoneTap}">
                        <Template let:item>
                                <label class="todo-item-completed" text="{item.name}" textWrap="true" />
                        </Template>
                    </listView>
				</tabViewItem>
		</tabView>
</page>



<style>
    .info .fas {
        color: #3A53FF;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
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
