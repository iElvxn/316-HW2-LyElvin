import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    handleEditSong = (event) => {
        event.stopPropagation();
        this.props.onEditSong(this.props.song);
    }

    handleDeleteSong = (event) => {
        event.stopPropagation();
        this.props.onDeleteSong(this.props.song);
    }

    handleDuplicateSong = (event) => {
        event.stopPropagation();
        this.props.onDuplicateSong(this.props.song);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick={this.handleEditSong}
                draggable="true"
            >
                <span className="song-card-number">{num}.</span>
                <a className="song-card-title" href={"https://www.youtube.com/watch?v=" + song.youTubeId}>{song.title}</a>
                <span className="song-card-by"> by </span>
                <span className="song-card-artist">{song.artist}</span>
                <span className="song-card-year">({song.year})</span>
                <div className="song-card-buttons">
                    <input 
                        type="button" 
                        className="song-card-button" 
                        value="🗐" 
                        onClick={this.handleDuplicateSong}
                    />
                    <input 
                        type="button" 
                        className="song-card-button" 
                        value="✕" 
                        onClick={this.handleDeleteSong}
                    />
                </div>
            </div>
        )
    }
}