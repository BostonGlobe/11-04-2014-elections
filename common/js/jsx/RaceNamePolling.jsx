/**
 * @jsx React.DOM
 */

// this one polls. meaning, it is responsible for fetching data.
// in other words, its data is state.

// first step: how do we decide if we are going to fetch data?
// if it has data-racenumbers then we know it has to fetch.
// if that's the case, then also use the mixin.
// but: this means that the mixin logic is always there,
// and we only use it when data-racenumbers is present.
// which means maybe it's only a mixin in the sense that we
// don't want to repeat typing the same ajax code, but that's all.

// next step: after we decide if we're going to fetch data or not,
// we'll call fetch data on componentDidMount,
// and then render html with the state, in render()

// if we decide not to call fetch data, in componentDidMount (?),

// wait, first i have to investigate getInitialState
// does this get called on non-state components? what happens then?

// so it appears state is null if you don't set it.


var React = require('react');

var RaceNamePolling = React.createClass({

	render: function() {
		return (
			<div>asdf</div>
		);
	}

});

module.exports = RaceNamePolling;