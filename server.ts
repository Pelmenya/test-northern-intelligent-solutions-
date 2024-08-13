import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.SERVER_GQL_ENDPOINT|| '/graphql';

const token = process.env.REACT_APP_GITHUB_TOKEN;

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  credentials: 'include'
});

const app = express();
const PORT = process.env.PORT || 5000;

// body-parser
app.use(express.json());
// query-parser
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Проксирование запросов на /graphql к API GitHub
app.post('/graphql', async (req: Request, res: Response, next:NextFunction) => {
    const { query, variables } = req.body;
    const response = await client.request(query, variables);
    res.json({ data: response});
})

// Обслуживание статических файлов из директории build
app.use(express.static(path.join(__dirname, 'build')));

// Обслуживание index.html для всех остальных запросов
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
