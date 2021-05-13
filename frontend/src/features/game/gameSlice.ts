import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreateGameResponse, GameState, JoinGameResponse } from "./types";
import { transformSnippetResponse } from "./utils";

// redux prefix for this slice
const GAME_SLICE_NAME = 'game';

const initialState: GameState = {
	playerId: '',
	lobbyId: '',
	snippet: {
		id: '',
		snippet: '',
		tokenCount: 0,
		language: 'plain_text',
		dateCreated: new Date(),
	},
	isQueued: false,
	gameProgress: [],
	queuedPlayers: [],
	placements: [],
}

const gameSlice = createSlice({
	name: GAME_SLICE_NAME,
	initialState,
	reducers: {
		createGameAction: (state, action: PayloadAction<CreateGameResponse>) => {
			const payload = action.payload;
			state.playerId = payload.playerId;
			state.lobbyId = payload.lobbyId;
			state.snippet = transformSnippetResponse(payload.snippet);
		},
		joinGameAction: (state, action: PayloadAction<JoinGameResponse>) => {
			const payload = action.payload;
			state.playerId = payload.playerId;
			state.snippet = transformSnippetResponse(payload.snippet);
			state.gameProgress = payload.gameProgress;
			state.queuedPlayers = payload.queuedPlayers;
			state.placements = payload.placements;
			state.isQueued = payload.wasQueued;
		},
	},
})

export default gameSlice.reducer;

export const { createGameAction, joinGameAction } = gameSlice.actions;

export const selectRaceContent = (state: RootState) => state.game.snippet.snippet;
export const selectLangauge = (state: RootState) => state.game.snippet.language;
