<template>
	<div>
		<template v-if="isLoading">
			<Loader />
		</template>
		<template v-else>
			<el-row v-if="!isEmpty">
				<el-col :offset="8" :md="8" class="col">
					<el-card class="box-card card">
						<div slot="header" class="clearfix card__header">
							<h3>Редактировать задачу</h3>
						</div>
						<form action="#" @submit.prevent="onSubmit">
							<el-input placeholder="Название" class="input" v-model="title" />
							<el-input
								type="textarea"
								:rows="2"
								placeholder="Описание"
								v-model="description"
								class="input"
							/>
							<el-date-picker
								v-model="deadline"
								type="date"
								placeholder="Дедлайн"
								class="input"
							/>
							<div class="buttons">
								<el-button
									type="success"
									native-type="submit"
									:loading="isSubmitting"
								>
									Изменить
								</el-button>
								<el-button type="info" plain @click="redirectToProject"
									>Отмена
								</el-button>
								<el-button
									type="danger"
									plain
									@click="deleteTask"
									class="button--delete"
									:loading="isSubmitting"
									>Удалить
								</el-button>
							</div>
						</form>
					</el-card>
				</el-col>
			</el-row>
			<p v-else>Ошибка загрузки</p>
		</template>
	</div>
</template>

<script>
import dateHelper from '@/helpers/date'
import {
	getterTypes as taskGetterTypes,
	actionTypes as taskActionTypes,
} from '@/store/task'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'

export default {
	name: 'EditTask',
	components: { Loader },
	props: {
		projectId: {
			required: true,
			type: Number,
		},
		taskId: {
			required: true,
			type: Number,
		},
	},
	data() {
		return {
			title: '',
			description: '',
			deadline: '',
		}
	},
	computed: {
		...mapGetters({
			task: taskGetterTypes.data,
			isLoading: taskGetterTypes.isLoading,
			isSubmitting: taskGetterTypes.isSubmitting,
			isEmpty: taskGetterTypes.isEmpty,
		}),
		taskData() {
			return {
				title: this.title,
				description: this.description,
				deadline: dateHelper.convertToDatetime(new Date(this.deadline)),
			}
		},
	},
	methods: {
		redirectToProject() {
			this.$router.push({
				name: 'project',
				params: { projectId: this.projectId },
			})
		},
		onSubmit() {
			this.$store
				.dispatch(taskActionTypes.editTask, {
					taskId: this.taskId,
					taskData: this.taskData,
				})
				.then(() => {
					this.$message({
						message: 'Задача успешно изменена',
						type: 'success',
					})
					this.$router.push({
						name: 'project',
						params: { projectId: this.projectId },
					})
				})
		},
		deleteTask() {
			this.$store
				.dispatch(taskActionTypes.deleteTask, { taskId: this.taskId })
				.then(() => {
					this.$message({
						message: 'Задача успешно удалена',
						type: 'success',
					})
					this.$router.push({
						name: 'project',
						params: { projectId: this.projectId },
					})
				})
		},
	},
	mounted() {
		this.$store
			.dispatch(taskActionTypes.getTask, { taskId: this.taskId })
			.then(() => {
				this.title = this.task.title
				this.description = this.task.description
				this.deadline = this.task.deadline
			})
	},
}
</script>

<style scoped lang="scss">
.col {
	min-height: calc(100vh - 100px);
	display: flex;
	align-items: center;
}

.card {
	width: 100%;
}

.card__header {
	display: flex;
	justify-content: center;
}

.input {
	margin-bottom: 10px;
	width: 100%;
}

.buttons {
	display: flex;
	align-items: center;
}

.button--delete {
	margin-left: auto;
}
</style>
