import React from 'react'

class DisplayPost extends React.Component {
	render() {
		return (
			<div class="post">
				<h3>{this.props.post.title}</h3>
				<h4>By ~ {this.props.post.userId}</h4>
				<p>{this.props.post.body}</p>
				<br />
			</div>
		)
	}
}

export default DisplayPost