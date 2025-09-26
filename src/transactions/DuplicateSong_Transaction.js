import { jsTPS_Transaction } from "jstps";

export default class DuplicateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, songIndex) {
        super();
        this.app = initApp;
        this.songIndex = songIndex;
        this.songToDuplicate = this.app.state.currentList.songs[this.songIndex];
    }

    executeDo() {
        const updatedList = { ...this.app.state.currentList };
        const duplicatedSong = JSON.parse(JSON.stringify(this.songToDuplicate));
        duplicatedSong.title = `${duplicatedSong.title} (Copy)`;
        updatedList.songs.splice(this.songIndex + 1, 0, duplicatedSong); // insert it into our list
        this.app.setStateWithUpdatedList(updatedList);
    }
    
    executeUndo() {
        const updatedList = { ...this.app.state.currentList };
        updatedList.songs.splice(this.songIndex + 1, 1);
        this.app.setStateWithUpdatedList(updatedList);
    }
}
