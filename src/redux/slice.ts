
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CharacterState {
    firstCharacter: CharacterType | null;
    secondCharacter: CharacterType | null;
}

const initialState: CharacterState = {
    firstCharacter: null,
    secondCharacter: null,
};

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setFirstCharacter(state, action: PayloadAction<any>) {
            state.firstCharacter = action.payload;
        },
        setSecondCharacter(state, action: PayloadAction<any>) {
            state.secondCharacter = action.payload;
        },
        removeFirstCharacter(state) {
            state.firstCharacter = null;
        },
        removeSecondCharacter(state) {
            state.secondCharacter = null;
        },
    },
});

export const { setFirstCharacter, setSecondCharacter, removeFirstCharacter, removeSecondCharacter } = characterSlice.actions;
export default characterSlice.reducer;
