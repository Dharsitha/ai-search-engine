@echo off
title MindRec AI Recommendation Engine
echo ========================================================
echo   MindRec - AI Recommendation Engine
echo   Frontend: ReactJS ^| Backend: Django REST Framework
echo ========================================================
echo.
cd /d "%~dp0backend"

set PYTHON_CMD=python
if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    set PYTHON_CMD="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
)

echo Using Python: %PYTHON_CMD%
echo.
echo Starting server on http://127.0.0.1:8000/ ...
echo Opening browser in 3 seconds...
start "" http://127.0.0.1:8000/
%PYTHON_CMD% manage.py runserver 127.0.0.1:8000
pause
