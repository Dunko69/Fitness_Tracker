# 🏋️‍♂️ FitTrack - Modern Fitness & Calorie Tracker

A clean, full-stack **Fitness & Calorie Tracker** web application engineered for computer science semester projects and portfolio demonstrations. 

**Location:** `E:\Techincal\fitness-tracker`

Built with **Java 17**, **Spring Boot 3**, **Spring Data JPA**, an embedded **H2 In-Memory Database** (zero database setup required), and a responsive **React + Vite** frontend.

---

## 🌟 Key Features

1. **User Authentication & Goal Customization**:
   - Secure login and registration with validation (username, email, password).
   - Configurable **Daily Calorie Goal** (e.g. 2,000 kcal) customized per user profile and editable at any time.
   - Built-in **Demo Account** (`demo` / `password123`) with pre-seeded sample data for immediate project demonstration.

2. **Daily Meal & Nutrition Tracker**:
   - Log meals with **Food Name**, **Calories (kcal)**, **Protein (g)**, **Meal Type** (Breakfast, Lunch, Dinner, Snack), and **Date**.
   - View daily meals table with dynamic badges.
   - Full **CRUD** support: Edit meal entries and delete with real-time UI updates.

3. **Daily Exercise & Workout Tracker**:
   - Log workouts with **Exercise Name**, **Duration (mins)**, **Calories Burned (kcal)**, and **Category** (Cardio, Strength, HIIT, Sports, Yoga).
   - View daily exercise table with color-coded categories.
   - Full **CRUD** support: Edit and delete workout logs.

4. **Progress Metrics & Visual Progress Bar**:
   - **Visual Progress Bar**: Real-time visual indicator comparing **Total Calories Consumed vs. Daily Calorie Goal** with dynamic color stages (Green on track, Amber approaching goal, Rose exceeded).
   - **Net Calories Formula**: Accurately computes `Net Calories = (Calories Consumed - Calories Burned)` to clearly indicate calorie deficit or surplus.
   - Metric cards displaying: Target Goal, Consumed, Burned, Net Calories, and Total Protein (g).

5. **Date Navigator**:
   - Navigate backwards and forwards through dates or select any date using the date picker.
   - One-click button to jump back to **Today**.

6. **Embedded Database & Zero Setup**:
   - Uses an in-memory **H2 Database** configured with Spring Boot.
   - Includes **H2 Web Console** at `http://localhost:8080/h2-console` to inspect tables and execute SQL queries.

---

## 🏗️ Architecture & Technology Stack

```
fitness-tracker/
├── backend/                  # Spring Boot 3 Java Backend
│   ├── pom.xml               # Maven dependencies (Web, JPA, H2, Validation)
│   └── src/main/
│       ├── java/com/fitnesstracker/
│       │   ├── FitnessTrackerApplication.java
│       │   ├── config/       # CORS, DataLoader, Exception Handling
│       │   ├── controller/   # REST API Controllers (@RestController)
│       │   ├── dto/          # Data Transfer Objects
│       │   ├── model/        # JPA Entities (@Entity)
│       │   ├── repository/   # Spring Data Repositories (@Repository)
│       │   └── service/      # Business Logic Services (@Service)
│       └── resources/
│           └── application.properties # H2 & JPA settings
└── frontend/                 # React + Vite Frontend
    ├── package.json
    ├── vite.config.js        # Port 3000 & reverse proxy
    ├── index.html
    └── src/
        ├── App.jsx           # Main state coordinator
        ├── index.css         # Modern responsive CSS styling
        ├── api/fitnessApi.js # Fetch client for Spring Boot REST API
        └── components/       # Modular UI components (Summary, Trackers, Modals)
```

- **Backend**:
  - Java 17 LTS
  - Spring Boot 3.2.5
  - Spring Data JPA / Hibernate
  - H2 Database (In-Memory `jdbc:h2:mem:fitnessdb`)
  - Spring Validation (`jakarta.validation`)
- **Frontend**:
  - React 18
  - Vite 5
  - Lucide React (Icons)
  - Pure Modern CSS (CSS Variables, Flexbox, Grid, Responsive)

---

## 🚀 How to Run the Application

### Prerequisites
- **Java Development Kit (JDK) 17+**: Verify with `java -version`
- **Apache Maven 3.8+**: Verify with `mvn -version`
- **Node.js 18+ and npm**: Verify with `node -v` and `npm -v`

---

### Step 1: Start the Spring Boot Backend

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

3. The backend will compile and start on port **8080**:
   - REST API Base URL: `http://localhost:8080/api`
   - H2 Database Console: `http://localhost:8080/h2-console`
     - **JDBC URL**: `jdbc:h2:mem:fitnessdb`
     - **User Name**: `sa`
     - **Password**: *(leave blank)*

> **Pre-seeded Demo Account**:
> The backend automatically seeds a demo account upon startup:
> - **Username**: `demo`
> - **Password**: `password123`
> - Pre-loaded with sample meals and exercises for today!

---

### Step 2: Start the React Frontend

1. Open a second terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

5. Log in with the **Demo Account** button or create your own custom account!

---

## 📡 RESTful API Documentation

| HTTP Method | Endpoint | Description |
|:---|:---|:---|
| **POST** | `/api/auth/register` | Register a new user with username, password, email, and calorie goal |
| **POST** | `/api/auth/login` | Authenticate existing user |
| **GET** | `/api/auth/profile/{userId}` | Retrieve user profile & daily calorie goal |
| **PUT** | `/api/auth/profile/{userId}/goal` | Update user daily calorie target |
| **GET** | `/api/meals/user/{userId}?date=YYYY-MM-DD` | Retrieve logged meals (optionally filtered by date) |
| **POST** | `/api/meals` | Log a new meal (`foodName`, `calories`, `protein`, `mealType`, `date`, `userId`) |
| **PUT** | `/api/meals/{id}` | Edit / update an existing meal |
| **DELETE** | `/api/meals/{id}` | Delete a meal by ID |
| **GET** | `/api/workouts/user/{userId}?date=YYYY-MM-DD` | Retrieve logged workouts (optionally filtered by date) |
| **POST** | `/api/workouts` | Log a new workout (`exerciseName`, `durationMinutes`, `caloriesBurned`, `category`, `date`, `userId`) |
| **PUT** | `/api/workouts/{id}` | Edit / update an existing workout |
| **DELETE** | `/api/workouts/{id}` | Delete a workout by ID |
| **GET** | `/api/summary/user/{userId}?date=YYYY-MM-DD` | Get daily summary (Goal, Consumed, Burned, Net Calories, Protein, Progress %) |

---

## 🗄️ Database Schema (H2 In-Memory)

### 1. `users` Table
- `id` (BIGINT, Primary Key, Auto-increment)
- `username` (VARCHAR(50), Unique, Not Null)
- `password` (VARCHAR(255), Not Null)
- `email` (VARCHAR(100), Not Null)
- `daily_calorie_goal` (INT, Default 2000)
- `created_at` (TIMESTAMP)

### 2. `meals` Table
- `id` (BIGINT, Primary Key, Auto-increment)
- `food_name` (VARCHAR(255), Not Null)
- `calories` (INT, Not Null)
- `protein` (DOUBLE, Not Null)
- `meal_type` (VARCHAR(50))
- `date` (DATE, Not Null)
- `user_id` (BIGINT, Foreign Key referencing `users(id)`)

### 3. `workouts` Table
- `id` (BIGINT, Primary Key, Auto-increment)
- `exercise_name` (VARCHAR(255), Not Null)
- `duration_minutes` (INT, Not Null)
- `calories_burned` (INT, Not Null)
- `category` (VARCHAR(50))
- `date` (DATE, Not Null)
- `user_id` (BIGINT, Foreign Key referencing `users(id)`)

---

## 🎓 Computer Science Semester Project Highlights
- **Layered Architecture**: Clear separation of concerns between Controller, Service, and Repository layers.
- **DTO Pattern**: Separation of internal database entities from external API request/response models.
- **Exception Handling**: Global exception handler (`@RestControllerAdvice`) delivering clean and informative JSON error payloads.
- **CORS Configuration**: Fully enabled cross-origin resource sharing allowing independent decoupled frontend and backend hosting.
- **Instant Deployment**: In-memory database with automatic schema generation and data seeding eliminates database configuration overhead during project evaluations.
