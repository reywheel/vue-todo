<template>
	<el-drawer
		:with-header="false"
		:visible.sync="isOpen"
		direction="ltr"
		:before-close="closeHandler"
		size="20%"
	>
		<template v-if="isLoading">
			<AppLoader />
		</template>
		<template v-else>
			<li v-if="isEmpty" class="el-menu-item">Нет проектов</li>
			<el-menu v-else>
				<div @click="closeHandler">
					<router-link
						tag="li"
						v-for="project of projects"
						:to="{ name: 'project', params: { id: project.id } }"
						class="el-menu-item"
						active-class="is-active"
					>
						<i class="el-icon-more"></i>
						<span>{{ project.title }}</span>
					</router-link>
				</div>
			</el-menu>
		</template>
	</el-drawer>
</template>

<script>
import { getterTypes } from '@/store/projects'
import { mapGetters } from 'vuex'
import AppLoader from '@/components/Loader'

export default {
	name: 'Drawer',
	components: {
		AppLoader,
	},
	props: {
		isOpen: {
			required: true,
			type: Boolean,
		},
	},
	computed: {
		...mapGetters({
			projects: getterTypes.data,
			isLoading: getterTypes.isLoading,
			isEmpty: getterTypes.isEmpty,
		}),
	},
	methods: {
		closeHandler() {
			console.log('close')
			this.$emit('close')
		},
	},
}
</script>

<style scoped></style>
