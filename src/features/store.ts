import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';

export const store = configureStore({
  reducer: {
    todoList: todoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
