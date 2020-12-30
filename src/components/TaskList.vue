<template>
	<div>
		<template v-if="isLoading">
			<Loader />
		</template>
		<template v-else>
			<template v-if="!isEmpty">
				<div
					v-for="(task, index) of preparedTasks"
					class="card el-card el-card__body is-hover-shadow"
				>
					<div class="task__title task__item">{{ task.title }}</div>
					<div class="task__description task__item">{{ task.description }}</div>
					<div class="task__deadline task__item">{{ task.deadline }}</div>
					<div class="task__status task__item">
						<el-button
							:type="getButtonType(task.status)"
							circle
							size="small"
						></el-button>
					</div>
					<div class="task__actions task__item">
						<el-checkbox
							:value="task.is_done"
							@change="onDone(task.id, task.is_done)"
							class="task__checkbox"
						></el-checkbox>
						<el-button icon="el-icon-edit" circle></el-button>
					</div>
				</div>
			</template>
			<template v-else>Список пуст</template>
		</template>
	</div>
</template>

<script>
import { actionTypes, getterTypes } from '@/store/tasks'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'

export default {
	name: 'TaskList',
	components: { Loader },
	props: {
		projectId: {
			required: true,
			type: Number,
		},
		filter: {
			required: true,
			type: String,
		},
	},
	computed: {
		...mapGetters({
			tasks: getterTypes.data,
			isLoading: getterTypes.isLoading,
			isEmpty: getterTypes.isEmpty,
		}),
		preparedTasks() {
			let tasks = []
			for (let task of this.tasks) {
				tasks.push({ ...task })
			}

			return tasks.map((task, index) => {
				task.is_done = Boolean(task.is_done)
				task.status = this.getStatus(index)
				task.deadline = new Date(task.deadline).toLocaleDateString()
				return task
			})
		},
	},
	methods: {
		getStatus(taskIndex) {
			if (!this.isEmpty) {
				const task = this.tasks[taskIndex]
				if (task.is_done) return 'done'
				if (Date.now() > new Date(task.deadline)) {
					return 'overdue'
				} else {
					return 'inProgress'
				}
			}
		},
		getButtonType(status) {
			switch (status) {
				case 'done':
					return 'success'
				case 'inProgress':
					return 'warning'
				case 'overdue':
					return 'danger'
			}
		},
		onDone(taskId, isDone) {
			this.$store.dispatch(actionTypes.completeTask, {
				taskId,
				isDone,
			})
		},
	},
	mounted() {
		this.$store.dispatch(actionTypes.getTasks, { projectId: this.projectId })
	},
}
</script>

<style scoped lang="scss">
.card {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.task__item {
	width: 20%;
	text-align: center;
	margin: 0 10px;

	&:first-child {
		text-align: left;
		margin-left: 0;
	}

	&:last-child {
		text-align: right;
		margin-right: 0;
	}
}

.task__title,
.task__description {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.task__checkbox {
	margin-right: 25px;
}
</style>
