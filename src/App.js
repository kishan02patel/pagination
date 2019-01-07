import React, { Component } from 'react';
import './App.css';
import DisplayPost from './DisplayPost';

class App extends Component {
	constructor() {
		super()
		this.myDivRef = React.createRef()
		this.state = {
			posts: [],
			offset: 0,
			pageSize: 20
		}
	}

	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => this.setState({
				posts: data
			}))

		window.addEventListener('scroll', () => {
			let windowHeight = this.myDivRef.current.clientHeight
			let scrollOffset = window.pageYOffset
			if (scrollOffset / windowHeight > 0.7) {
				if (this.state.offset + this.state.pageSize <= this.state.posts.length) {
					this.setState(
						prevState => ({ offset: prevState.offset + 20 }),
						() => console.log('called', this.state.offset)
					)
				}
			}
		})
	}

	paging() {
		let array = [], post
		let loopLength = this.state.pageSize + this.state.offset >= this.state.posts.length ? this.state.posts.length : this.state.pageSize + this.state.offset
		for (let i = 0; i < loopLength; i++) {
			post = this.state.posts[i];
			array.push(< DisplayPost key={post.id + post.userId} post={post} index={i} />)
		}

		return array
	}

	render() {
		return (
			<div className="App" ref={this.myDivRef}>
				{
					this.state.posts.length <= 0 ? '' : this.paging()
				}
			</div>
		);
	}
}

export default App;
