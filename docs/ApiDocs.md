# API Documentation

## Welcome Route

| Route           | Endpoint | Description                            | Features          |
| --------------- | -------- | -------------------------------------- | ----------------- |
| Welcome Message | GET /    | Provides a welcome message to the API. | - Welcome message |

## Swagger Docs

| Route           | Endpoint      | Description                       | Features          |
| --------------- | ------------- | --------------------------------- | ----------------- |
| Welcome Message | GET /api-docs | Provides a Documentation for API. | - Welcome message |

## Users

| Route           | Endpoint                       | Description                                                                                              | Features                               |
| --------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Register User   | POST /user/register            | Register a new user with provided credentials.                                                           | - User registration                    |
| Login User      | POST /user/login               | Authenticate and log in a user with JWT token.                                                           | - User login with JWT token            |
| Logout User     | POST /user/logout              | Blacklist the token to log out the user securely.(user Must Logged in)                                   | - Secure token blacklisting            |
| Borrow Book     | POST /user/borrow/:bookId      | User can Borrow a book from Library.(user Must Logged in)                                                | - Borrow book using bookId             |
| Return Book     | POST /user/return/:bookId      | User can Return a book which he/she borrowed .(user Must Logged in)                                      | - Return book using bookId             |
| History         | GET /user/book/:bookId/history | User can get the track of borrowing and returning the book by bookId.(user Must Logged in)               | - Get track of Borrowing and Returning |
| Recommendations | GET /user/recommendations      | User get the books recommendations based on his previous borrowing(if applicable).(user Must Logged in)  | - Get recommendations of books         |  

## Admin (Admin Only - Must Login with admin credentials - Dummy Admin Credentials:-{"email":"admin@gmail.com","password":"indigg"})

| Route                    | Endpoint                          | Description                                                                   | Features                       |
| ------------------------ | --------------------------------- | ----------------------------------------------------------------------------- | ------------------------------ |
| Add New Book             | POST /admin/book/add              | Add a new book to the library. (Must Login with admin credentials )           | - Book creation                |
| Update Existing Book     | PATCH /admin/book/update/:bookId  | Update details of already existing book. (Must Login with admin credentials)  | - Update already exists book   |
| Delete Existing Book     | DELETE /admin/book/delete/:bookId | Delete details of already existing book. (Must Login with admin credentials ) | - Delete already exists book   |


## Books

| Route                      | Endpoint                        | Description                                 | Features                      |
| -------------------------- | ------------------------------- | ------------------------------------------- | ----------------------------- |
| Get Books List             | GET /book                       | Retrive Paginated Book list                 | - Paginated Books List        |
| Search Books with Keywords | GET /book/search                | Search Books with Keywords                  | - Search Books From Database  |



```javascript
app.get("/",async(req,res)=>{
    try {
        res.status(200).send({ok:true,message:"Welcome to INDI.GG Backend Assignment!"})
    } catch (error) {
        res.status(501).send({ok:false,error:error.message})
    }
});