import * as fs from 'fs/promises';
import * as path from 'path';
import { Todo, CreateTodoRequestBody, UpdateTodoRequestBody } from '../types';


const TODO_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'todos.json');


// ヘルパー関数: JSONファイルからデータを読み込む
async function getTodosData(): Promise<Todo[]> {
    try {
        const data = await fs.readFile(TODO_FILE_PATH, 'utf8');
        if (!data || data.trim() === '') {
            return [];
        }
        return JSON.parse(data) as Todo[];
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log('TODOファイルが見つかりません。空の配列を返します。');
            return [];
        }
        throw error;
    }
}


// ヘルパー関数: JSONファイルにデータを書き込む
async function saveTodosData(todos: Todo[]): Promise<void> {
    const jsonString = JSON.stringify(todos, null, 2);
    await fs.writeFile(TODO_FILE_PATH, jsonString, 'utf8');
}


// ---------------------------
// CRUD操作
// ---------------------------


// 全件取得
export async function findAll(): Promise<Todo[]> {
    return getTodosData();
}


// ID指定取得
export async function findById(id: number): Promise<Todo | null> {
    const todos = await getTodosData();
    const todo = todos.find(t => t.id === id);
    return todo || null;
}


// 新規作成
export async function create(data: CreateTodoRequestBody): Promise<Todo> {
    const todos = await getTodosData();
    const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;


    const newTodo: Todo = {
        id: nextId,
        title: data.title,
        completed: false
    };


    todos.push(newTodo);
    await saveTodosData(todos);
    return newTodo;
}


// 更新 (ステータス変更・タイトル編集)
export async function update(id: number, data: UpdateTodoRequestBody): Promise<Todo | null> {
    const todos = await getTodosData();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;


    const updatedTodo: Todo = {
        ...todos[index],
        ...data
    };


    todos[index] = updatedTodo;
    await saveTodosData(todos);
    return updatedTodo;
}


// 削除
export async function remove(id: number): Promise<boolean> {
    const todos = await getTodosData();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;


    const filteredTodos = todos.filter(t => t.id !== id);
    await saveTodosData(filteredTodos);
    return true;
}
