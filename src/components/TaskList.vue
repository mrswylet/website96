<template>
	<div class="task-list">
		<TaskListItem v-for="(task, task_id) in taskList"
									:task="task"
									:task_id="task_id"
									:key="task_id"></TaskListItem>
		<TaskListNew></TaskListNew>
	</div>
</template>

<script>
	import TaskListItem from './TaskListItem.vue'
	import TaskListNew from './TaskListNew.vue'

	export default {
		name: "TaskList",
		components:{
			TaskListItem,
			TaskListNew,
		},
		computed:{
			/**
			 * Получение списка задач
			 * @return {state.task_list|{}}
			 */
			taskList(){
				return this.$store.state.task_list
			},
		},
	}
</script>

<style scoped lang="scss">

</style>