# Тестовое задание

    ООО «Северные интеллектуальные решения»

## Тестовая задача для собеседований на позицию Web-разработчика (React)

    Необходимо реализовать Web-приложение для поиска репозиториев GitHub с помощью
    GitHub REST API или GitHub GraphQL API (последний будет плюсом).
    Результаты поиска представить в виде таблицы со следующими столбцами: название,
    язык, число форков, число звёзд, дата обновления.
    По выбору строки должны отображаться детали. В деталях выбранного репозитория
    необходимо отобразить: название, описание, лицензию.
    Должна быть реализована пагинация и сортировка с возможностью выбора направления
    по следующим столбцам: число звёзд, число форков, дата обновления.

## [Ссылка на макет Figma](https://www.figma.com/file/XtOoRhJBLDywBS7Or21FNJ/Тестовое-задание?node-id=0%3A1&t=tVv06SEXTQ5RpdiA-1)

    Примечания к реализации:
    В качестве языка программирования использовать TypeScript. Для стилизации
    использовать Sass. Рекомендуется использовать CSS Modules.
    Следует использовать библиотеку компонентов MUI.
    Для загрузки данных из API использовать Redux Toolkit.
    Обязательно покрыть комментариями все публичные типы, свойства и функции.
    Результат разместить в репозитории на GitHub, прислать ссылку на репозиторий.

## Для запуска приложения:
    Создать в корне проект .env файл с вашим GITHUB_TOKEN
    Пример файла в .env-example
    
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
