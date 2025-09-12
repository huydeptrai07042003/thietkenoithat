import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

// Custom hook cho dispatch có type chính xác
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook cho selector có type chính xác
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
