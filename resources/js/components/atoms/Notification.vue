<template>
    <div class="notification">
        <div class="row">
            <div class="col">
                <img v-if="message.type == 'success'" src="../../../assets/success.webp" type="image/webp" />
                <img v-else-if="message.type == 'warning'" src="../../../assets/warning.webp" type="image/webp" />
                <img v-else-if="message.type == 'error'" src="../../../assets/error.webp" type="image/webp" />
            </div>
            <div class="col">
                <span>{{ message.text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: {
        message: Object
    },
    mounted: function () {
        const removeTimer = setTimeout(() => {
            this.$store.commit("removeMessage", this.message.id);
        }, this.message.duration * 1000);
        return () => {
            clearTimeout(removeTimer);
        }
    }
};
</script>