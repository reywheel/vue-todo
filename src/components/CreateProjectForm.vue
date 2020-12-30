<template>
	<el-card class="box-card" shadow="never">
		<form action="#" @submit.prevent="onSubmit">
			<el-input placeholder="Название" v-model="title" class="input"></el-input>
			<el-button
				type="success"
				native-type="submit"
				size="small"
				:loading="isSubmitting"
			>
				Создать
			</el-button>
		</form>
	</el-card>
</template>

<script>
import {
	actionTypes as projectActionTypes,
	getterTypes as projectGetterTypes,
} from '@/store/project'
import { actionTypes as projectsActionTypes } from '@/store/projects'
import { mapGetters } from 'vuex'

export default {
	name: 'CreateProjectForm',
	data() {
		return {
			title: '',
		}
	},
	computed: {
		...mapGetters({
			isSubmitting: projectGetterTypes.isSubmitting,
		}),
	},
	methods: {
		onSubmit() {
			this.$store
				.dispatch(projectActionTypes.createProject, { title: this.title })
				.then((newProject) => {
					this.$emit('onSubmit')
					this.$message({
						message: 'Проект успешно создан',
						type: 'success',
					})
					this.$emit('projectCreated', newProject)
				})
		},
	},
}
</script>

<style scoped lang="scss">
.input {
	margin-bottom: 10px;
}
</style>
