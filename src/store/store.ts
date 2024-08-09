import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './slices/githubSlice';
import logger from 'redux-logger';


const isDev = process.env.NODE_ENV !== 'production';
const middlewares = isDev && typeof window === 'object' ? [logger] : [];


export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ...middlewares, 
]),
devTools: true,

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

