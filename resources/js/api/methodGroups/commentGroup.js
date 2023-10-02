import { ApiBase } from "../apiBase";

class CommentGroup extends ApiBase {
    /**
     * Получение списка комментариев
     * @returns Список комментариев
     */
    async getCommentList() {
        return await this.get('/comments');
    }

    /**
     * Получение отдельного комментария
     * @param id ID комментария
     * @returns Комментарий
     */
    async getComment(id) {
        return await this.get(`/comments/${id}`);
    }

    /**
     * Добавление комментария
     * @param comment Объект комментария (id: -1)
     * @returns Комментарий
     */
    async addComment(comment) {
        return await this.post('/comments', { name: comment.name, text: comment.text, date: comment.date });
    }

    /**
     * Удаление отдельного комментария
     * @param id ID комментария
     * @returns Комментарий
     */
    async removeComment(id) {
        return await this.delete(`/comments/${id}`);
    }

    /**
     * Обновление комментария
     * @param comment Объект комментария
     * @returns Комментарий
     */
    async editComment(comment) {
        return await this.patch(`/comments/${comment.id}`, { name: comment.name, text: comment.text, date: comment.date });
    }
}

export { CommentGroup };