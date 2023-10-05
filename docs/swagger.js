
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





/* ---------------------> Routes <---------------------*/

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

