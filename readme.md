# About
This is a programming Question and Answer discussion board powered by MEAN stack and using JSON Web Tokens for authentication. W3.CSS is used to style the front end, as a lightweight alternative to bootstrap.

Additionally Features:
- JSON Web Tokens used for authentication (along with an Angular interceptor)
- Dashboard table can be sorted by column headings, ascending or descending.
- Answers can be up voted or down voted, ordered by up votes.

## Setup & Install
- Be sure to `npm install` and `bower install` all packages.
- Create a `.env` file in the root project directory, and add the value:
	`TOKEN_SECRET={{HashCodeHere}}`
	Note: Replace `{{HashCodeHere}}` (including the brackets) with a long, randomized string. This string is used for JSON web token authentication purposes and should be kept private. This file should not be committed to public repositories, thus you have to generate your own at the start of this project.


## Some Issues:
- Bug where in Safari only, page load hangs after a user tries and access a back-end page without a valid token or being logged in. Note: I've tried posting on StackOverflow, and copied the entire program and dissected it. I attempted to remove the interceptor, the tokenizer service, various modules, and over and over again I received the same error. For now I have to step away from this project as I've sunk a lot of time. The program works as desired on all browsers other than Safari. And in Safari the bug is not experienced unless a user manually enters  back-end page (or tried to access it via a bookmark). Confusing and ... well... alas.
