/**
 * @jsx React.DOM
 */

var React = require('react');

var ReportingUnitName = React.createClass({

	render: function() {
		return (
			<div className='reporting-unit-name'>
				<span className='name'>{this.props.reportingUnit.county_name}</span>
			</div>
		);
	}

});

module.exports = ReportingUnitName;