import { jsTPS_Transaction } from "jstps";

export default class DuplicateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, songIndex) {
        super();
        this.app = initApp;
        this.songIndex = songIndex;
    }

    executeDo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs.splice(this.songIndex, 0, this.deletedSong);
        this.app.setStateWithUpdatedList(updatedList);
    }
    
    executeUndo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs.splice(this.songIndex, 0, this.deletedSong);
        this.app.setStateWithUpdatedList(updatedList);
    }
}
