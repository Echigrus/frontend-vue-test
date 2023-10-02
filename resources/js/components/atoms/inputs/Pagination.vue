<template>
    <div class="base-pagination row">
        <div class="col">
            <button :disabled="pageNumber === 1" @click="prevPage">
                &laquo;
            </button>
        </div>  
        <div class="col">
            {{ pageNumber }}/{{ Math.ceil(itemCount/3) }}
        </div>
        <div class="col">
            <button :disabled="pageNumber >= pageCount" @click="nextPage">
                &raquo;
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    data: () => {
        return {
            pageNumber: 1
        }
    },
    props: {
        itemCount: Number,
        perPage: Number,
        onChange: Function
    },
    computed: {
        pageCount () {
            return Math.ceil(this.itemCount / this.perPage);
        }
    },
    methods:{
        nextPage () {
            this.pageNumber++;
            this.$props.onChange(this.pageNumber);
        },
        prevPage () {
            this.pageNumber--;
            this.$props.onChange(this.pageNumber);
        }
    },
  
};
</script>