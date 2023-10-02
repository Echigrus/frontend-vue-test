<template>
    <div class="comments-list">
        <div class="row comments-list-controls full-width space-between">
            <div class="col">
                Комментарии
            </div>
            <div class="col">
                <Select title="Сортировка" v-bind:options="sortOptions" defaultValue="id" :onChange="sortChange" />
            </div>
            <div class="col">
                <Select title="Направление" v-bind:options="sortDirectionOptions" defaultValue="desc" :onChange="sortDirectionChange" />
            </div>
        </div>
        <div class="comment-item" v-for="comment in shownComments" :key="comment.id">
            <Card :comment="comment"/>
        </div>
        <div class="row comments-list-pagination full-width justify-center">
            <div class="col">
                <Pagination v-bind:itemCount="comments.length" v-bind:perPage="3" :onChange="onPageChange"/>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "CommentsList",
    props: {
        comments: Array
    },
    data: () => {
        return {
            sortOptions: [
                { value: "id", label: "По ID" },
                { value: "date", label: "По дате" }
            ],
            sortBy: "id",
            sortDirectionOptions: [
                { value: "asc", label: "По возр." },
                { value: "desc", label: "По убыв."}
            ],
            sortDirection: "desc",
            currentPage: 1
        }
    },
    components: {
        Card: () => import ("../molecules/Card.vue"),
        Select: () => import ("../atoms/inputs/Select.vue"),
        Pagination: () => import ("../atoms/inputs/Pagination.vue"),
    },
    computed: {
        shownComments () {
            return this.comments.sort((a, b) => {
                if(this.sortDirection == "asc"){
                    if(this.sortBy == "id"){
                        return a.id - b.id;
                    }
                    else {
                        return (new Date(a.date)).getTime() - (new Date(b.date));
                    }
                }
                else {
                    if(this.sortBy == "id"){
                        return b.id - a.id;
                    }
                    else {
                        return (new Date(b.date)).getTime() - (new Date(a.date));
                    }
                }
            }).slice((this.currentPage - 1) * 3, (this.currentPage - 1) * 3 + 3);
        }
    },
    methods: {
        sortChange: function (event) {
            this.$data.sortBy = event.target.value;
        },
        sortDirectionChange: function (event) {
            this.$data.sortDirection = event.target.value;
        },
        onPageChange: function (value) {
            this.$data.currentPage = value;
        }
    }
};
</script>