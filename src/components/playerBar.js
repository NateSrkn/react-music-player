import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <div>
                <div class="player-control">
                   <button id="prev-track" className="button prev-track" onClick={this.props.handlePrevClick}></button>
                   <button id="play-pause" className={this.props.isPlaying ? 'button pause' : 'button play'} onClick={this.props.handleSongClick}></button>
                   <button id="next-track" className="button next-track" onClick={this.props.handleNextClick}></button>
                </div>
                <div class="desc">
                    <marquee class="scroll" behavior="scroll">{this.props.album.title} - {this.props.currentSong.title}</marquee>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        value={(this.props.currentTime / this.props.duration) || 0}
                        onChange={this.props.handleTimeChange}
                        class="slider" 
                        step="0.01"
                        id="myRange" />
                </div>
            </div>
        )
    }
}
export default PlayerBar
