<template>
	<div class="new" :class="{'new_error': validate_error}">
		<input type="text"
					 class="new__input"
					 placeholder="Task name"
					 v-model="task_name" @focus="validate_error = false">
		<div class="new__settings">
			<div class="new__colors">
				<div v-for="(color, color_id) in colors"
						 :key="color_id"
						 class="new__colors-item"
						 :class="{'active': color_id === color_active}"
						 :data-color-id="color_id"
						 :style="{'background-color': color}"
						 @click="changeColor"></div>
			</div>
			<button class="new__add" @click="addItem">Add</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TaskListNew",
		data() {
			return {
				task_name: '',
				colors: this.$store.state.colors,
				color_active: 'red',
				validate_error: false,
			}
		},
		methods: {
			/**
			 * Изменение цвета
			 * @param event
			 */
			changeColor(event) {
				const target = event.target;
				this.color_active = target.dataset.colorId;
			},
			/**
			 * Добавление задачи
			 */
			addItem() {
				const name = this.task_name.trim();
				if (name === '') {
					this.validate_error = true;
				} else {
					this.$store.commit('newTask', {
						name: name,
						color_id: this.color_active,
					});
					this.task_name = '';
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.new {
		width: 100%;
		display: flex;
		border-radius: 4px;
		margin-top: 5px;
		padding: 7px 5px 7px 10px;
		background-color: #fff;
		border: 1px solid #DCDCDC;
		transition: border-color .2s ease-out;

		&_error {
			transition: border-color .2s ease-out;
			border-color: #ff4343;
		}

		&__input {
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			padding: 9px 10px 10px 5px;
			flex: 0 1 100%;
			border: none;
			box-shadow: none;
			margin: 0;

			.new_error &{
				&::placeholder{
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
			flex: 0 1 auto;
			display: flex;
			padding-right: 5px;
			align-items: center;
		}

		&__colors {
			display: flex;
			margin-right: 10px;

			&-item {
				width: 16px;
				height: 16px;
				border: 1px solid transparent;
				border-radius: 2px;
				cursor: pointer;

				& + & {
					margin-left: 5px;
				}

				&.active {
					border-color: #4A4A4A;
				}
			}
		}

		&__add {
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