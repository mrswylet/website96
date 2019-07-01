import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// объект задач
		task_list: {},
		// объект выполненных задач
		done_task: {},
		colors: {
			'red': '#EF5350',
			'pink': '#F06292',
			'magenta': '#7E57C2',
			'yellow': '#FFE082',
		},
	},
	mutations: {
		/**
		 * Мутация для создания новой задачи
		 * @param state
		 * @param data_task {object} - объект настройки
		 * @param data_task.color_id {string} - идентификатор цвета (red, pink, magenta, yellow)
		 * @param data_task.name {string} - текст задачи
		 */
		newTask(state, data_task) {
			const arr_keys_tasks = Object.keys(state.task_list);

			let next_id = 0;
			if(arr_keys_tasks.length){
				next_id = Math.max.apply(null, Object.keys(state.task_list)) + 1;
			}

			Vue.set(state.task_list, next_id, {
				done: false,
				color: data_task.color_id,
				name: data_task.name,
			});

			// сохранение состояния в localStorage клиента
			localStorage.setItem('task_list', JSON.stringify(state.task_list));
			localStorage.setItem('done_task', JSON.stringify(state.done_task));
		},
		/**
		 * Мутация для редактирования задачи
		 * @param state
		 * @param data_task {object} - объект настройки
		 * @param data_task.id {number} - идентификатор задачи
		 * @param data_task.color_id {string} - идентификатор цвета (red, pink, magenta, yellow)
		 * @param data_task.name {string} - текст задачи
		 */
		editTask(state, data_task) {
			const task_id = data_task.id;
			state.task_list[task_id].color = data_task.color_id;
			state.task_list[task_id].name = data_task.name;

			// сохранение состояния в localStorage клиента
			localStorage.setItem('task_list', JSON.stringify(state.task_list));
		},
		/**
		 * Мутация выставляет статус задаче
		 * @param state
		 * @param task_id {number} - идентификатор задачи
		 */
		taskDone(state, task_id) {
			const current_status = state.task_list[task_id].done;
			if (current_status === false) {
				Vue.set(state.done_task, task_id, '');
			} else {
				Vue.delete(state.done_task, task_id)
			}

			state.task_list[task_id].done = !current_status;

			// сохранение состояния в localStorage клиента
			localStorage.setItem('task_list', JSON.stringify(state.task_list));
			localStorage.setItem('done_task', JSON.stringify(state.done_task));
		},
		/**
		 * Мутация удаляет выполненные задачи
		 * @param state
		 */
		deleteTask(state){
			Object.keys(state.done_task).forEach(function (task_id) {
				Vue.delete(state.done_task, task_id);
				Vue.delete(state.task_list, task_id);
			});

			// сохранение состояния в localStorage клиента
			localStorage.setItem('task_list', JSON.stringify(state.task_list));
			localStorage.setItem('done_task', JSON.stringify(state.done_task));
		},
		/**
		 * Мутация обновляет список задач из резервной копии
		 * @param state
		 * @param data {object}
		 * @param data.task_list {object} - резервная копия списка задач
		 * @param data.done_task_list {object} - резервная копия выполненных задач
		 */
		restorationTaskList(state, data){
			state.task_list = Object.assign({}, state.task_list, data.task_list);
			state.done_task = Object.assign({}, state.done_task, data.done_task_list);
		}
	},
	actions: {}
})
