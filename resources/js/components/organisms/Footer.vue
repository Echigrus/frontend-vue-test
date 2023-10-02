<template>
    <footer>
        <div class="row full-width">
            <div class="col two-thirds-width">
                <div class="row">
                    Made by Echigrus 
                </div>
                <div class="row webp">
                    <img src="../../../assets/sticker.webp" type="image/webp" />
                </div>  
            </div>
            <div class="col one-third-width">
                <div class="row">
                    Использованные материалы:
                </div>
                <div v-for="(source, index) in sources" :key="index" class="row">
                    <Link :link="source" />
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name: "Footer",
    components: {
        Link: () => import("../atoms/Link.vue")
    },
    data: () => {
        return {
            sources: [
                { url: "https://ru.vuejs.org/v2/guide/", text: "Vue2 документация" },
                { url: "https://v3.vuex.vuejs.org/guide/", text: "VueX3 документация" },
                { url: "https://axios-http.com/docs/api_intro", text: "Axios справка" },
                { url: "https://atomicdesign.bradfrost.com/chapter-2/", text: "Atomic Design" },
                { url: "https://materialui.co/colors", text: "MatreialUI цвета" }
            ]
        }
    }
};
</script>