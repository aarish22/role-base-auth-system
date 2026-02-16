# Role-Based Authentication System

A Node.js backend application implementing role-based authentication and authorization for a music platform. This system allows users and artists to register, login, and perform role-specific actions such as uploading music and creating albums.

## 🚀 Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Role-Based Authorization**: Two user roles - `user` and `artist`
- **Music Management**: Artists can upload music tracks and create albums
- **File Upload**: Integration with ImageKit for file storage
- **Cookie-Based Sessions**: Secure JWT token storage in HTTP cookies
- **Password Security**: Bcrypt hashing for password encryption
- **MongoDB Database**: Mongoose ODM for data modeling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [ImageKit Account](https://imagekit.io/) (for file storage)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd role_base_auth_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Start the application**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or your configured PORT).

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

## 🧪 Testing

To test the API endpoints, you can use tools like:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- [cURL](https://curl.se/)

Example cURL request:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- Express.js for the robust web framework
- MongoDB for the flexible database solution
- ImageKit for file storage services
