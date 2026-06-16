# CineStream - Movie Streaming Platform

A modern full-stack movie streaming application built with Next.js, Express.js, MongoDB, and Tailwind CSS. Stream movies with authentication, favorites management, and comprehensive filtering options.

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Movie Browsing**: Browse movies with a beautiful carousel showcase
- **Category Filtering**: Filter movies by genre (Action, Drama, Comedy, Horror, Thriller, Romance, Sci-Fi, Animation, Documentary, Adventure)
- **Movie Collections**:
  - New Movies (released after 2020)
  - Legacy Movies (released before 2020)
  - Featured movies carousel
- **User Features**:
  - Add/remove favorites
  - Watch history tracking
  - User profiles
- **Video Streaming**: Play sample videos directly in the application
- **Responsive Design**: Fully responsive design optimized for desktop and mobile
- **Dark Theme**: Premium dark theme with custom color palette (#000000, #1F150C, #412D15, #E1DCC9)

## Tech Stack

### Frontend

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **HTTP Client**: Fetch API with custom hooks
- **State Management**: React Context API
- **Icons**: Lucide React
- **Image**: Next.js Image component

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware

### DevTools

- **Package Manager**: pnpm
- **Concurrent Dev**: concurrently (run frontend and backend together)

## Project Structure

```
movie-streaming/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── page.tsx                 # Home page with carousel and movies
│   ├── globals.css              # Global styles with design tokens
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── profile/                 # User profile with favorites
│   ├── categories/              # Category browsing page
│   ├── new-movies/              # New releases page
│   ├── legacy/                  # Legacy movies page
│   └── movie/[id]/              # Movie detail page with video player
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── Carousel.tsx             # Featured movies carousel
│   └── MovieCard.tsx            # Movie card component
├── lib/
│   ├── auth-context.tsx         # Auth context and hooks
│   ├── api.ts                   # API client functions
│   └── utils.ts                 # Utility functions
├── server/                      # Express backend
│   ├── index.js                 # Main server file
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Movie.js            # Movie schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes (register, login)
│   │   ├── movies.js           # Movie routes (fetch, search, filter)
│   │   └── users.js            # User routes (favorites, watch history)
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   └── scripts/
│       └── seed.js             # Database seeding script
├── public/                      # Static assets
├── .env                         # Server environment variables
├── .env.local                   # Frontend environment variables
└── package.json                 # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. **Clone the repository** (or download the code)

```bash
cd movie-streaming
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/movie-streaming

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production

# Server Configuration
SERVER_PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Running the Application

#### Development Mode (Frontend + Backend)

```bash
pnpm dev
```

This will start:

- Next.js frontend on http://localhost:3000
- Express backend on http://localhost:5000

#### Seed Sample Data

Before using the app, populate the database with sample movies:

```bash
node server/scripts/seed.js
```

This will insert 10 sample movies into your MongoDB database.

### Testing the Application

1. **Open the browser** and go to http://localhost:3000
2. **Register a new account**:
   - Click "Sign Up"
   - Enter username, email, and password
   - Click "Create Account"

3. **Browse movies**:
   - Home page shows featured carousel (6 movies) and all movies
   - Click "New Movies" to see releases after 2020
   - Click "Legacy" to see older releases
   - Click "Categories" to filter by genre

4. **Watch a movie**:
   - Click on any movie card
   - Click "Watch Now" button to play the sample video
   - Video will play with standard controls

5. **Manage favorites**:
   - Click the heart icon on movie cards to add/remove favorites
   - Visit your profile to see all saved favorites

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Movies

- `GET /api/movies` - Get all movies (paginated)
- `GET /api/movies/featured` - Get featured movies (carousel)
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/category/:category` - Get movies by category
- `GET /api/movies/filter/new` - Get new movies (after 2020)
- `GET /api/movies/filter/legacy` - Get legacy movies (before 2020)
- `GET /api/movies/search?q=query` - Search movies

### User

- `POST /api/users/watch-history` - Update watch history
- `GET /api/users/watch-history` - Get watch history
- `POST /api/users/favorites/:movieId` - Add to favorites
- `DELETE /api/users/favorites/:movieId` - Remove from favorites
- `GET /api/users/favorites` - Get favorite movies
- `PUT /api/users/profile` - Update user profile

## Color Scheme

The application uses a premium dark theme with the following color palette:

- **Background**: #000000 (pure black)
- **Dark Brown**: #1F150C (card backgrounds)
- **Medium Brown**: #412D15 (primary accent)
- **Cream**: #E1DCC9 (text and highlights)

## Database Schema

### User

```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String
  },
  watchHistory: [{
    movieId: ObjectId,
    watchedAt: Date,
    progress: Number
  }],
  favorites: [ObjectId],
  createdAt: Date
}
```

### Movie

```javascript
{
  title: String,
  description: String,
  poster: String,
  backdrop: String,
  category: String,
  releaseDate: Date,
  duration: Number,
  rating: Number,
  actors: [{
    name: String,
    character: String
  }],
  director: String,
  videoUrl: String,
  featured: Boolean,
  views: Number,
  createdAt: Date
}
```

## Advanced Features

### Video Streaming

- Currently uses sample video URLs for demonstration
- To integrate real video hosting:
  1. Replace `videoUrl` with actual video links
  2. Consider using AWS S3, Cloudinary, or Vimeo
  3. Implement progressive download or HLS streaming for better performance

### Production Deployment

#### Environment Variables

Change these for production:

```env
JWT_SECRET=generate-a-strong-random-secret
MONGODB_URI=your-production-mongodb-url
NODE_ENV=production
```

#### Hosting Options

- **Frontend**: Deploy to Vercel, Netlify, or any static host
- **Backend**: Deploy to Heroku, Railway, DigitalOcean, or AWS

#### Database

- Use MongoDB Atlas for managed MongoDB hosting
- Implement regular backups
- Enable authentication and IP whitelisting

## Troubleshooting

### Port Already in Use

If port 5000 is in use:

```bash
# Change SERVER_PORT in .env file
SERVER_PORT=5001
```

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

- Ensure MongoDB is running locally, OR
- Update MONGODB_URI in .env to your MongoDB Atlas connection string

### CORS Errors

Ensure `.env` has correct URLs:

```env
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Movies Not Loading

1. Run seed script: `node server/scripts/seed.js`
2. Check MongoDB connection in `.env`
3. Verify backend is running on port 5000

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy streaming!** 🎬
