import { AppDispatch, RootState } from "./store";

// Use a custom hook to resolve the type of the dispatch function
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { AppDispatch, RootState };

export * as userActions from "./features/user/userSlice";
export * as chatActions from "./features/chat/chatSlice";
