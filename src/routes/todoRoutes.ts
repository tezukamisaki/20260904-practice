import { Router, Request, Response } from 'express';
import * as TodoModel from '../models/TodoModel';
import { TodoListViewData } from '../types';


const router = Router();


// --------------------------------------------------
// Web画面ルート (EJSレンダリング)
// --------------------------------------------------


// GET /todos - TODO一覧画面を表示
router.get('/', async (req: Request, res: Response) => {
    try {
        const todos = await TodoModel.findAll();
        const viewData: TodoListViewData = { todos };
        res.render('index', viewData);
    } catch (error) {
        res.status(500).send('サーバーエラーが発生しました。');
    }
});


// --------------------------------------------------
// APIエンドポイント (JSONレスポンス)
// --------------------------------------------------


// POST /todos/api - 新規TODO作成
router.post('/api', async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== 'string' || title.trim() === '') {
            res.status(400).json({ message: 'タイトルを入力してください。' });
            return;
        }


        const newTodo = await TodoModel.create({ title: title.trim() });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'TODOの作成に失敗しました。' });
    }
});


// PUT /todos/api/:id - TODOの更新 (完了フラグ切り替え・タイトル編集)
router.put('/api/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: '不正なIDです。' });
            return;
        }


        const { title, completed } = req.body;
        const updatedTodo = await TodoModel.update(id, { title, completed });


        if (!updatedTodo) {
            res.status(404).json({ message: '対象のTODOが見つかりません。' });
            return;
        }


        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'TODOの更新に失敗しました。' });
    }
});


// DELETE /todos/api/:id - TODOの削除
router.delete('/api/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: '不正なIDです。' });
            return;
        }


        const success = await TodoModel.remove(id);
        if (success) {
            res.status(200).json({ message: 'TODOを削除しました。' });
        } else {
            res.status(404).json({ message: '対象のTODOが見つかりません。' });
        }
    } catch (error) {
        res.status(500).json({ message: 'TODOの削除に失敗しました。' });
    }
});


export default router;
