package multiplayer

import (
	"encoding/json"
	"log"

	"github.com/hujoseph99/typing/backend/db"
)

const (
	errorResponse          = "errorResponse"
	createGameReponse      = "createGameResponse"
	joinGameResponse       = "joinGameResponse"
	newPlayerResponse      = "newPlayerResponse"
	gameProgressResponse   = "gameProgressResponse"
	playerFinishedResponse = "playerFinishedResponse"
	gameFinishedResponse   = "gameFinishedResponse"
	gameStartResponse      = "gameStartResponse"
	nextGameResponse       = "nextGameResponse"
	lobbyClosedResponse    = "lobbyClosedResponse"
	leaveGameResponse      = "leaveGameResponse"
)

type requestResponse struct {
	Action  string      `json:"action"`
	Payload interface{} `json:"payload"`
}

func newRequestResponse(action string, payload interface{}) *requestResponse {
	return &requestResponse{
		Action:  action,
		Payload: payload,
	}
}

type errorResult struct {
	Message string `json:"message"`
}

func newErrorResult(message string) *errorResult {
	return &errorResult{
		Message: message,
	}
}

func createAndSendError(client *Client, message string) {
	log.Println(message)
	payload := newErrorResult(message)
	response := newRequestResponse(errorResponse, payload)
	encoded, err := json.Marshal(response)
	if err != nil {
		log.Println("error when handling error: ", err)
		return // in this case, silently do nothing and log the error LMAO
	}
	client.send <- encoded
}

func createAndSendErrorToLobby(lobby *Lobby, message string) {
	log.Println(message)
	payload := newErrorResult(message)
	response := newRequestResponse(errorResponse, payload)
	encoded, err := json.Marshal(response)
	if err != nil {
		log.Println("error when handling error: ", err)
		return // in this case, silently do nothing and log the error LMAO
	}
	lobby.broadcastToClientsInLobby(encoded)
}

type createGameResult struct {
	PlayerId string      `json:"playerId"`
	LobbyId  string      `json:"lobbyId"`
	Snippet  *db.Snippet `json:"snippet"`
}

func newCreateGameResult(playerId string, lobbyId string, snippet *db.Snippet) *createGameResult {
	return &createGameResult{
		PlayerId: playerId,
		LobbyId:  lobbyId,
		Snippet:  snippet,
	}
}

type gameContent struct {
	PlayerId         string  `json:"playerId"`
	DisplayName      string  `json:"displayName"`
	PercentCompleted float64 `json:"percentCompleted"`
	Wpm              float64 `json:"wpm"`
}

func newGameContent(playerId string, displayName string) *gameContent {
	return &gameContent{
		PlayerId:         playerId,
		DisplayName:      displayName,
		PercentCompleted: 0,
		Wpm:              0,
	}
}

type joinGameResult struct {
	PlayerId      string         `json:"playerId"`
	Snippet       *db.Snippet    `json:"snippet"`
	GameProgress  []*gameContent `json:"gameProgress"`
	QueuedPlayers []*gameContent `json:"queuedPlayers"`
	Placements    []string       `json:"placements"`
	WasQueued     bool           `json:"wasQueued"`
}

func newJoinGameResult(playerId string, snippet *db.Snippet, gameProgress []*gameContent,
	queudPlayers []*gameContent, placements []string, wasQueued bool) *joinGameResult {
	return &joinGameResult{
		PlayerId:      playerId,
		Snippet:       snippet,
		GameProgress:  gameProgress,
		QueuedPlayers: queudPlayers,
		Placements:    placements,
		WasQueued:     wasQueued,
	}
}

type newPlayerResult struct {
	PlayerId         string  `json:"playerId"`
	DisplayName      string  `json:"displayName"`
	PercentCompleted float64 `json:"percentCompleted"`
	WasQueued        bool    `json:"wasQueued"`
}

func newNewPlayerResult(playerId string, displayName string, wasQueued bool) *newPlayerResult {
	return &newPlayerResult{
		PlayerId:         playerId,
		DisplayName:      displayName,
		PercentCompleted: 0,
		WasQueued:        wasQueued,
	}
}

type gameProgressResult struct {
	PlayerId         string  `json:"playerId"`
	PercentCompleted float64 `json:"percentCompleted"`
	Wpm              float64 `json:"wpm"`
}

func newGameProgressResult(playerId string, percentCompleted float64, wpm float64) *gameProgressResult {
	return &gameProgressResult{
		PlayerId:         playerId,
		PercentCompleted: percentCompleted,
		Wpm:              wpm,
	}
}

type playerFinishedResult struct {
	Placements []string `json:"placements"`
}

func newPlayerFinishedResult(placements []string) *playerFinishedResult {
	return &playerFinishedResult{
		Placements: placements,
	}
}

type gameFinishedResult struct {
	Placements []string `json:"placements"`
}

func newGameFinishedResult(placements []string) *gameFinishedResult {
	return &gameFinishedResult{
		Placements: placements,
	}
}

type gameStartResult struct {
	Countdown int `json:"countdown"`
}

func newGameStartResult(countdown int) *gameStartResult {
	return &gameStartResult{
		Countdown: countdown,
	}
}

type nextGameResult struct {
	Snippet       *db.Snippet    `json:"snippet"`
	GameProgress  []*gameContent `json:"gameProgress"`
	QueuedPlayers []*gameContent `json:"queuedPlayers"`
	Placements    []string       `json:"placements"`
}

func newNextGameResult(snippet *db.Snippet, gameProgress []*gameContent, queudPlayers []*gameContent, placements []string) *nextGameResult {
	return &nextGameResult{
		Snippet:       snippet,
		GameProgress:  gameProgress,
		QueuedPlayers: queudPlayers,
		Placements:    placements,
	}
}

type lobbyClosedResult struct {
	Message string `json:"message"`
}

func newLobbyClosedResult(message string) *lobbyClosedResult {
	return &lobbyClosedResult{
		Message: message,
	}
}

type leaveGameResult struct {
	PlayerId   string   `json:"playerId"`
	Placements []string `json:"placements"`
}

func newLeaveGameResult(playerId string, placements []string) *leaveGameResult {
	return &leaveGameResult{
		PlayerId:   playerId,
		Placements: placements,
	}
}
