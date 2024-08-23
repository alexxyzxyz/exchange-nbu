<template>
	<footer class="footer">
		<div class="footer__current-time">Сьогодні: {{ new Date().toDateString() }}</div>
	</footer>
</template>

<style lang="scss" scoped>
	.footer {
		background: $footer-bg;
		color: $white;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: end;
		align-items: center;
		font-size: 24px;

		&__current-time {
			margin-right: 30px;
		}
	}
</style>
