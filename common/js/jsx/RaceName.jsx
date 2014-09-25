/**
 * @jsx React.DOM
 */
var RaceName = React.createClass({
	render: function() {
		return (
			<div className="raceName">
				<h1>{this.props.name}</h1>
			</div>
		);
	}
});