#MEAN Discussion Board:

##Dashboard Page:
	+ Search Box
	+ Table:
		+ Category
		+ Topic (newest to oldest)
		+ User name
			+ Link to profile page
		+ Posts
			+ This counts # of posts (comments) for each topic
	+ Add a new topic form:
		+ Input Field: topic
		+ Textfield: description
		+ Category drop down (pre-choose 5 DB categories)
		+ Button: 'Submit'
	+ Clicking a topic brings you to the proper page

##Topic Page:
	+ `/#!/topic/:id`
	+ Show post
	+ Form:
		+ Textfield: comment
		+ Button: 'Comment'
	+ Beneath comments, have up vote or down vote-ability
	+ Clicking username redirects to that user's profile

##Profile Page:
	+ `/#!/user/:id`
	+ Show username
	+ Dashboard Link
	+ Logout Link
	+ Text: Posted...
		+ # of topics
		+ # of Posts
		+ # of comments

##Basic Questions to Start:

	1. How many partials do you need?
		Answer: 4 partials, 1 root HTML file

	2. How many angular controllers do you need?
		Answer: 4, one for each partial.

	3. How many angular factories do you need?
		Answer: 4, one for each partial (you could do all one but let's modularize)

	4. How many server side controllers do you need?
		Answer: 3, users, posts, comments. Note: you could do one controller if you really wanted
		but modularizing seems like a good idea.

	5. How many models do you need?
		Answer: 3, `User`, `Post`, `Comment`

	6. Define your models:
		! Use Timestamps with all Models !:

		`User`:
			+ username: String,
		`Post`:
			+ title: String,
			+ description: String,
			+ category: Schema.Type.ObjID,
				Note: This could be an array,
				but if you want to keep it simple,
				just keep it as such
			+ posts: Number,
				Note: This will be a number that will
				be associated with how many comments
				are created.
		`Comment`
			+ description: String,
			+ user: Schema.Type.ObjID,
			+ post: Schema.Type.ObjID,
			+ upVote: Number,
			+ downVote: Number,

	7. JSON Web Tokens:

		1. Setup the app to use jwt packages:

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

		2. In your routing, return the token:

		`User.find({})
			// (1) setup the token and pass payload and secret:
			var myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!')
				// jwt.sign({{payload}}, {{secret}})
				// {{secret}} must match secret in setup above.
			// (2) send back token:
			res.status(200).json(myToken);`

		3. Create Authorization Header:

		Must be in format:

		`Authorization: Bearer <<long-concat-string>>`

		See this page: https://docs.angularjs.org/api/ng/service/$http

		For how to use $http service and look at the heading, 'Setting HTTP Headers'. Basically, in your $http response, you'll need to add in your headers an Authorization response.

		`$http.defaults.headers.common.Authorization = "Bearer <<long-string>>"`

		-or using $httpProvider-

		`$httpProvider.defaults.headers.common.Authorization = "Bearer <<long-string>>"`

	8. PassportJS:

		http://passportjs.org/docs

	9. Strategy:

			- Get Login Form Working
			- Get JWTs Working
			- Get Passport Working
			- Get Create Post Working
			- Get Create Comment Working
			- Get Show User Profile Working


##Questions During Development:

	1. How do I get my JWT's to persist after login?

		Right now, when you goto '/dashboard' without logging in or registering,
		the lack of the JWT is triggered and the user is redirected to '/'.

		However, even after logging in, despite the `/dashboard` page loading,
		any page refresh will trigger the lack of JWT and re-load `/`

		Question: Is there any way to persist the JWT so refresh does not redir?

##Where I Left Off:

	+ Retrieve Posts finished. Still need to link up post titles and usernames
	+ Need to add in sorting for categories and topics and username
	+ Build user profile page
	+ Build Comment Model and increment `post.commentCounter` when created

	Question: Why are category drop downs disappearing when page reloads?
