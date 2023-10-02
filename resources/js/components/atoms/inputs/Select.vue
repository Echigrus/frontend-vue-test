<template>
    <div class="row select-wrap">
        <div class="col">
            <span>{{ title }}:</span>
        </div>
        <div class="col">
            <select class="base-select" v-bind:value="defaultValue" @change="onChange">
                <option v-for="option in options" :key="option.value" v-bind:value="option.value">{{ option.label }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: "Select",
    props: {
        title: String,
        options: Array,
        defaultValue: String,
        onChange: Function
    },
};
</script>