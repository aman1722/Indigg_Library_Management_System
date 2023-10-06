
/*-----------> Schemas <--------------*/

/* ---------------------> Authorization Schema <---------------------*/
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/


/* ---------------------> Users Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The unique identifier for the user(Created by mongodb by default).
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           description: The role of the user(Default Value is "user" if want admin rights So provide role as "admin")
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: Indigg
 *         email: indigg@gmail.com
 *         password: indigg
 */


/* ---------------------> Book Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         ISBN:
 *           type: string
 *           description: The ISBN of the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         genre:
 *           type: string
 *           description: The genre of the book.
 *         published_year:
 *           type: integer
 *           description: The year the book was published.
 *         quantity:
 *           type: integer
 *           description: The quantity of the book available.
 *         userId:
 *           type: ObjectId
 *           description: The unique identifier of the user who owns this book.
 *       required:
 *         - ISBN
 *         - title
 *         - author
 *         - genre
 *         - published_year
 *         - quantity
 *         - userId
 *       example:
 *         ISBN: "978-1234567890"
 *         title: "Sample Book"
 *         author: "John Doe"
 *         genre: "Fiction"
 *         published_year: 2022
 *         quantity: 10
 *         userId: "609c6e7f1c22225f0c88f6a1" 
 */


/* ---------------------> BookLog Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     BookLog:
 *       type: object
 *       properties:
 *         user:
 *           type: ObjectId
 *           description: The unique identifier of the user associated with the book log.
 *         book:
 *           type: ObjectId
 *           description: The unique identifier of the book associated with the book log.
 *         action:
 *           type: string
 *           description: The action performed in the book log, which can be 'borrow' or 'return'.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the book log was created. (Default is the current date and time).
 *       required:
 *         - user
 *         - book
 *         - action
 *       example:
 *         user: "609c6e7f1c22225f0c88f6a1" 
 *         book: "609c6e7f1c22225f0c88f6a2" 
 *         action: "borrow"
 *         timestamp: "2023-10-06T14:30:00Z" 
 */


/* ---------------------> Blacklist Token Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     BlacklistToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           unique: true
 *           description: The blacklisted token.
 *       required:
 *         - token
 *       example:
 *         token: "your_blacklisted_token_here"
 */









/* ---------------------> Routes <---------------------*/

/* ---------------------> Home Routes <---------------------*/
/**
 * @swagger
 * paths:
 *   /:
 *     get:
 *       summary: Welcome message
 *       description: Returns a welcome message for the INDI.GG Backend Assignment.
 *       tags: [Home]
 *       responses:
 *         200:
 *           description: Welcome message retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   message: Welcome to INDI.GG Backend Assignment!
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   error:
 *                     type: string
 *                 example:
 *                   ok: false
 *                   error: Internal server error.
 */



/* ---------------------> Users Routes <---------------------*/

// Register
/**
 * @swagger
 * paths:
 *   /user/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: User Registration Successful
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 *         400:
 *           description: Bad Request. User already exist.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: User already exist
 */



// Login
/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       summary: Authenticate and log in an existing user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *               required:
 *                 - email
 *                 - password
 *               example:
 *                 email: indigg@gmail.com
 *                 password: indigg
 *       responses:
 *         200:
 *           description: Login Successful. Returns an access token.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                   token:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Login Successful
 *                   token: your-access-token-here
 *         400:
 *           description: Bad Request. User does not exist or incorrect password.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: User does not exist or incorrect password.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


//Logout

/**
 * @swagger
 * paths:
 *   /user/logout:
 *     post:
 *       summary: Log out an existing user
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Logout successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                     description: Indicates if the logout was successful.
 *                     example: true
 *                   msg:
 *                     type: string
 *                     description: Logout success message.
 *                     example: Logout successful
 *         '501':
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */

//borrow a book
/**
 * @swagger
 * paths:
 *   /user/borrow/{bookId}:
 *     post:
 *       summary: Borrow a book by book ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           description: The ID of the book to borrow.
 *           schema:
 *             type: string
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Book borrowed successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Book borrowed successfully.
 *         400:
 *           description: Bad Request. The book is not available for borrowing, or the user has reached the maximum limit of borrowed books (3 books).
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: The book is not available for borrowing.
 *         404:
 *           description: Not Found. The book with the provided ID does not exist.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Book not found.
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


// return a book
/**
 * @swagger
 * paths:
 *   /user/return/{bookId}:
 *     post:
 *       summary: Return a borrowed book by book ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           description: The ID of the book to return.
 *           schema:
 *             type: string
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Book returned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Book returned successfully.
 *         400:
 *           description: Bad Request. You have not borrowed this book, or the user or book does not exist.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: You have not borrowed this book.
 *         404:
 *           description: Not Found. User or book not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: User or book not found.
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */



//history
/**
 * @swagger
 * paths:
 *   /user/book/{bookId}/history:
 *     get:
 *       summary: Get the borrowing and return history of a specific book for a user
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           description: The ID of the book to retrieve the history for.
 *           schema:
 *             type: string
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: The borrowing history of the book for the user.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: ObjectId
 *                       description: The unique identifier of the user.
 *                     book:
 *                       type: ObjectId
 *                       description: The unique identifier of the book.
 *                     action:
 *                       type: string
 *                       description: The action performed in the book log, which can be 'borrow' or 'return'.
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the book log was created.
 *                   example:
 *                     - user: "609c6e7f1c22225f0c88f6a1"
 *                       book: "609c6e7f1c22225f0c88f6a2"
 *                       action: "borrow"
 *                       timestamp: "2023-10-06T14:30:00Z"
 *         404:
 *           description: Not Found. User or book not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: User or book not found.
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         500:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: Internal server error.
 */



// recommendations
/**
 * @swagger
 * paths:
 *   /user/recommendations:
 *     get:
 *       summary: Get book recommendations for a user based on their borrowing history(if user borrow some book in past)
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: List of recommended books for the user.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *         404:
 *           description: Not Found. User not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: User not found.
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         500:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: Internal server error.
 */



/* ---------------------> Admin Routes <---------------------*/

//add
/**
 * @swagger
 * paths:
 *   /admin/book/add:
 *     post:
 *       summary: Add a new book to the library (Admin Only - Must Login with admin credentials - Dummy Admin Credentials:-{"email":"admin@gmail.com","password":"indigg"})
 *       tags: [Admin]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ISBN:
 *                   type: string
 *                   description: The ISBN of the book.
 *                 title:
 *                   type: string
 *                   description: The title of the book.
 *                 author:
 *                   type: string
 *                   description: The author of the book.
 *                 genre:
 *                   type: string
 *                   description: The genre of the book.
 *                 published_year:
 *                   type: number
 *                   description: The year the book was published.
 *                 quantity:
 *                   type: number
 *                   description: The quantity of the book to add.
 *               required:
 *                 - ISBN
 *                 - title
 *                 - author
 *                 - genre
 *                 - published_year
 *                 - quantity
 *               example:
 *                 ISBN: "1234567890"
 *                 title: "Sample Book"
 *                 author: "John Doe"
 *                 genre: "Biography"
 *                 published_year: 2022
 *                 quantity: 10
 *       responses:
 *         201:
 *           description: New book added to the library.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: New Book Added!
 *         200:
 *           description: Book already exists. Updated the book quantity.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Book Already Exists! Updated the book Quantity!
 *         400:
 *           description: Bad Request. All fields are required.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: false
 *                   msg: All Fields are Required!
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


//update
/**
 * @swagger
 * paths:
 *   /admin/book/update/{bookId}:
 *     patch:
 *       summary: Update book details (Admin Only - Must Login with admin credentials - Dummy Admin Credentials:-{"email":"admin@gmail.com","password":"indigg"})
 *       tags: [Admin]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           description: The ID of the book to update.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ISBN:
 *                   type: string
 *                   description: The ISBN of the book.
 *                 title:
 *                   type: string
 *                   description: The title of the book.
 *                 author:
 *                   type: string
 *                   description: The author of the book.
 *                 genre:
 *                   type: string
 *                   description: The genre of the book.
 *                 published_year:
 *                   type: number
 *                   description: The year the book was published.
 *                 quantity:
 *                   type: number
 *                   description: The quantity of the book to add.
 *               example:
 *                 ISBN: "1234567890"
 *                 title: "Sample Book"
 *                 author: "John Doe"
 *                 genre: "Biography"
 *                 published_year: 2022
 *                 quantity: 10
 *       responses:
 *         200:
 *           description: Book details updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Book Details Updated
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


// delete 

/**
 * @swagger
 * paths:
 *   /admin/book/delete/{bookId}:
 *     delete:
 *       summary: Delete a book from the library (Admin Only - Must Login with admin credentials - Dummy Admin Credentials:-{"email":"admin@gmail.com","password":"indigg"})
 *       tags: [Admin]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           description: The ID of the book to delete.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Book deleted successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Book Deleted
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */




/* ---------------------> Book Routes <---------------------*/
//get book list
/**
 * @swagger
 * paths:
 *   /book/:
 *     get:
 *       summary: Get a paginated list of books
 *       tags: [Books]
 *       parameters:
 *         - in: query
 *           name: page
 *           required: false
 *           description: The page number for pagination (default is 1).
 *           schema:
 *             type: integer
 *           example: 1
 *         - in: query
 *           name: limit
 *           required: false
 *           description: The number of books to fetch per page (default is 4).
 *           schema:
 *             type: integer
 *           example: 4
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: List of books fetched successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   books:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ISBN:
 *                           type: string
 *                           description: The ISBN of the book.
 *                         title:
 *                           type: string
 *                           description: The title of the book.
 *                         author:
 *                           type: string
 *                           description: The author of the book.
 *                         genre:
 *                           type: string
 *                           description: The genre of the book.
 *                         published_year:
 *                           type: number
 *                           description: The year the book was published.
 *                         quantity:
 *                           type: number
 *                           description: The quantity of the book available in the library.
 *                       example:
 *                         ISBN: "1234567890"
 *                         title: "Sample Book"
 *                         author: "John Doe"
 *                         genre: "Fiction"
 *                         published_year: 2022
 *                         quantity: 10
 *                   currentPage:
 *                     type: integer
 *                   totalPages:
 *                     type: integer
 *                 example:
 *                   ok: true
 *                   books: 
 *                     - // Book object 1
 *                     - // Book object 2
 *                   currentPage: 1
 *                   totalPages: 5
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


// search
/**
 * @swagger
 * paths:
 *   /book/search:
 *     get:
 *       summary: Search for books by title, author, or ISBN(Any key words regards these fields)
 *       tags: [Books]
 *       parameters:
 *         - in: query
 *           name: searchTerm
 *           required: true
 *           description: The search term to match against book titles, authors, or ISBNs(Any key words regards these fields).
 *           schema:
 *             type: string
 *           example: "Sample Book"
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: List of books matching the search term.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                      ISBN:
 *                        type: string
 *                        description: The ISBN of the book.
 *                      title:
 *                        type: string
 *                        description: The title of the book.
 *                      author:
 *                        type: string
 *                        description: The author of the book.
 *                      genre:
 *                        type: string
 *                        description: The genre of the book.
 *                      published_year:
 *                         type: number
 *                         description: The year the book was published.
 *                      quantity:
 *                         type: number
 *                         description: The quantity of the book available in the library.
 *                 example:
 *                   - ISBN: "1234567890"
 *                     title: "Sample Book"
 *                     author: "John Doe"
 *                     genre: "Fiction"
 *                     published_year: 2022
 *                     quantity: 10
 *         400:
 *           description: Bad Request. Search term is required.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: Search term is required.
 *         401:
 *           description: Unauthorized. Session Expired. Please login again.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Session Expired! Please login again.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                 example:
 *                   error: Internal server error.
 */

