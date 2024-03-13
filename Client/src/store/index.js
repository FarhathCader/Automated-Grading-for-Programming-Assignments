import {configureStore, createSlice} from '@reduxjs/toolkit';


const initialState = {
  isLoggedin: localStorage.getItem('isLoggedin') === 'true',
  userType: localStorage.getItem('userType') || null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login(state, action) {
        state.isLoggedin = true;
        state.userType = action.payload.userType; // Store user type in Redux state
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('userType', `${action.payload.userType}`); // Store user type in local storage
    },
    logout(state) {
        state.isLoggedin = false;
        state.userType = null;
        localStorage.setItem('isLoggedin', 'false');
        localStorage.removeItem('userType'); // Remove user type from local storage on logout
    }
    },
});

export const authActions = authSlice.actions;

export const store  = configureStore({
    reducer: authSlice.reducer
    });


