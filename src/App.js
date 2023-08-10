import { useEffect, useState } from 'react'
import './App.css'

// C - CREATE
// R - READ
// U - UPDATE
// D - DELETE

function App() {
	const [menuItems, setMenuItems] = useState([])
	const [form, setForm] = useState({})

	useEffect(() => {
		fetch('http://localhost:4040/menu') // fetch in local API
			.then(apiResponse => apiResponse.json()) // we get response and convert to json
			.then(cleanJson => setMenuItems(cleanJson)) // we get the clean json data
			.catch(myError => console.log(myError))
	}, [menuItems])

	const handleNewMenuItem = e => {
		e.preventDefault()

		// const form = { title: title, description: description }

		fetch('http://localhost:4040/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		})
			.then(res => res.json())
			.then(data => setMenuItems(data))
			.catch(myError => console.log(myError))
	}

	const handleUpdateHotdog = e => {
		e.preventDefault()

		fetch('http://localhost:4040/?title=American Hotdog', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: 'French Hotdog', description: 'Juicy ground pork beef with french fries' }),
		})
			.then(res => res.json())
			.then(data => setMenuItems(data))
			.catch(myError => console.log(myError))
	}

	const handleDeleteHotdog = e => {
		e.preventDefault()

		fetch('http://localhost:4040/?title=French Hotdog', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => setMenuItems(data))
			.catch(myError => console.log(myError))
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>My menu items</h1>
				<input
					type='text'
					name='title'
					placeholder='title'
					onChange={e => setForm({ ...form, title: e.target.value })}
				/>
				<input
					type='text'
					name='description'
					placeholder='description'
					onChange={e => setForm({ ...form, description: e.target.value })}
				/>
				<button onClick={handleNewMenuItem}>add</button>
				<button onClick={handleUpdateHotdog}>Update Hotdog</button>
				<button onClick={handleDeleteHotdog}>Delete French Hotdog</button>
				<ul>
					{menuItems.map(item => {
						return <li> {item.title}</li>
					})}
				</ul>
			</header>
		</div>
	)
}

export default App
