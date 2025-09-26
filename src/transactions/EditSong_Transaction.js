import { jsTPS_Transaction } from "jstps";

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, songIndex, oldSong, newSong) {
        super();
        this.app = initApp;
        this.songIndex = songIndex;
        this.oldSong = { ...oldSong };
        this.newSong = { ...newSong };
    }

    executeDo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs[this.songIndex] = { ...this.newSong };
        this.app.setStateWithUpdatedList(updatedList);
    }
    
    executeUndo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs[this.songIndex] = { ...this.oldSong };
        this.app.setStateWithUpdatedList(updatedList);
    }
}
