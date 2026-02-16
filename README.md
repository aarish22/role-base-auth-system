# Role-Based Authentication System

A Node.js backend application implementing role-based authentication and authorization for a music platform. This system allows users and artists to register, login, and perform role-specific actions such as uploading music and creating albums.

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Role-Based Authorization**: Two user roles - `user` and `artist`
- **Music Management**: Artists can upload music tracks and create albums
- **File Upload**: Integration with ImageKit for file storage
- **Cookie-Based Sessions**: Secure JWT token storage in HTTP cookies
- **Password Security**: Bcrypt hashing for password encryption
- **MongoDB Database**: Mongoose ODM for data modeling

## 📁 Project Structure

```
role_base_auth_system/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── controllers/              # Request handlers
│   │   ├── auth.controller.js    # Authentication logic
│   │   └── music.controller.js   # Music management logic
│   ├── db/
│   │   └── db.js                 # MongoDB connection
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT authentication middleware
│   ├── models/                   # Mongoose schemas
│   │   ├── user.model.js         # User schema
│   │   ├── music.model.js        # Music schema
│   │   └── album.model.js        # Album schema
│   ├── routes/                   # API routes
│   │   ├── auth.routes.js        # Authentication routes
│   │   └── music.routes.js       # Music routes
│   └── services/
│       └── storage.service.js    # ImageKit file upload service
├── server.js                     # Application entry point
├── package.json                  # Dependencies and scripts
└── .env                          # Environment variables
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "user" | "artist"
  }
  ```
- **Response**: User details and JWT token (set as cookie)

#### Login User
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "username": "string",  // or email
    "email": "string",     // or username
    "password": "string"
  }
  ```
- **Response**: User details and JWT token (set as cookie)

### Music Routes (`/api/music`)

#### Create Music (Artist Only)
- **POST** `/api/music/create`
- **Headers**: `Cookie: token=<jwt_token>`
- **Body**: `multipart/form-data`
  - `title`: string
  - `file`: audio file
- **Response**: Created music details
- **Auth**: Requires artist role

#### Create Album (Artist Only)
- **POST** `/api/music/album`
- **Headers**: `Cookie: token=<jwt_token>`
- **Body**:
  ```json
  {
    "title": "string",
    "musicIds": ["musicId1", "musicId2"]
  }
  ```
- **Response**: Created album details
- **Auth**: Requires artist role

#### Get All Music (User Only)
- **GET** `/api/music/all`
- **Headers**: `Cookie: token=<jwt_token>`
- **Response**: List of all music tracks
- **Auth**: Requires user role

## 🔒 Authentication & Authorization

### JWT Token
- Tokens are generated upon registration and login
- Stored in HTTP-only cookies for security
- Token expiration: 1 hour
- Payload includes: `{ id: userId, role: userRole }`

### Role-Based Middleware
- `authArtist`: Protects routes that only artists can access
- `authUser`: Protects routes that only users can access

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Plain text passwords are never stored in the database

## 🗃️ Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'artist'], default: 'user')
}
```

### Music Model
```javascript
{
  uri: String (required),
  title: String (required),
  artist: ObjectId (ref: 'User', required)
}
```

### Album Model
```javascript
{
  title: String (required),
  musics: [ObjectId] (ref: 'Music'),
  artist: ObjectId (ref: 'User', required)
}
```



## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing
- **cookie-parser**: Parse HTTP cookies
- **multer**: File upload handling
- **@imagekit/nodejs**: ImageKit integration
- **dotenv**: Environment variable management

