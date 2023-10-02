<template>
    <div class="base-button" @click="onClick">
        <a>{{ text }}</a>
    </div>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        text: String,
        onClick: Function
    }
};
</script>