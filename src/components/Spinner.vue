<template>
	<div class="spinner"></div>
</template>

<style lang="scss" scoped>
	.spinner {
		border: 8px solid $spinner-border;
		border-top: 8px solid $spinner-border-top;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		animation: spin 1s linear infinite;
        align-self: center;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
