<template>
	<div class="notification-stack">
        <div class="notification-item" v-for="message in this.$store.state.messages" v-bind:key="message.id">
            <Notification :message="message" />
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationStack",
    components: {
        Notification: () => import ("../atoms/Notification.vue")
    }
};
</script>