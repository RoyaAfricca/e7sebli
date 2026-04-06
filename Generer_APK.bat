@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

:: ===================================================================
:: Generer_APK.bat
:: Etapes : build web -> sync Capacitor -> assembleRelease (signe)
:: ===================================================================

set "ROOT=%~dp0"
set "ANDROID_DIR=%ROOT%android"
set "DIST_DIR=%ROOT%dist"
set "OUTPUT_DIR=%ROOT%apk_output"

set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Users\solta\AppData\Local\Android\Sdk"
set "ANDROID_SDK_ROOT=C:\Users\solta\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo ======================================================
echo           E7sebli - Generateur APK Signe          
echo ======================================================
echo.

echo [1/5] Verification des prerequis...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js introuvable. Installez Node.js.
    goto :ERROR
)
for /f "tokens=*" %%v in ('node --version') do echo [OK] Node.js %%v

where npm >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] npm introuvable.
    goto :ERROR
)

where java >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Java introuvable. Installez JDK.
    goto :ERROR
)
for /f "tokens=*" %%v in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    echo [OK] Java : %%v
    goto :JAVA_OK
)
:JAVA_OK
echo [OK] Prerequis OK.
echo.

echo [2/5] Installation des dependances npm...
cd /d "%ROOT%"
call npm install --silent
if errorlevel 1 (
    echo [ERREUR] npm install echoue.
    goto :ERROR
)
call npm install terser --save-dev --silent >nul 2>&1
echo [OK] Dependances OK.
echo.

echo [3/5] Build de l'application web...
call npm run build
if errorlevel 1 (
    echo [ERREUR] La compilation Vite a echoue.
    goto :ERROR
)
echo [OK] Build web termine.
echo.

echo [4/5] Synchronisation Capacitor...
call npx cap sync android
if errorlevel 1 (
    echo [ERREUR] Capacitor sync a echoue.
    goto :ERROR
)
echo [OK] Sync Capacitor OK.
echo.

echo [5/5] Compilation APK Android (release signe)...
echo (Veuillez patienter...)
echo.

cd /d "%ANDROID_DIR%"
:: Skip clean because app/build is locked
:: call gradlew.bat clean --quiet
call gradlew.bat assembleRelease --parallel --build-cache --configure-on-demand --info 2>&1 | findstr /i /c:"BUILD" /c:"ERROR" /c:"FAILED" /c:"SUCCESS" /c:"warning" /c:"apk"

if errorlevel 1 (
    echo.
    echo [ERREUR] La compilation Gradle a echoue.
    goto :ERROR
)

cd /d "%ROOT%"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

set "APK_SRC=%ANDROID_DIR%\app\build_new\outputs\apk\release\app-release.apk"
set "APK_OUT=%OUTPUT_DIR%\E7sebli-v1.0.1-release-signed.apk"

if exist "%APK_SRC%" (
    copy /Y "%APK_SRC%" "%APK_OUT%" >nul
    echo.
    echo ======================================================
    echo              APK SIGNE GENERE AVEC SUCCES             
    echo ======================================================
    echo.
    echo Fichier : %APK_OUT%
    for %%F in ("%APK_OUT%") do (
        set /a "SIZE_KB=%%~zF / 1024"
        echo Taille  : !SIZE_KB! Ko
    )
    echo.
    echo REMARQUE : L'APK est signe. Il est pret a etre installe.
    echo.
    goto :DONE
) else (
    echo [ERREUR] APK introuvable dans : %APK_SRC%
    dir "%ANDROID_DIR%\app\build\outputs\apk\" /s /b 2>nul
    goto :ERROR
)

:ERROR
echo.
echo ======================================================
echo ECHEC - corrigez les erreurs ci-dessus et relancez.
echo ======================================================
cd /d "%ROOT%"
endlocal
exit /b 1

:DONE
cd /d "%ROOT%"
endlocal
exit /b 0
