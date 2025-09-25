import React, { Component } from 'react';

export default class EditSongModal extends Component {
    render() {
        const { song, hideEditSongModalCallback, editSongCallback } = this.props;
        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='edit-song-root'>
                        <div class="modal-north">
                            Edit song?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Edit the song name and artist.
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={editSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideEditSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}