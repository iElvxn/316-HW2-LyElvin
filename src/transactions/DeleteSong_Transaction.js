import { jsTPS_Transaction } from "jstps";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, songIndex) {
        super();
        this.app = initApp;
        this.songIndex = songIndex;
        this.deletedSong = null;
    }

    executeDo() {
        const updatedList = { ...this.app.state.currentList };
        this.deletedSong = updatedList.songs[this.songIndex];
        updatedList.songs.splice(this.songIndex, 1);
        this.app.setStateWithUpdatedList(updatedList);
    }
    
    executeUndo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs.splice(this.songIndex, 0, this.deletedSong);
        this.app.setStateWithUpdatedList(updatedList);
    }
}
