import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userName: string | null;
}

const initialState: AuthState = {
  token: null,
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userName: string }>) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userName = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

export const getAuthHeaders = (state: AuthState) => {
  let token = state.token;
  if (!token) return {};
  token = token.trim().replace(/(\r\n|\n|\r)/gm, "");
  return {
    Authorization: `Bearer ${token}`,
  };
};

