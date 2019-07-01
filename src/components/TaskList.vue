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
		data() {
			return{
				//taskList: this.$store.state.task_list
			}
		},
		computed:{
			count(){
				return this.$store.state.count;
			},
			taskList(){
				return this.$store.state.task_list
			},
		},
		components:{
			TaskListItem,
			TaskListNew,
		}
	}
</script>

<style scoped lang="scss">

</style>