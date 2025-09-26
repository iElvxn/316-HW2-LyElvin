import { jsTPS_Transaction } from "jstps";

export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, newSong) {
        super();
        this.app = initApp;
        this.newSong = newSong;
        this.songIndex = -1;
    }

    executeDo() {
        const updatedList = {
            ...this.app.state.currentList,
            songs: [...this.app.state.currentList.songs, this.newSong]
        };
        this.songIndex = updatedList.songs.length - 1;
        this.app.setStateWithUpdatedList(updatedList);
    }
    
    executeUndo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs.splice(this.songIndex, 1);
        this.app.setStateWithUpdatedList(updatedList);
    }
}
