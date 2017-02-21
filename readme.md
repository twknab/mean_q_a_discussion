#MEAN Discussion Board:

##Dashboard Page:
	+ Table:
		+ Column Sorting

##Topic Page:
	+ Logout and Dashboard Links

##Profile Page:
	+ Logout and Dashboard Links

##Basic Questions to Start:
	+ JSON Web Tokens Acting Funky?


##Still Need To (see above):

	+ Column sorting
	+ Logout Nav Links / Dashboard Nav Links
	+ JWTs acting weird?

##Where I Left Off:

	+ Commenting now working. Logged solution below. Now need to figure out
	column sorting, and add the logout button and clean up any previous bugs.
	Would be good to eventually refactor.

###DEVELOPMENT ISSUES LOG:

	1. Why are category drop downs disappearing when page reloads?

		+ Solution: Your `/post/categories` route was being blocked by
		your JWT tokens. Thus, when you refreshed the page, your categories
		were not retrieved. To solve this, an exception was added in the JWT
		setup under your `app.js`, and now your categories load on page refresh.

	2. Why did my links in the format of `/user/{{user._id}}` give me a
	'Cannot Get' error?

		+ Solution: You forgot the hashbang -- this `#!` must go before your links.
		The link style of, `/#!/user/{{user._id}}` will *NOT* trigger this error.

		+ Also remember: When you're using the `$http` request in your factory,
		format your request as: `$http.get('/user' + id)` -- use the `+` to add
		the `id` onto your route (make sure to pass `id` in from `$routeParams.id`
		from your controller and to your factory).

	3. Nested use of `ng-repeat`:

		+ Solution: Be sure to make the second repeat a property of the first
		repeat. IE, `ng-repeat="comment in comments"` with a nested repeat as,
		`ng-repeat="reply in replies"` would be written as instead:
		`ng-repeat="reply in comment.replies"` -- this way the second `ng-repeat`
		is now a sub-component of the first. If you don't do this, Angular will
		break and throw a weird error.

		+ Solution: (BETTER): Hand the actual object into your $scope function,
		ie,:

		// Controller:
		`$scope.newPost = function(post) {
			console.log(post.newCommment)
			// should print object with 'description' key value
		}`

		// HTML:
		`<div ng-repeat="post in myPosts">
			<h1>{{post.title}}</h1>
			<p>Comment:</p>
			<form ng-submit="newPost(post)">
				<input type="text" ng-model="post.newComment.description">
			</form>
		</div>`

	4. Don't move too far ahead. Build only one feature at a time. I tried to
	build  a few features at once, and they all butted heads :(

	5. Setting up JSON Web Tokens:

		+	Setup the app to use jwt packages:

				`var expressJWT = require('express-jwt');`
				`var jwt = require('jsonwebtoken');`

				`app.use(expressJWT({
					secret: 'mySecretPasscode123!',
					})
					.unless({
						path: ['/login', '/api/cats']
						// these routes will not need a JWT token
					})
				);`

		+ In your routing, return the token:

				`User.find({})
					// (1) setup the token and pass payload and secret:
					var myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!')
						// jwt.sign({{payload}}, {{secret}})
						// {{secret}} must match secret in setup above.
					// (2) send back token:
					res.status(200).json(myToken);`

		+ Create Authorization Header:

				Must be in format:

				`Authorization: Bearer <<long-concat-string>>`

				See this page: https://docs.angularjs.org/api/ng/service/$http

				For how to use $http service and look at the heading, 'Setting HTTP Headers'. Basically, in your $http response, you'll need to add in your headers an Authorization response.

				`$http.defaults.headers.common.Authorization = "Bearer <<long-string>>"`

				-or using $httpProvider-

				`$httpProvider.defaults.headers.common.Authorization = "Bearer <<long-string>>"`
