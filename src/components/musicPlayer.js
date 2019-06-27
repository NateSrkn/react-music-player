import React, { Component } from 'react';
import PlayerBar from './playerBar'
import album from '../data/albumData'

class musicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            isPlaying: false,
        }
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true })
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false })
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song })
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play();
        }
    }

    handleAutoPlay(e) {
        if (e.target.value === 1) {
            this.handleNextClick()
        }
    }


    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({
            currentTime: this.formatTime(newTime)
        })
    }


    formatTime(time) {
        return time
            ? `${Math.floor(time / 60)}:${Number(time % 60 / 100)
                .toFixed(2)
                .substr(2, 3)}`
            : '-:--'
    }


    render() {
        return (
            <div className="music-player">
                <div className="album-art">
                    <img src={this.state.album.albumCover} />
                </div>
                <PlayerBar
                    album={this.state.album}
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    formatTime={(e) => this.formatTime(e)}
                    handleAutoPlay={(e) => this.handleAutoPlay(e)}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                />
            </div>
        )
    }
}



export default musicPlayer