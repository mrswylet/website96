import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		task_list: {},
		delete_task: {},
		colors: {
			'red': '#EF5350',
			'pink': '#F06292',
			'magenta': '#7E57C2',
			'yellow': '#FFE082',
		},
	},
	mutations: {
		newTask(state, data_task) {
			const next_id = Math.max.apply(null, Object.keys(state.task_list)) + 1;
			Vue.set(state.task_list, next_id, {
				done: false,
				color: data_task.color_id,
				name: data_task.value,
			});

			localStorage.setItem('task_list', JSON.stringify(state.task_list));
		},
		editTask(state, data_task) {
			const task_id = data_task.id;
			state.task_list[task_id].color = data_task.color;
			state.task_list[task_id].name = data_task.name;

			localStorage.setItem('task_list', JSON.stringify(state.task_list));
		},
		taskDone(state, task_id) {
			const current_status = state.task_list[task_id].done;
			if (current_status === false) {
				Vue.set(state.delete_task, task_id, '');
			} else {
				Vue.delete(state.delete_task, task_id)
			}
			state.task_list[task_id].done = !current_status;

			localStorage.setItem('task_list', JSON.stringify(state.task_list));
		},
		deleteTask(state){
			Object.keys(state.delete_task).forEach(function (task_id) {
				Vue.delete(state.delete_task, task_id);
				Vue.delete(state.task_list, task_id);
			});

			localStorage.setItem('task_list', JSON.stringify(state.task_list));
		},
		restorationTaskLis(state, obj_task_list){
			state.task_list = Object.assign({}, state.task_list, obj_task_list)
		}
	},
	actions: {}
})
