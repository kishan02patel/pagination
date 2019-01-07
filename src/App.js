import React, { Component } from 'react';
import './App.css';
import DisplayPost from './DisplayPost';

class App extends Component {
	constructor() {
		super()
		//Reference is created to get the reference of div tag.
		this.myDivRef = React.createRef()

		// pageSize can be changed according to the needs
		this.state = {
			posts: [],
			offset: 0,
			pageSize: 20
		}
	}

	componentDidMount() {
		// Fetch the data from the server.
		fetch('http://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => this.setState({
				posts: data
			}))

		// Add a scroll event listener.
		window.addEventListener('scroll', () => {
			// Get the height of div tag.
			let windowHeight = this.myDivRef.current.clientHeight

			// Get the offset till where user has scrolled.
			let scrollOffset = window.pageYOffset

			//If the scroll percentage is 70% then increase the offset value by 20(Can be changed according to needs.)
			if (scrollOffset / windowHeight > 0.7) {
				// Check if sum of pageSize and offset is less than the length of array
				if (this.state.offset + this.state.pageSize <= this.state.posts.length) {
					this.setState(
						prevState => ({ offset: prevState.offset + 20 }),
						() => console.log('called', this.state.offset)
					)
				}
			}
		})
	}

	// Endless paging
	paging() {
		// displayArray is used to push the div tags which will be returned to render method
		let displayArray = [], post

		/*
		** Check if the sum of pageSize and offset is greater than the array length. 
		** If true then loop only till the array length
		** Else loop till the sum of pageSize and offset
	   	*/
		let loopLength = this.state.pageSize + this.state.offset >= this.state.posts.length ? this.state.posts.length : this.state.pageSize + this.state.offset

		for (let i = 0; i < loopLength; i++) {
			// Get the ith post 
			post = this.state.posts[i];
			// Push the div tag return by DisplayPost into array.
			displayArray.push(< DisplayPost key={post.id + post.userId} post={post} index={i} />)
		}

		// Return the array to render method for displaying.
		return displayArray
	}

	render() {
		return (
			// Create a reference of div tag so that its height can be calculated.
			<div className="App" ref={this.myDivRef}>
				{
					// Call paging function only if there is data. Wait for data to be fetched from server.
					this.state.posts.length <= 0 ? '' : this.paging()
				}
			</div>
		);
	}
}

export default App;
