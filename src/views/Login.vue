<template>
	<el-row>
		<el-col :offset="9" :md="6" class="col">
			<el-card class="box-card card">
				<div slot="header" class="clearfix card__header">
					<h3>Вход</h3>
				</div>
				<form action="#" @submit.prevent="submitHandler">
					<el-input
						placeholder="Email"
						class="input"
						v-model="email"
					></el-input>
					<el-input
						placeholder="Пароль"
						class="input"
						v-model="password"
					></el-input>
					<el-button type="success" native-type="submit">Войти</el-button>
				</form>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		submitHandler() {
			console.log('submit')
		},
	},
}
</script>

<style scoped lang="scss">
.col {
	min-height: calc(100vh - 100px);
	display: flex;
	align-items: center;
}

.card {
	width: 100%;
}

.card__header {
	display: flex;
	justify-content: center;
}

.input {
	margin-bottom: 10px;
}
</style>
