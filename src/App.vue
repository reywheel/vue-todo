<template>
	<el-container>
		<el-header>
			<AppHeader @clickOpenButton="toggleDrawer" />
		</el-header>
		<el-main>
			<router-view />
		</el-main>
		<AppDrawer :isOpen="drawerIsOpen" @close="toggleDrawer" />
	</el-container>
</template>

<script>
import AppHeader from '@/components/Header'
import AppDrawer from '@/components/Drawer'

export default {
	components: {
		AppHeader,
		AppDrawer,
	},
	data() {
		return {
			drawerIsOpen: false,
		}
	},
	methods: {
		toggleDrawer() {
			this.drawerIsOpen = !this.drawerIsOpen
		},
	},
}
</script>

<style lang="scss">
html,
body {
	ul {
		margin: 0;
		bottom: 0;
	}
}
</style>
