# About
This is a programming Question and Answer discussion board powered by MEAN stack using JSON Web Tokens. W3.CSS is used to style the front end, as a lightweight alternative to bootstrap.

Additionally Features:
- Question table can be sorted by various column headings.
- Answers can be up voted or down voted.

## Some Issues:

	+ JWTs seem to time out quicker than something like session. What's going on here?
		- Seems that as each controller loads, you'll have to do another JWT authorization. Was playing around and resolved issues on `/dashboard`, however `/answer/:id` and `/user/:id` pages are not acting as expected. Need to continue to experiment why JWT is not working properly.
	+ See if you can refactor/cleanup code.

### Dev Issues Log (recorded for learning purposes):

	- Nested use of `ng-repeat`:

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

	- Setting up JSON Web Tokens:

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

	- Column Arranging and Sorting: This one was complicated, but how do you toggle the sorting of a column?
	If you look at `/_dashboard.html` and the `angular-dashboard-controller`, you'll see that we use a few scope
	functions and some usages of `ng-click` and `ng-class`, along with a `<span>` to get our display to work properly.

		+ See Angular's documentation if the example in the code in those files is not sufficient. Note that this project uses
		font-awesome, thus the fact that the icons are available via `class` (becuase we are using it conjunction with W3.CSS)

		+ See example at the bottom: https://docs.angularjs.org/api/ng/filter/orderBy
