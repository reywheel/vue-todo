<template>
	<el-row>
		<el-col :offset="9" :md="6" class="col">
			<el-card class="box-card card">
				<div slot="header" class="clearfix card__header">
					<h3>Создать задачу</h3>
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
					<el-button
						type="success"
						native-type="submit"
						:loading="isSubmitting"
					>
						Создать
					</el-button>
					<el-button type="info" plain @click="redirectToProject"
						>Отмена</el-button
					>
				</form>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import dateHelper from '@/helpers/date'
import {
	actionTypes as taskActionTypes,
	getterTypes as taskGetterTypes,
} from '@/store/task'
import { mapGetters } from 'vuex'

export default {
	name: 'CreateTask',
	data() {
		return {
			title: '',
			description: '',
			deadline: '',
		}
	},
	computed: {
		...mapGetters({
			isSubmitting: taskGetterTypes.isSubmitting,
		}),
		taskData() {
			return {
				title: this.title,
				description: this.description,
				deadline: this.deadline
					? dateHelper.convertToDatetime(this.deadline)
					: '',
				project_id: this.$route.params.projectId,
			}
		},
	},
	methods: {
		onSubmit() {
			this.$store
				.dispatch(taskActionTypes.createTask, this.taskData)
				.then((newTask) => {
					this.$message({
						message: 'Задача успешно создана',
						type: 'success',
					})
					this.$router.push({ name: 'task', params: { taskId: newTask.id } })
				})
		},
		redirectToProject() {
			this.$router.push({
				name: 'project',
				params: { projectId: this.$route.params.projectId },
			})
		},
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
</style>
