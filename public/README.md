# StudySync Frontend

A vanilla JavaScript frontend for the StudySync study planner application.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Study Plan Management**: Create, read, update, and delete study plans
- **Task Management**: Add, complete, and track study tasks
- **Status Tracking**: Track plans by status (Pending, In Progress, Completed)
- **Priority Levels**: Organize plans by priority (Low, Medium, High)
- **Filtering**: Filter study plans by status
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables and media queries
- **Vanilla JavaScript**: No frameworks or dependencies
- **Normalize.css**: Cross-browser consistency
- **Fetch API**: Async HTTP requests

## File Structure

```
public/
├── index.html          # Main HTML file
├── js/
│   ├── api.js          # API wrapper class
│   └── app.js          # Main application logic
└── css/
    └── styles.css      # Custom CSS with variables and responsive design
```

## Setup & Running

1. Ensure the backend server is running on `http://localhost:5000`
2. Open `index.html` in a web browser or serve using a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server package)
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`:

### Authentication Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (protected)

### Study Plan Endpoints

- `POST /study-plans` - Create study plan
- `GET /study-plans` - Get all study plans
- `GET /study-plans/:id` - Get specific study plan
- `PUT /study-plans/:id` - Update study plan
- `DELETE /study-plans/:id` - Delete study plan
- `POST /study-plans/:id/tasks` - Add task to plan
- `PUT /study-plans/:id/tasks/:taskId` - Update task

## CSS Architecture

The CSS follows a scalable structure with:

- **CSS Variables**: For colors, spacing, typography, and transitions
- **Responsive Design**: Mobile-first approach with breakpoints at 1024px, 768px, and 480px
- **Component Organization**: Grouped by sections (Typography, Buttons, Forms, Auth, Dashboard, etc.)
- **BEM-like Naming**: Clear, semantic class names
- **No Dependencies**: Pure CSS, no Bootstrap or frameworks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Features Breakdown

### Authentication

- Register new account with email and password
- Login with email and password
- JWT token-based session management
- Automatic redirect based on auth state

### Study Plans

- Create new study plans with title, subject, due date, priority, and description
- View all study plans in grid layout
- Filter plans by status
- Click to view plan details
- Edit existing plans
- Delete plans with confirmation
- Track plan status (Pending, In Progress, Completed)

### Tasks

- Add tasks to study plans
- Mark tasks as complete/incomplete
- Visual feedback for completed tasks
- Task list management

## Responsive Breakpoints

- **Desktop**: 1024px+ (sidebar, full layout)
- **Tablet**: 768px - 1023px (flexible grid, adjusted spacing)
- **Mobile**: Below 768px (single column, stacked layout)
- **Small Mobile**: Below 480px (further optimized spacing and font sizes)

## Local Storage

The app uses browser local storage to persist:

- JWT authentication token
- User profile information

This allows users to stay logged in across sessions.
