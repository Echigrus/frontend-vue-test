<template>
    <section class="col">
        <NotificationStack />
        <Header />
        <div class="styled-col">
            <CommentsList v-bind:comments="this.$store.state.comments"/>
            <CommentForm />
        </div>
        <Footer />
    </section>
</template>

<script>
export default {
    name: "CommentsPage",
    components: {
        Header: () => import ("../organisms/Header.vue"),
        NotificationStack: () => import ("../molecules/NotificationStack.vue"),
        CommentsList: () => import ("../organisms/CommentList.vue"),
        CommentForm: () => import ("../organisms/CommentForm.vue"),
        Footer: () => import ("../organisms/Footer.vue"),
    },
    computed: {
        comments () {
            return this.$store.state.comments
        }
    },
    mounted: async function () {
        /// on loader
        await this.$store.dispatch("loadComments");
        /// off loader
    }
};
</script>