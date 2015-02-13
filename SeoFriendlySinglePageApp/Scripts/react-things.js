var Router =
	{
		//This router is incredibly simple, in reality use a proper one like backbones router. This one doesnt support things like back, you need to implement window.onpopstate if you want it
		goToThing: function (thing, e) {
			React.render(React.createElement(Detail, { thingId: thing.Id, thing: thing }), document.getElementById("application-mount-node"));
			window.history.pushState(thing, thing.Title, "/thing/detail/" + thing.Id);
			e.preventDefault();
		},
		goToList: function (e) {
			React.render(React.createElement(List, {}), document.getElementById("application-mount-node"));
			window.history.pushState({}, 'list', "/thing/list");
			e.preventDefault();
		}
	};//fake router for the demo

var List = React.createClass({
	componentWillMount: function () {
		if (this.props.things) {
			this.setState({ loading: false, things: this.props.things });
		}
		else {
			this.setState({ loading: true });
			var xhr = new XMLHttpRequest();
			xhr.open('get', '/thing/list?ajax', true);//tag on the ?ajax so the browser doesnt confuse the json and html resutls when caching
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onload = function () {
				var data = JSON.parse(xhr.responseText);
				this.setState({ loading: false, things: data });
			}.bind(this);
			xhr.send();
		}
	},
	render: function () {
		if (false) {
			return React.DOM.div({ className: 'things loading' }, 'loading...');
		}
		else {
			return React.DOM.div({ className: 'things row' },
				React.DOM.div({ className: 'col-md-12' },
					React.DOM.h2({}, 'Things'),
					React.DOM.ul({},
						_.map(this.state.things, function (thing) {
							return React.DOM.li({ key: thing.Id },
								React.DOM.a({ href: '/thing/detail/' + thing.Id, onClick: Router.goToThing.bind(null, thing) }, thing.Title)
							);
						}.bind(this))
					)
				)
			);
		}

	}
});

var Detail = React.createClass({
	render: function () {
		return React.DOM.div({ className: 'thing' },
			React.DOM.h2({}, this.props.thing.Title),
			React.DOM.p({}, this.props.thing.Detail)
		);
	}
});

var ListLink = React.createClass({
	render: function () {
		return React.DOM.a({ href: '/thing/list', onClick: Router.goToList }, 'List');
	}
});