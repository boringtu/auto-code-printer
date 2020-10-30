<template lang="pug">
#app
	code-printer
</template>

<script>
import CodePrinter from './components/CodePrinter'

export default {
	name: 'App',
	components: {
		CodePrinter
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
