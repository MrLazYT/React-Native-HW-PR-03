import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MenuState {
    notifications: number;
}

const initialState: MenuState = {
    notifications: 0,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        plus: (state) => {
            state.notifications += 1;
        },
        minus: (state) => {
            if (state.notifications <= 0) return;
            state.notifications -= 1;
        },
    },
    selectors: {
        selectNotifications: (x) => x.notifications,
    },
});

export const { plus, minus } = menuSlice.actions;
export const { selectNotifications } = menuSlice.selectors;

export default menuSlice.reducer;
