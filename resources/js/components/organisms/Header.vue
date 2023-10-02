<template>
    <header>
        <div class="row space-between">
            <div class="col">
                <div class="row">
                    <div class="col header-text">
                        CRUD комментариев
                    </div>
                    <div class="col">
                        <Loader v-if="this.$store.state.isLoading" />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <div class="header-text">
                            Всего комментариев: {{ commentsTotal }}
                        </div>
                    </div>
                    <div class="col">
                        <Button class="compact" disabled="this.$store.state.isLoading" text="Обновить" :onClick="loadComments" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    name: "Header",
    components: {
        Button: () => import ("../atoms/Button.vue"),
        Loader: () => import ("../atoms/Loader.vue"),
    },
    computed: {
        commentsTotal () {
            return this.$store.state.comments.length
        }
    },
    methods: {
        loadComments: async function () {
            if(this.$store.state.isLoading) return;
            await this.$store.dispatch("loadComments");
        }
    }
};
</script>