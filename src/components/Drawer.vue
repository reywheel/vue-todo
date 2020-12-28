<template>
	<el-drawer
		:with-header="false"
		:visible.sync="isOpen"
		direction="ltr"
		:before-close="closeHandler"
		size="20%"
	>
		<span>Hi, there!</span>
	</el-drawer>
</template>

<script>
export default {
	name: 'Drawer',
	props: {
		isOpen: {
			required: true,
			type: Boolean,
		},
	},
	methods: {
		closeHandler() {
			this.$emit('close')
		},
	},
}
</script>

<style scoped></style>
