# Task Manager

A modern, full-stack task management application built with Django REST Framework and React.

## 🚀 Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive user interface
- RESTful API backend
- Simple and intuitive design

## 🛠️ Technology Stack

### Backend
- **Django**: Web framework
- **Django REST Framework**: API development
- **SQLite**: Database
- **django-cors-headers**: CORS handling

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **Axios**: HTTP client
- **CSS**: Styling

## 📁 Project Structure

```
task_manager_project/
├── backend/              # Django backend
│   ├── backend/         # Project configuration
│   ├── tasks/          # Tasks app
│   └── manage.py       # Django CLI
└── frontend/            # React frontend
    ├── src/            # Source files
    ├── public/         # Static files
    └── package.json    # Dependencies
```

## 🚀 Getting Started

### Backend Setup (Windows)

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create and activate virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
   Alternatively:
   ```powershell
   pip install django djangorestframework django-cors-headers
   ```

4. Run migrations and start server:
   ```powershell
   python manage.py migrate
   python manage.py runserver 8000
   ```

The API will be available at: `http://127.0.0.1:8000/`

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies and start development server:
   ```powershell
   npm install
   npm run dev
   ```

Access the application at: `http://localhost:5173/`

## 🔌 API Reference

| Endpoint | Method | Description | Request Body |
|----------|--------|-------------|--------------|
| `/tasks/` | GET | List all tasks | - |
| `/tasks/` | POST | Create new task | `{"title": "string", "description": "string"}` |
| `/tasks/{id}/` | GET | Retrieve task | - |
| `/tasks/{id}/` | PUT | Update task | `{"title": "string", "description": "string"}` |
| `/tasks/{id}/` | PATCH | Toggle completion | `{"completed": boolean}` |
| `/tasks/{id}/` | DELETE | Delete task | - |

## ⚠️ Development Notes

- CORS is currently configured to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`). This should be restricted in production.
- Authentication is not implemented in this version.s