<template>
    <div class="comment-form col">
        <div class="row">
            <div class="col half-width">
                <div class="row">
                    <label>Ваше имя/никнейм:</label>
                </div>
                <div class="row">
                    <input class="form-input" minlength="3" maxlength="32" placeholder="Вася Пупкин" required type="text" v-model="name" />
                </div>
            </div>
            <div class="col half-width">
                <div class="row">
                    <label>Дата:</label>
                </div>
                <div class="row">
                    <date-picker v-model="date" type="datetime" :lang="lang" :shortcuts="shortcuts"></date-picker>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col full-width">
                <div class="row">
                    <label>Комментарий:</label>
                </div>
                <div class="row">
                    <textarea class="form-textarea" minlength="3" maxlength="320" placeholder="Третьего дня пошёл я в лес за грибами..." required rows="5" v-model="text" />
                </div>
            </div>
        </div>
        <div class="row">
            <Button v-bind:text="addButtonText" :onClick="addComment" />
            <Button v-if="this.$store.state.editingCommentId != -1" text="Отменить" :onClick="stopEditing" />
        </div>
    </div>
</template>
  
<script>
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import { mapState } from 'vuex';
export default {
    name: "CommentForm",
    data: () => {
        return {
            name: "",
            date: new Date(),
            text: "",
            addButtonText: "Добавить",
            shortcuts: [
                {
                    text: 'Сегодня',
                    onClick: () => {
                        data.date = new Date()
                    }
                }
            ],
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1,
                },
            }
        }
    },
    components: {
        Button: () => import ("../atoms/Button.vue"),
        DatePicker: () => import ("vue2-datepicker")
    },
    computed: mapState(['editingCommentId']),
    watch: {
        editingCommentId: function (val) {
            if (val != -1) {
                const commentOnEdit = this.$store.getters.commentById(val);
                this.$data.name = commentOnEdit.name;
                this.$data.date = new Date(commentOnEdit.date);
                this.$data.text = commentOnEdit.text;
                this.$data.addButtonText = "Сохранить";
            }
        }
    },
    methods: {
        addComment: async function () {
            if(this.$data.name.trim().length < 3){
                this.$store.commit("addMessage", {
                    type: "warning", 
                    text: "Введите имя/никнейм"
                });
                return;
            }
            if(this.$data.date == null || this.$data.date == ""){
                this.$store.commit("addMessage", {
                    type: "warning", 
                    text: "Введите дату"
                });
                return;
            }
            if(this.$data.text.trim().length < 3){
                this.$store.commit("addMessage", {
                    type: "warning", 
                    text: "Введите комментарий"
                });
                return;
            }
            /// on loader
            if(this.$store.state.editingCommentId == -1) {
                await this.$store.dispatch("addComment", { id: -1, name: this.$data.name, date: this.$data.date.toLocaleString("en-GB"), text: this.$data.text });
            }
            else {
                await this.$store.dispatch("editComment", { id: this.$store.state.editingCommentId, name: this.$data.name, date: this.$data.date.toLocaleString("en-GB"), text: this.$data.text });
            }
            this.clearInputs();
            /// off loader
        },
        stopEditing: function () {
            this.$store.commit("setForEdit", -1);
            this.clearInputs();
        },
        clearInputs: function () {
            this.$data.name = "";
            this.$data.date = new Date();
            this.$data.text = "";
            this.$data.addButtonText = "Добавить";
        }
    }
};
</script>