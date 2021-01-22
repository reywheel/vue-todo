<template></template>

<script>
import { mapGetters } from 'vuex'
import {
	getterTypes as alertsGetterTypes,
	actionTypes as alertsActionTypes,
} from '@/store/alerts'

export default {
	name: 'Alert',
	computed: {
		...mapGetters({
			alerts: alertsGetterTypes.all,
			isEmpty: alertsGetterTypes.isEmpty,
		}),
	},
	watch: {
		isEmpty(newValue, oldValue) {
			if (!newValue) {
				this.$message({
					message: this.alerts[0].text,
					type: this.alerts[0].type,
					duration: 2000,
					showClose: true,
				})
				this.$store.dispatch(alertsActionTypes.clearAlerts)
			}
		},
	},
}
</script>

<style scoped></style>
