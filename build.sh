#!/bin/bash
set -e  # stop if any command fails

echo "🚀 Cleaning dist and android folders..."
rm -rf android

echo "📦 Building LIBs"
npx ng build --project=cerebellum
npx ng build --project=sibella

echo "🏗️ Choose the app to build:"
echo "1) SIRNE"
echo "2) MARASKIN"

read -p "Enter option: " option

case $option in
  1)
    echo "📦 Building SIRNE app"

    SOURCE_DIR="resources/sirne"
    TARGET_DIR="resources"

    echo "🔎 Searching for PNG files in $SOURCE_DIR..."

    # Check if there are any PNG files
    if compgen -G "$SOURCE_DIR/*.png" > /dev/null; then
        echo "📂 Copying files..."
        cp "$SOURCE_DIR"/*.png "$TARGET_DIR"/
        echo "✅ PNG files successfully copied to $TARGET_DIR"
    else
        echo "⚠️ No PNG files found in $SOURCE_DIR"
    fi

    # Build SIRNE
    echo "🏗️ Compiling Angular project (Sirne)..."
    npx ng build --project=sirne

    # Add Android
    echo "📱 Checking Android project..."
    if [ ! -d "android" ]; then
        echo "➕ Adding Android support to Capacitor..."
        npx cap add android
    else
        echo "✅ Android project already exists."
    fi

    npx cap copy android

    # Generate icons with Capacitor
    echo "🎨 Generating icons with Capacitor..."
    npx capacitor-assets generate

    # Sync Capacitor
    echo "🔄 Syncing with Capacitor..."
    npx cap sync android

    echo "✅ Process completed successfully!"

    echo "🎉 Build and configuration finished successfully!"
    ;;
  2)
    echo "📦 Building MARASKIN app"

    SOURCE_DIR="resources/maraskin"
    TARGET_DIR="resources"

    echo "🔎 Searching for PNG files in $SOURCE_DIR..."

    # Check if there are any PNG files
    if compgen -G "$SOURCE_DIR/*.png" > /dev/null; then
        echo "📂 Copying files..."
        cp "$SOURCE_DIR"/*.png "$TARGET_DIR"/
        echo "✅ PNG files successfully copied to $TARGET_DIR"
    else
        echo "⚠️ No PNG files found in $SOURCE_DIR"
    fi

    # Build MARASKIN
    echo "🏗️ Compiling Angular project (Maraskin)..."
    npx ng build --project=maraskin

    # Add Android
    echo "📱 Checking Android project..."
    if [ ! -d "android" ]; then
        echo "➕ Adding Android support to Capacitor..."
        npx cap add android
    else
        echo "✅ Android project already exists."
    fi

    npx cap copy android

    # Generate icons with Capacitor
    echo "🎨 Generating icons with Capacitor..."
    npx capacitor-assets generate

    # Sync Capacitor
    echo "🔄 Syncing with Capacitor..."
    npx cap sync android

    echo "✅ Process completed successfully!"

    echo "🎉 Build and configuration finished successfully!"
    ;;
  *)
    echo "❌ Invalid option"
    exit 1
    ;;
esac
