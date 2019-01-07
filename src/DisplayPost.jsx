import React from 'react'

class DisplayPost extends React.Component {
	render() {
		return (
			<div class="post">
				<div class="card text-white bg-dark mb-3" style={{ maxWidth: "18rem;" }}>
					<div class="card-header">Post Number - {this.props.index + 1} <br /> ~ By UserId:  {this.props.post.userId}</div>
					<div class="card-body">
						<h5 class="card-title">{this.props.post.title}</h5>
						<p class="card-text">{this.props.post.body}</p>
					</div>
				</div>
			</div >
		)
	}
}

export default DisplayPost