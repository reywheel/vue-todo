<template>
	<el-row class="menu el-menu el-menu--horizontal">
		<el-button
			icon="el-icon-s-fold"
			circle
			@click.prevent="clickHandler"
		></el-button>
		<ul class="menu__list">
			<router-link
				tag="li"
				class="el-menu-item"
				active-class="is-active"
				:to="{ name: 'login' }"
			>
				Войти
			</router-link>
			<router-link
				tag="li"
				class="el-menu-item"
				active-class="is-active"
				:to="{ name: 'register' }"
			>
				Зарегистрироваться
			</router-link>
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
