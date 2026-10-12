@echo off
title Fitness Tracker - Backend (Port 8080)
cd /d "%~dp0backend"
echo ===================================================
echo Starting Fitness Tracker Spring Boot Backend (8080)
echo ===================================================
java -jar target\fitness-tracker-backend-1.0.0.jar
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Running via Maven fallback...
    mvn spring-boot:run
)
pause
