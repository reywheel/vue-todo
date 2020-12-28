<template>
	<el-row class="menu el-menu el-menu--horizontal">
		<el-button
			icon="el-icon-s-fold"
			circle
			@click.prevent="clickHandler"
		></el-button>
		<ul class="menu__list">
			<li class="el-menu-item">Войти</li>
			<li class="el-menu-item">Зарегистрироваться</li>
		</ul>
	</el-row>
</template>

<script>
export default {
	name: 'Header',
	methods: {
		clickHandler() {
			this.$emit('clickOpenButton')
		},
	},
}
</script>

<style scoped lang="scss">
.menu {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&::before,
	&::after {
		display: none;
	}
}

.menu__list {
	display: flex;
	align-items: center;
}
</style>
