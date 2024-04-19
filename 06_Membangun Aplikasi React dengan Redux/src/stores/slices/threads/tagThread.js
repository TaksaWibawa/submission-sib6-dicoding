import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  selectedTag: '',
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => ({
      ...state,
      tags: action.payload,
    }),
    setSelectedTag: (state, action) => {
      const selectedTag = state.selectedTag === action.payload ? '' : action.payload;
      return {
        ...state,
        selectedTag,
      };
    },
    resetTags: (state) => ({
      ...state,
      tags: [],
      selectedTag: '',
    }),
  },
});

export const { setTags, setSelectedTag, resetTags } = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
export const tagsSelector = (state) => state.tags;
