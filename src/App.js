import React, {useState} from 'react'
import './App.css'
import songs from './data/songs.json'

const uniquifyingFilter = (value, index, self) => {
	return self.indexOf(value) === index
}
const playlists = songs
	.map((song) => song.playlist)
	.filter(uniquifyingFilter)
	.sort()
const artists = songs
	.map((song) => song.artist)
	.filter(uniquifyingFilter)
	.sort()

function App() {
	const [view, setView] = useState('nav')
	const [viewItem, setViewItem] = useState('')

	const handleClick = (type, item) => {
		setView(type)
		setViewItem(item)
	}

	return (
		<div className="App">
			<h2 className="title" onClick={() => handleClick('nav', '')}>
				Lyrassist
			</h2>
			{
				{
					nav: <Navigation handleClick={handleClick} />,
					playlists: (
						<RenderList
							listType="playlists"
							sublistType="playlist"
							items={playlists}
							handleBack={() => handleClick('nav', '')}
							handleClick={handleClick}
						/>
					),
					artists: (
						<RenderList
							listType="artists"
							sublistType="artist"
							items={artists}
							handleBack={() => handleClick('nav', '')}
							handleClick={handleClick}
						/>
					),
					songs: (
						<RenderList
							listType="songs"
							sublistType="lyrics"
							items={songs.map((song) => song.title).sort()}
							handleBack={() => handleClick('nav', '')}
							handleClick={handleClick}
						/>
					),
					playlist: (
						<SongList
							listType="playlist"
							name={viewItem}
							songs={songs}
							handleBack={() => handleClick('playlists', '')}
						/>
					),
					artist: (
						<SongList
							listType="artist"
							name={viewItem}
							songs={songs}
							handleBack={() => handleClick('playlists', '')}
						/>
					),
					lyrics: <Lyrics name={viewItem} songs={songs} />,
				}[view]
			}
		</div>
	)
}

const Navigation = (props) => {
	return (
		<div className="Navigation">
			<div
				className="NavItem"
				onClick={() => props.handleClick('playlists', '')}
			>
				Playlists
			</div>
			<div className="NavItem" onClick={() => props.handleClick('artists', '')}>
				Artists
			</div>
			<div className="NavItem" onClick={() => props.handleClick('songs', '')}>
				Songs
			</div>
		</div>
	)
}

const RenderList = (props) => {
	var data = ''
	if (!props.items || !props.items.length) {
		data = <div>No {props.listType} defined</div>
	} else {
		const entries = props.items.map((name) => (
			<li
				className="nav-list-item"
				key={name}
				name={name}
				onClick={() => props.handleClick(props.sublistType, name)}
			>
				{name}
			</li>
		))
		data = (
			<div>
				<ul>{entries}</ul>
			</div>
		)
	}
	//TODO: glyph and capitalization via stylesheet see https://stackoverflow.com/questions/48387180/is-it-possible-to-capitalize-first-letter-of-text-string-in-react-native-how-to/58867901#58867901
	return (
		<div>
			<h2 className="BackButton" onClick={props.handleBack}>
				&lt; {props.listType}
			</h2>
			{data}
		</div>
	)
}

const SongList = (props) => {
	var data = ''
	if (!props.songs || !props.songs.length) {
		data = <div>No songs for &quot;{props.name}&quot;</div>
	} else {
		const entries = props.songs
			.filter((song) => song[props.listType] === props.name)
			.map((song) => {
				const lines = song.lyrics.map((line, index) => (
					<div className="songLine" key={index}>
						{line}
					</div>
				))
				return (
					<div className="song-list-item" key={song.title} id={song.title}>
						<h3>{song.title}</h3>
						{lines}
					</div>
				)
			})
		data = <div>{entries}</div>
	}
	return (
		<div>
			<h2 className="BackButton" onClick={props.handleBack}>
				&lt; {props.name}
			</h2>
			{data}
		</div>
	)
}

const Lyrics = (props) => {
	return <div>Unimplemented</div>
}

export default App
