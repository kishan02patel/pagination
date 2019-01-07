import React, { Component } from 'react';
import './App.css';
import DisplayPost from './DisplayPost';

class App extends Component {
	constructor() {
		super()
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => this.setState({
				posts: data
			}))
	}

	render() {
		return (
			<div className="App">
				{
					this.state.posts.length <= 0 ? '' :
						this.state.posts.map(post => <DisplayPost key={post.id + post.userId} post={post} />)
				}
			</div>
		);
	}
}

export default App;
