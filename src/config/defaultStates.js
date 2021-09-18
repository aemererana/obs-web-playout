export const MEDIA_STATE = {
    MEDIA_LISTED: 0,
    MEDIA_PLAY: 1,
    MEDIA_READY: 2,
    MEDIA_ERR: -1
}

export const PLAYER_STATE = {
    STOPPED: 0,
    PAUSED: 1,
    PLAYING: 2
};


// mediaList object = {
//     mediaPath: String
//     state: MEDIA_STATE object
//     time: 0 // current playback time
//     duration: 0 // total duration
//     loadedInPlayer: 0 = null/both players hidden, 1 = player1, 2 = player2
// }
export const MEDIA_OBJ = {
    mediaPath: "", // String
    state: 0, // MEDIA_STATE object - 0 = MEDIA_LISTED
    time: 0, // current playback time
    duration: 0, // total duration in milliseconds
    loadedInPlayer: 0 // 0 = null/both players hidden, 1 = player1, 2 = player2
};

export const defaultPlaylist = {
    mediaList: [],
    playerActive: 0, // 0 = null, 1 = player1, 2 = player2
    playerState: PLAYER_STATE.STOPPED,
};



export const defaultSettings = {
    mediaPlayers: {
        player1: "",
        plater2: "",
    },
    sceneName: "Playout",
    pathFolder: 'C:\\FakePath\\',
    serverAddr: "localhost:4444",
};