import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerData {
    credits: number;
    activeGame: string | null;
}

interface ActiveUsersState {
    users: Record<string, PlayerData>;
}

const initialState: ActiveUsersState = {
    users: {}
}

const activeUsersSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<{ username: string, playerData: PlayerData }>) {
            const { username, playerData } = action.payload;
            state.users[username] = playerData;
        },
        updateUser(state, action: PayloadAction<{ username: string, activeGame: string | null }>) {
            const { username, activeGame } = action.payload;
            if (state.users[username]) {
                state.users[username].activeGame = activeGame;
            }
        },
        removeUser(state, action: PayloadAction<{ username: string }>) {
            delete state.users[action.payload.username];
        },
    },
});


export const { addUser, updateUser, removeUser } = activeUsersSlice.actions;
export default activeUsersSlice.reducer;