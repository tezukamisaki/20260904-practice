import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';


const app = express();
const port: number = 3000;


// 設定
// 設定
app.use(express.json()); // JSON形式のリクエストを受け取る
app.use(express.urlencoded({ extended: true })); // POST通信設定
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの指定
app.set('view engine', 'ejs'); // テンプレートエンジンにEJSを設定
app.set('views', path.join(__dirname, 'views')); // ビューのディレクトリを設定



app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});


app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});

// 動作確認用ルート
app.get('/', (req: Request, res: Response) => {
    res.send('TypeScript TODO App Server is Running');
});

// ルーティング登録 (/todos パス配下に集約)
// products 以下の ルーターをインポート
import todoRoutes from './routes/todoRoutes';
app.use('/todos', todoRoutes);


// ルートパスへのアクセスを /todos にリダイレクト
app.get('/', (req: Request, res: Response) => {
    res.redirect('/todos');
});
