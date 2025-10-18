import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice'
import themeRecucer from '../store/themeSlice'
import appReducer from '../store/appSlice'
import notifyReducer from '../store/notifySlice'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeRecucer,
    app: appReducer,
    notify: notifyReducer,
  },
  // ปิด serializableCheck middleware เนื่องจาก React Flow ใช้ข้อมูลที่ไม่ใช่ serializable
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;