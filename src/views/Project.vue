<template>
	<div>
		<template v-if="isLoading">
			<Loader />
		</template>
		<template v-else>
			<template v-if="!isEmpty">
				<div class="project__header">
					<div class="project__header-left">
						<div class="project__name">
							<h3>Проект: {{ project.title }}</h3>
						</div>
						<el-button type="danger" plain size="small"
							>Удалить проект
						</el-button>
					</div>
					<div class="project__header-right">
						<el-select v-model="value" placeholder="Select">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</div>
				</div>
				<TaskList :filter="value" />
			</template>
			<template v-else> произошла ошибка</template>
		</template>
	</div>
</template>

<script>
import { getterTypes, actionTypes } from '@/store/project'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import TaskList from '@/components/TaskList'

export default {
	name: 'Project',
	components: { TaskList, Loader },
	props: {
		id: {
			required: true,
			type: Number,
		},
	},
	data() {
		return {
			options: [
				{
					value: 'all',
					label: 'Все',
				},
				{
					value: 'Option2',
					label: 'В работе',
				},
				{
					value: 'Option3',
					label: 'Выполненные',
				},
				{
					value: 'Option4',
					label: 'Просроченные',
				},
			],
			value: 'all',
		}
	},
	computed: {
		...mapGetters({
			project: getterTypes.data,
			isEmpty: getterTypes.isEmpty,
			isLoading: getterTypes.isLoading,
		}),
	},
	methods: {
		getProject() {
			this.$store.dispatch(actionTypes.getProject, { projectId: this.id })
		},
	},
	watch: {
		id(newValue, oldValue) {
			this.getProject()
		},
	},
	mounted() {
		this.getProject()
	},
}
</script>

<style scoped lang="scss">
.project__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}

.project__header-left {
	display: flex;
	align-items: center;
}

.project__name {
	margin-right: 30px;
}
</style>
