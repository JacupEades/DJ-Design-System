import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	hydrating: true,

	refetch: false,
	listData: null,
};

export const listSlice = createSlice({
	name: "listState",
	initialState,
	reducers: {
		compHydrated: (state) => {
			state.hydrating = false;
		},
		refetchCall: (state) => {
			state.refetch = true;
		},
		refetched: (state) => {
			state.refetch = false;
		},
		loadList: (state, action) => {
			state.listData = action.payload.listData;
		},
	},
});

export const { compHydrated, refetchCall, refetched, loadList } =
	listSlice.actions;

export default listSlice.reducer;
