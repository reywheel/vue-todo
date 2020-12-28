<template>
	<span>{{ id }}</span>
</template>

<script>
export default {
	name: 'Project',
	props: {
		id: {
			required: true,
			type: [Number, String],
		},
	},
}
</script>

<style scoped></style>
