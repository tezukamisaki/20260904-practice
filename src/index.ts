import express, { Request, Response } from 'express';
import path from 'path';
import todoRoutes from './routes/todoRoutes';

const app = express();
const port: number = 3000;

// 設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --------------------------------------------------
// ルーティング
// --------------------------------------------------

// /todos パス配下にルーティングを登録
app.use('/todos', todoRoutes);

// ルートパスへのアクセスを /todos にリダイレクト
app.get('/', (req: Request, res: Response): void => {
    res.redirect('/todos');
});

// --------------------------------------------------
// サーバー起動
// --------------------------------------------------

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
});