// --- TODOデータ構造 ---
export type Todo = {
    id: number;
    title: string;
    completed: boolean;
};


// --- 新規登録時のリクエストボディ型 ---
export type CreateTodoRequestBody = {
    title: string;
};


// --- 更新時のリクエストボディ型 ---
export type UpdateTodoRequestBody = {
    title?: string;
    completed?: boolean;
};


// --- EJS Viewに渡すデータ型 ---
export type TodoListViewData = {
    todos: Todo[];
    message?: string;
};
