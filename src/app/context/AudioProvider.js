import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import { Audio } from 'expo-av';
import { SONG_URI } from '../constants/constants';

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistContent: [],
            song: null,
            songStatus: null,
            currentSong: {},
            currentAudioIndex: null,
            totalAudioCount: null,
            playbackPosition: null,
            playbackDuration: null,
            play: null,
            shuffle: 'random',
            repeat: 'none',
        }
    }

    updateState = (previousState, newState = {}) => {
        this.setState({...previousState, ...newState})
    }

    handleAudioPress = async(audio) => {
        console.log(this.state.playlistContent[0])
        const { song, songStatus, currentSong, updateState,  } = this.state
        // playing audio for the first time
        if(songStatus === null) {
            const song = new Audio.Sound()
            try {
                const status = await song.loadAsync({uri: SONG_URI + audio.song_id}, {shouldPlay: true})
                return updateState(this.state, {
                    song: song, 
                    songStatus: status, 
                    currentSong: audio,
                    play: 'pause',
                })
                // return song.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            } catch (error) {
                console.log('error playing song', error.message)
            }
            
        }

        // pause song
        if(songStatus.isLoaded && songStatus.isPlaying && currentSong.song_id === audio.song_id) {
            try {
                const status = await song.setStatusAsync({ shouldPlay: false})
                return updateState(this.state, {
                    songStatus: status,
                    play: 'play',})
            } catch (error) {
                console.log('error pausing song', error.message)
            }    
        }

        // resume song 
        if(songStatus.isLoaded && !songStatus.isPlaying && currentSong.song_id === audio.song_id) {
            try {
                const status = await song.setStatusAsync({ shouldPlay: true})
                return updateState(this.state, {
                    songStatus: status,
                    play: 'pause'})
            } catch (error) {
                console.log('error resuming song', error.message)
            }
        }

        // // play another song
        if(songStatus.isLoaded && currentSong.song_id !== audio.song_id) {
            try {
                // unload current song
                await song.stopAsync()
                await song.unloadAsync()

                // load another song
                const status = await song.loadAsync({uri: SONG_URI + audio.song_id}, {shouldPlay: true})
                return updateState(this.state, {
                    song: song, 
                    songStatus: status, 
                    currentSong: audio,
                    play: 'pause',
                })
            } catch (error) {
                console.log('error playing another song', error.message)
            }
        }
    }

    render() {
        const {
            playlistContent, 
            song, 
            songStatus, 
            currentSong, 
            currentAudioIndex,
            totalAudioCount,
            playbackPosition, 
            playbackDuration,
            play,
            shuffle,
            repeat,
        } = this.state
        return (
            <AudioContext.Provider value={{ 
                playlistContent, 
                song, 
                songStatus, 
                currentSong, 
                currentAudioIndex,
                totalAudioCount,
                playbackPosition, 
                playbackDuration,
                play,
                shuffle,
                repeat,
                updateState: this.updateState,
                handleAudioPress: this.handleAudioPress,
            }}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}