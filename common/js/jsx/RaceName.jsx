/**
 * @jsx React.DOM
 */
var RaceName = React.createClass({
	render: function() {
		return (
			<div className='raceName'>
				{this.props.race.office_name}
			</div>
		);
	}
});