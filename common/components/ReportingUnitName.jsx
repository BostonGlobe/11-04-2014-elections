/**
 * @jsx React.DOM
 */

var React = require('react');

var ReportingUnitName = React.createClass({

	render: function() {
		return (
			<div className='reporting-unit-name'>
				{this.props.reportingUnit.county_name}
			</div>
		);
	}

});

module.exports = ReportingUnitName;