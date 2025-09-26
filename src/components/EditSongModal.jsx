import React, { useState, useEffect } from 'react';

export default function EditSongModal({ song, hideEditSongModalCallback, editSongCallback }) {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        youTubeId: '',
        year: '',
    });

    useEffect(() => {
        if (song) {
            setFormData({
                title: song.title || '',
                artist: song.artist || '',
                youTubeId: song.youTubeId || '',
                year: song.year || '',
            });
        }
    }, [song]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, artist, youTubeId, year } = formData;
        const updatedSong = {
            ...song,
            title,
            artist,
            youTubeId,
            year
        };
        editSongCallback(updatedSong);
        hideEditSongModalCallback();
    }

    const { title, artist, youTubeId, year } = formData;

    if (!song) {
        return null;
    }
    return (
        <div
            className="modal"
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='edit-song-root'>
                <div className="modal-north">
                    Edit song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        <div id="title-prompt" className="modal-prompt">Title:<input
                            id="edit-song-modal-title-textfield"
                            className='modal-textfield'
                            type="text"
                            value={title}
                            name="title"
                            onChange={handleInputChange}
                        />
                        </div>
                        <div id="artist-prompt" className="modal-prompt">Artist:<input
                            id="edit-song-modal-artist-textfield" className='modal-textfield'
                            type="text"
                            value={artist}
                            name="artist"
                            onChange={handleInputChange}
                        />
                        </div>
                        <div id="you-tube-id-prompt" className="modal-prompt">YouTube Id:<input
                            id="edit-song-modal-youTubeId-textfield" className='modal-textfield'
                            type="text"
                            value={youTubeId}
                            name="youTubeId"
                            onChange={handleInputChange}
                        />
                        </div>
                        <div id="year-prompt" className="modal-prompt">Year:<input id="edit-song-modal-year-textfield"
                            className='modal-textfield'
                            type="number"
                            value={year}
                            name="year"
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="edit-song-confirm-button"
                        className="modal-button"
                        onClick={handleSubmit}
                        value='Confirm' />
                    <input type="button"
                        id="edit-song-cancel-button"
                        className="modal-button"
                        onClick={hideEditSongModalCallback}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}