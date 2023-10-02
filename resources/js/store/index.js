import Vue from 'vue';
import Vuex from 'vuex';
import { Api } from '../api/api';
import { GlobalConstants } from '../constants/global';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        comments: [],
        messages: [],
        editingCommentId: -1,
        isLoading: false
    },
    mutations: {
        addMessage (state, message) {
            let tmsg = message;
            if(tmsg.duration == null || tmsg.duration <= 0) tmsg.duration = GlobalConstants.DefaultMessageDuration;
            state.messages = state.messages.concat({...tmsg, id: (new Date()).getTime()});
        },
        removeMessage (state, id) {
            state.messages = state.messages.filter(message => message.id !== id);
        },
        setComments (state, comments) {
            state.comments = comments;
        },
        setForEdit (state, id) {
            state.editingCommentId = id;
        },
        setIsLoading (state, value) {
            state.isLoading = value;
        }
    },
    getters: {
        commentById: state => (id) => {
            return state.comments.find(comment => comment.id === id);
        },
        messageById: state => (id) => {
            return state.messages.find(message => message.id === id);
        },
    },
    actions: {
        async loadComments({ commit }) {
            commit('setIsLoading', true);
            try {
                const api = new Api();
                const result = await api.getCommentList();
                commit('setComments', [...result]);
                commit('addMessage', { 
                    type: "success", 
                    text: "Комментарии загружены"
                });
            }
            catch (e) {
                commit('addMessage', { 
                    type: "error", 
                    text: "Не удалось загрузить комментарии"
                });
            }
            commit('setIsLoading', false);
        },
        async addComment({ commit }, comment){
            commit('setIsLoading', true);
            try {
                const api = new Api();
                await api.addComment(comment);
                const newCommentList = await api.getCommentList();
                commit('setComments', [...newCommentList]);
                commit('addMessage', { 
                    type: "success", 
                    text: "Комментарий добавлен"
                });
            }
            catch {
                commit('addMessage', { 
                    type: "error", 
                    text: "Не удалось добавить комментарий"
                });
            }
            commit('setIsLoading', false);
        },
        async editComment({ commit }, comment){
            commit('setIsLoading', true);
            try {
                const api = new Api();
                await api.editComment(comment);
                const newCommentList = await api.getCommentList();
                commit('setComments', [...newCommentList]);
                commit('setForEdit', -1);
                commit('addMessage', { 
                    type: "success", 
                    text: "Комментарий отредактирован"
                });
            }
            catch {
                commit('addMessage', { 
                    type: "error", 
                    text: "Не удалось отредактировать комментарий"
                });
            }
            commit('setIsLoading', false);
        },
        async removeComment({ commit }, id) {
            commit('setIsLoading', true);
            try {
                const api = new Api();
                if (this.state.editingCommentId == id) {
                    commit('setForEdit', -1);
                }
                await api.removeComment(id);
                const newCommentList = await api.getCommentList();
                commit('setComments', [...newCommentList]);
                commit('addMessage', { 
                    type: "success", 
                    text: "Комментарий удалён"
                });
            }
            catch {
                commit('addMessage', { 
                    type: "error", 
                    text: "Не удалось удалить комментарий"
                });
            }
            commit('setIsLoading', false);
        }
    },
});

export { store };