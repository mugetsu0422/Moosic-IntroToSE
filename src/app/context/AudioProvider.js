import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import { Audio } from 'expo-av';
import { SONG_URI } from '../constants/constants';
import * as helper from '../helper/Helper'

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistContent: [],
            randArr: [],
            song: null,
            songStatus: null,
            currentSong: {},
            currentSongIndex: null,
            totalAudioCount: null,
            playbackPosition: null,
            playbackDuration: null,
            play: 'pause',
            shuffle: 'alphabetical',
            repeat: 'none',
        }
    }

    updateState = (previousState, newState = {}) => {
        this.setState({...previousState, ...newState})
    }

    onPlaybackStatusUpdate = async(playbackStatus) => {
        const { currentSongIndex, playlistContent, shuffle, repeat } = this.state
        if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
            this.updateState(this.context, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis,
            })
        }

        if(playbackStatus.didJustFinish) {
            if (repeat != 'song') {
                if (repeat != 'playlist') {
                    if (currentSongIndex != playlistContent.length - 1)
                    {
                        this.forwardButton()
                    }
                }
            }
        }
    }

    playNewSong = async(audio) => {
        const { song, songStatus, currentSong, updateState, playlistContent } = this.state
        // Find index of current song in playlistContent
        const idx = playlistContent.findIndex(song => song.song_id === audio.song_id)

        // playing audio for the first time
        if(songStatus === null) {
            const song = new Audio.Sound()
            try {
                const status = await song.loadAsync({uri: SONG_URI + audio.song_id}, {shouldPlay: true})
                updateState(this.state, {
                    song: song, 
                    songStatus: status, 
                    currentSong: audio,
                    currentSongIndex: idx,
                    play: 'pause',
                })
                return song.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            } catch (error) {
                console.log('error playing song', error.message)
            }
            
        }
        
        // // play another song
        if(songStatus.isLoaded) {
            try {
                // unload current song
                await song.stopAsync()
                await song.unloadAsync()

                // load another song
                const status = await song.loadAsync({uri: SONG_URI + audio.song_id}, {shouldPlay: true})
                updateState(this.state, {
                    song: song, 
                    songStatus: status, 
                    currentSong: audio,
                    currentSongIndex: idx,
                    play: 'pause',
                })
                return song.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            } catch (error) {
                console.log('error playing another song', error.message)
            }
        }
    }

    shuffleButton = () => {
        const { shuffle, updateState, currentSong, playlistContent } = this.state
        const idx = playlistContent.findIndex(song => song.song_id === currentSong.song_id)

        if (shuffle === 'random') {
            updateState(this.state, {
                shuffle: 'alphabetical',
                currentSongIndex: idx,
            })
        }
        // Alphabetical
        else {
            const randArrTemp = helper.createRandArr(playlistContent.length, idx)
            // console.log(randArrTemp)
            // console.log(idx)

            updateState(this.state, {
                randArr: randArrTemp,
                shuffle: 'random',
                currentSongIndex: 0,
            })
        }
    }

    repeatButton = async() => {
        const { repeat, updateState, song } = this.state
        // switch to playlist
        if (repeat === 'none') {
            updateState(this.state, {
                repeat: 'playlist',
            })
        }
        // switch to song
        else if (repeat === 'playlist') {
            try {
                const status = await song.setStatusAsync({isLooping: true})
                updateState(this.state, {
                    repeat: 'song',
                    songStatus: status,
                })
            } catch (error) {
                console.log('error repeat button', error.message)
            }
        }
        // switch to none
        else {
            try {
                const status = await song.setStatusAsync({isLooping: false})
                updateState(this.state, {
                    repeat: 'none',
                    songStatus: status,
                })
            } catch (error) {
                console.log('error repeat button', error.message)
            }
        }
    }

    playpauseButton = async() => {
        const { song, songStatus, currentSong, updateState,  } = this.state
        // pause song
        if(songStatus.isPlaying) {
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
        else {
            try {
                const status = await song.setStatusAsync({ shouldPlay: true})
                return updateState(this.state, {
                    songStatus: status,
                    play: 'pause'})
            } catch (error) {
                console.log('error resuming song', error.message)
            }
        }
    }

    handleAudioPress = async(audio) => {
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

    forwardButton = async() => {
        const { song, currentSong, updateState, playlistContent, shuffle, randArr, currentSongIndex } = this.state

        // index in playlistContent
        var realIdx = currentSongIndex + 1 >= playlistContent.length ? 0 : currentSongIndex + 1
        var virtIdx = realIdx
        if (shuffle === 'random') {
            virtIdx = randArr[realIdx]
        }
        // console.log('realIdx', realIdx)
        // console.log('virtIdx', virtIdx)

        try {
            // unload current song
            await song.stopAsync()
            await song.unloadAsync()

            // load next song
            const status = await song.loadAsync({
                uri: SONG_URI + playlistContent[virtIdx].song_id}, 
                {shouldPlay: true})
            updateState(this.state, {
                song: song, 
                songStatus: status, 
                currentSong: playlistContent[virtIdx],
                currentSongIndex: realIdx,
                play: 'pause',
            })
            return song.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        } catch (error) {
            console.log('error when forward song', error.message)
        }
    }

    backwardButton = async() => {
        const { song, currentSong, updateState, playlistContent, shuffle, randArr, currentSongIndex } = this.state

        // index in playlistContent
        var realIdx = currentSongIndex - 1 < 0 ? playlistContent.length - 1 : currentSongIndex - 1
        var virtIdx = realIdx
        if (shuffle === 'random') {
            virtIdx = randArr[realIdx]
        }
        console.log('realIdx', realIdx)
        console.log('virtIdx', virtIdx)

        try {
            // unload current song
            await song.stopAsync()
            await song.unloadAsync()

            // load next song
            const status = await song.loadAsync({
                uri: SONG_URI + playlistContent[virtIdx].song_id}, 
                {shouldPlay: true})
            updateState(this.state, {
                song: song, 
                songStatus: status, 
                currentSong: playlistContent[virtIdx],
                currentSongIndex: realIdx,
                play: 'pause',
            })
            return song.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        } catch (error) {
            console.log('error when forward song', error.message)
        }
    }

    render() {
        const {
            playlistContent, 
            song, 
            songStatus, 
            currentSong, 
            currentSongIndex,
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
                currentSongIndex,
                totalAudioCount,
                playbackPosition, 
                playbackDuration,
                play,
                shuffle,
                repeat,
                updateState: this.updateState,
                playNewSong: this.playNewSong,
                shuffleButton: this.shuffleButton,
                repeatButton: this.repeatButton,
                playpauseButton: this.playpauseButton,
                forwardButton: this.forwardButton,
                backwardButton: this.backwardButton,
            }}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}