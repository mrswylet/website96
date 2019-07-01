<template>
	<div class="item" :style="background">
		<div class="item__checked" :class="{'active': task.done}" @click="taskDone"></div>
		<div class="item__name" v-if="!is_edit" @click="editTask">{{task.name}}</div>
		<div class="item__edit" v-else>
			<input type="text"
						 class="item__input"
						 :class="{'item__input_error': validate_error}"
						 placeholder="Task name"
						 v-model="input_task_name"
						 @focus="validate_error = false">
			<div class="item__settings" :class="{'item__settings_error': validate_error}">
				<div class="item__colors">
					<div v-for="(color, color_id) in colors"
							 class="item__colors-item"
							 :class="{'active': color_id === activeColor}"
							 :key="color_id"
							 :data-color-id="color_id"
							 :style="{'background-color': color}"
							 @click="changeColor"></div>
				</div>
				<button class="item__save" @click="save">Save</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TaskListItem",
		props: ['task', 'task_id'],
		data() {
			return {
				input_task_name: this.task.name,
				colors: this.$store.state.colors,
				is_edit: false,
				validate_error: false,
				edit_color: this.task.color,
			}
		},
		computed: {
			/**
			 * Определение активного цвета
			 * @return {string}
			 */
			activeColor() {
				if (this.is_edit) {
					return this.edit_color;
				} else {
					return this.task.color;
				}
			},
			/**
			 * Определение HEX кодировки активного цвета
			 * @return {*}
			 */
			activeColorHex(){
				return this.colors[this.activeColor];
			},
			/**
			 * Определения фона для задачи
			 * @return {{"background-color": *}}
			 */
			background() {
				return {
					'background-color': this.hexToRGBA(this.activeColorHex, 0.85)
				}
			},
		},
		methods: {
			/**
			 * Функция перевода цвета из HEX в RGBA
			 * @param hex {string} - цвет в формате HEX
			 * @param alpha {number} - прозрачность
			 * @return {string} - цвет в формате RGBA
			 */
			hexToRGBA(hex, alpha) {
				var r = parseInt(hex.slice(1, 3), 16),
					g = parseInt(hex.slice(3, 5), 16),
					b = parseInt(hex.slice(5, 7), 16);

				return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
			},
			/**
			 * Изменение активного цвета
			 * @param event
			 */
			changeColor(event) {
				const target = event.target;
				this.edit_color = target.dataset.colorId;
			},
			/**
			 * Включение режима редактирование задачи
			 */
			editTask() {
				this.is_edit = true;
			},
			/**
			 * Выключение режима редактирование задачи
			 */
			handlerCloseEdit(event) {
				const this_settings = this.$el.querySelector('.item__edit');
				const target = event.target.closest('.item__edit');
				if (this_settings !== target) {
					this.is_edit = false;
					this.input_task_name = this.task.name;
					this.edit_color = this.task.color;
				}
			},
			/**
			 * Выставление статуса задачи
			 */
			taskDone() {
				this.$store.commit('taskDone', this.task_id);
			},
			/**
			 * Сохранение изменений
			 */
			save() {
				const task_name = this.input_task_name.trim();
				if (task_name === '') {
					this.validate_error = true;
				} else {
					this.$store.commit('editTask', {
						id: this.task_id,
						color_id: this.edit_color,
						name: this.input_task_name,
					});
					this.is_edit = false;
					this.edit_color = this.task.color;
				}
			}
		},
		mounted() {
			document.addEventListener('click', this.handlerCloseEdit);
		},
		beforeDestroy() {
			document.removeEventListener("click", this.handlerCloseEdit);
		}
	}
</script>

<style scoped lang="scss">
	.item {
		width: 100%;
		display: flex;
		border-radius: 4px;
		margin-bottom: 5px;

		&__checked {
			flex: 0 0 50px;
			position: relative;
			cursor: pointer;
			border-right: 1px solid #fff;

			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 13px;
				height: 13px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}

			&:before {
				border-radius: 3px;
				background-color: #F3F3F3;
			}

			&:after {
				opacity: 0;
				transition: opacity .2s ease-out;
				background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 4L4.5 8L9 1' stroke='black'/%3e%3c/svg%3e ");
				background-repeat: no-repeat;
				background-size: 70%;
				background-position: center;
			}

			&.active {
				&:after {
					opacity: 1;
					transition: opacity .05s ease-out;
				}
			}
		}

		&__edit {
			padding: 9px 19px 9px 10px;
			display: flex;
			width: 100%;
		}

		&__input {
			background-color: #fff;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			border-left: 1px solid #fff;
			border-top: 1px solid #fff;
			border-bottom: 1px solid #fff;
			border-right: none;
			padding: 8px 10px 9px 4px;
			flex: 0 1 100%;
			box-shadow: none;
			margin: 0;
			transition: border-color .2s ease-out;

			&_error {
				border-color: red;
				transition: border-color .2s ease-out;

				&::placeholder {
					color: #ff6b6b;
				}
			}
		}

		&__name {
			flex: 0 1 100%;
			padding: 20px 15px;
			color: #fff;
			cursor: pointer;
		}

		&__settings {
			background-color: #fff;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			border-right: 1px solid #fff;
			border-top: 1px solid #fff;
			border-bottom: 1px solid #fff;
			border-left: none;
			flex: 0 1 auto;
			display: flex;
			padding-right: 4px;
			align-items: center;
			transition: border-color .2s ease-out;

			&_error {
				border-color: red;
				transition: border-color .2s ease-out;
			}
		}

		&__colors {
			display: flex;
			margin-right: 10px;

			&-item {
				width: 16px;
				height: 16px;
				border: 1px solid transparent;
				border-radius: 2px;

				& + & {
					margin-left: 5px;
				}

				&.active {
					border-color: #4A4A4A;
				}
			}
		}

		&__save {
			background-color: #26a599;
			border-radius: 5px;
			padding: 5px 14px;
			color: #fff;
			border: none;
			transition: background-color .2s ease-out;

			&:hover {
				background-color: #26b9ad;
				transition: background-color .2s ease-out;
			}

			&:active {
				background-color: #269b8f;
				transition: background-color .2s ease-out;
			}
		}
	}
</style>