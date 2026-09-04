import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';


const app = express();
const port: number = 3000;


// 設定
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
