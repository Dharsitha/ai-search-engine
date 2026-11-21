Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  MindRec - AI Recommendation Engine" -ForegroundColor Cyan
Write-Host "  Frontend: ReactJS | Backend: Django REST Framework" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Set-Location "$PSScriptRoot\backend"

$pythonPath = "python"
if (Test-Path "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe") {
    $pythonPath = "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe"
}

Write-Host "Starting MindRec Server on http://127.0.0.1:8000/ ..." -ForegroundColor Green
Start-Process "http://127.0.0.1:8000/"
& $pythonPath manage.py runserver 127.0.0.1:8000
