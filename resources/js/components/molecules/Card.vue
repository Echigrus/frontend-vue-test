<template>
    <div class="card">
        <div class="row">
            <h3>{{ comment.name }} - {{ (new Date(comment.date)).toLocaleString("en-GB") }}</h3>
        </div>
        <div class="row">
            <p>{{ comment.text }}</p>
        </div>
        <div class="row justify-end">
            <div class="col">
                <Button text="Редактировать" :onClick="editComment" />
            </div>
            <div class="col">
                <Button class="danger" text="Удалить" :onClick="deleteComment" />
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "Card",
    props: {
        comment: Object,
        onEdit: Function
    },
    methods: {
        editComment: function () {
            this.$store.commit("setForEdit", this.$props.comment.id);
        },
        deleteComment: async function () {
            /// on loader
            this.$store.dispatch("removeComment", this.$props.comment.id).then(function () {
                /// off loader
            })
        }
    },
    components: {
        Button: () => import ("../atoms/Button.vue"),
    }
};
</script>