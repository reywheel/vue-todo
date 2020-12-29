<template></template>

<script>
import {
	getterTypes as projectsGetterTypes,
	actionTypes as projectsActionTypes,
} from '@/store/projects'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: {},
	computed: {
		...mapGetters({
			projectsIsEmpty: projectsGetterTypes.isEmpty,
		}),
	},
	mounted() {
		if (this.projectsIsEmpty)
			this.$store.dispatch(projectsActionTypes.getProjects)
	},
}
</script>
