import React, {Component} from 'react'
import './App.css'
import songs from "./data/songs.json"

const uniquifyingFilter = (value, index, self) => { return self.indexOf(value) === index }
const playlists = songs.map((song) => song.playlist).filter(uniquifyingFilter).sort()
const artists = songs.map((song) => song.artist).filter(uniquifyingFilter).sort()
//const data = {playlists: playlists, artists: artists, songs: songs} //TODO: combine duplicate nav components

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {view: "nav", viewItem: ''}
	}

	render() {
		return (
			<div className="App">
				{
					{
						"nav": <Navigation handleClick={this.handleNavClick}/>,
						"playlists": <Playlists playlists={playlists} handleBack={this.handleBackClick} handleClick={this.handlePlaylistClick}/>,
						"artists": <Artists artists={artists} handleBack={this.handleBackClick} handleClick={this.handleArtistClick}/>,
						"songs": <Songs songs={songs} handleBack={this.handleBackClick}/>,
						"playlist": <Playlist name={this.state.viewItem} songs={songs}/>,
						"artist": <Artist name={this.state.viewItem} songs={songs}/>,
						"lyrics": <Lyrics name={this.state.viewItem} songs={songs}/>,
					}[this.state.view]
				}
			</div>
		);
	}

	handleNavClick = (event) => {
		this.setState({
			...this.state,
			view: event.target.attributes.name.value,
		})
	}

	handlePlaylistClick = (event) => {
		this.setState({
			...this.state,
			view: "playlist",
			viewItem: event.target.attributes.name.value,
		})
	}

	handleArtistClick = (event) => {
		this.setState({
			...this.state,
			view: "artist",
			viewItem: event.target.attributes.name.value,
		})
	}

	handleBackClick = (event) => {
		this.setState({
			...this.state,
			view: "nav",
		});
	}

}


const Navigation = props => {
	return (
		<div className="Navigation">
			<div className="NavItem" name="playlists" onClick={props.handleClick}>Playlists</div>
			<div className="NavItem" name="artists" onClick={props.handleClick}>Artists</div>
			<div className="NavItem" name="songs" onClick={props.handleClick}>Songs</div>
		</div>
	);
}

const Playlists = props => {
	var data = ""
	if (!Object.entries(props).length && props.constructor === Object) {
		data = <div>No playlists defined</div>
	} else {
		const entries = playlists.map(name => <li className="nav-list-item" key={name} name={name} onClick={props.handleClick}>{name}</li>)
		data = <div><ul>{entries}</ul></div>
	}
	return (
		<div>
			<div className="BackButton" name="nav" onClick={props.handleBack}>&lt; Playlists</div>
			{data}
		</div>
	)
}

const Artists = props => {
	var data = ""
	if (!Object.entries(props).length && props.constructor === Object) {
		return <div>No artists defined</div>
	} else {
		const entries = artists.map(name => <li className="nav-list-item" key={name} name={name} onClick={props.handleClick}>{name}</li>)
		data = <div><ul>{entries}</ul></div>
	}
	return (
		<div>
			<div className="BackButton" name="nav" onClick={props.handleBack}>&lt; Artists</div>
			{data}
		</div>
	)
}

const Playlist = props => {
	var data = ""
	if (!Object.entries(props).length && props.constructor === Object) {
		data = <div>Playlist {props.name} is empty</div>
	} else {
		const entries = songs.filter(song => song.playlist === props.name).map(song => {
			const lines = song.lyrics.map(line => <div className="songLine">{line}</div>)
			return (
			<div className="song-list-item"
				key={song.title}
				id={song.title}>
					<h3>{song.title}</h3>
					{lines}
				</div>
			)
		})
		data = <div>{entries}</div>
	}
	//TODO: Make this back button work
	return (
		<div>
			<div className="BackButton" name="playlists" onClick={props.handleBack}>&lt; {props.name}</div>
			{data}
		</div>
	)
}

const Artist = props => {
	var data = ""
	if (!Object.entries(props).length && props.constructor === Object) {
		data = <div>No songs by {props.name}</div>
	} else {
		const entries = songs.filter(song => song.artist === props.name).map(song => {
			const lines = song.lyrics.map(line => <div className="songLine">{line}</div>)
			return (
			<div className="song-list-item"
				key={song.title}
				id={song.title}>
					<h3>{song.title}</h3>
					{lines}
				</div>
			)
		})
		data = <div>{entries}</div>
	}

	//TODO: Make this back button work
	return (
		<div>
			<div className="BackButton" name="playlists" onClick={props.handleBack}>&lt; {props.name}</div>
			{data}
		</div>
	)
}

const Songs = props => {
	var data = ""
	if (!Object.entries(props).length && props.constructor === Object) {
		return <div>No songs defined</div>
	} else {
		const entries = songs.sort((a, b) => a.title - b.title).map((song) => {
			return (
			<li className="nav-list-item"
				key={song.title}
				id={song.title}
				onClick={props.handleClick}>{song.title}</li>
			)
		})
		data = <div><ul>{entries}</ul></div>
	}
	return (
		<div>
			<div className="BackButton" name="nav" onClick={props.handleBack}>&lt; All Songs</div>
			{data}
		</div>
	);
}

const Lyrics = props => {
	return <div>Unimplemented</div>
}




export default App
