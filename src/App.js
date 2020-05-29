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

	//TODO: glyph and capitalization for subtitle via stylesheet see https://stackoverflow.com/questions/48387180/is-it-possible-to-capitalize-first-letter-of-text-string-in-react-native-how-to/58867901#58867901
	return (
		<div className="lyrassist">
			<h1 className="title" onClick={() => handleClick('nav', '')}>
				Lyrassist
			</h1>
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
							handleBack={() => handleClick('artists', '')}
						/>
					),
					lyrics: (
						<div className="one-song">
							<h2 className="subtitle" onClick={() => handleClick('songs', '')}>
								{viewItem}
							</h2>
							<Lyrics songs={songs} name={viewItem} renderTitle={false} />
						</div>
					),
				}[view]
			}
		</div>
	)
}

const Navigation = (props) => {
	return (
		<div className="nav-menu">
			<div
				className="nav-item"
				onClick={() => props.handleClick('playlists', '')}
			>
				Playlists
			</div>
			<div
				className="nav-item"
				onClick={() => props.handleClick('artists', '')}
			>
				Artists
			</div>
			<div className="nav-item" onClick={() => props.handleClick('songs', '')}>
				Songs
			</div>
		</div>
	)
}

const RenderList = (props) => {
	var data = ''
	if (!props.items || !props.items.length) {
		data = <div className="empty-list">No {props.listType} defined</div>
	} else {
		const entries = props.items.map((name) => (
			<li
				className="sublist-item"
				key={name}
				name={name}
				onClick={() => props.handleClick(props.sublistType, name)}
			>
				{name}
			</li>
		))
		data = <ul className="song-title-list">{entries}</ul>
	}
	return (
		<div className="renderlist-container">
			<h2 className="subtitle" onClick={props.handleBack}>
				{props.listType}
			</h2>
			{data}
		</div>
	)
}

const SongList = (props) => {
	var data = ''
	if (!props.songs || !props.songs.length) {
		data = (
			<div className="empty-list">No songs for &quot;{props.name}&quot;</div>
		)
	} else {
		const entries = props.songs
			.filter((song) => song[props.listType] === props.name)
			.map((song) => (
				<Lyrics
					key={song.title}
					name={song.title}
					songs={songs}
					renderTitle={true}
				/>
			))
		data = <div className="song-list">{entries}</div>
	}
	return (
		<div className="songlist-container">
			<h2 className="subtitle" onClick={props.handleBack}>
				{props.name}
			</h2>
			{data}
		</div>
	)
}

const Lyrics = (props) => {
	const song = props.songs.find((x) => x.title === props.name)
	const title = props.renderTitle ? (
		<h3 className="song-title">{song.title}</h3>
	) : (
		''
	)
	const lines = song.lyrics.map((line, index) => (
		<div className="songLine" key={index}>
			{line}
		</div>
	))
	return (
		<div className="sublist-item">
			{title}
			{lines}
		</div>
	)
}

export default App
