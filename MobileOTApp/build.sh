
#!/bin/bash

echo "🚀 Starting build process for OT Skills Mobile App"

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the MobileOTApp directory"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_info "Node.js version: $NODE_VERSION"

# Install dependencies
print_info "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    print_info "Installing EAS CLI..."
    npm install -g @expo/eas-cli
    if [ $? -ne 0 ]; then
        print_error "Failed to install EAS CLI"
        exit 1
    fi
fi

# Check EAS login status
print_info "Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    print_warning "Not logged into Expo. Please login:"
    eas login
    if [ $? -ne 0 ]; then
        print_error "Failed to login to Expo"
        exit 1
    fi
fi

print_status "Logged in as: $(eas whoami)"

# Update Expo SDK if needed
print_info "Checking for Expo updates..."
npx expo install --fix

echo ""
print_info "📱 Choose build type:"
echo "1. Android APK (for testing/sideloading)"
echo "2. Android AAB (for Google Play Store)"
echo "3. iOS (for App Store)"
echo "4. Both Android and iOS"
echo "5. Local Android build (if configured)"
echo "6. Check build status"
echo "7. Download latest build"

read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        print_info "🤖 Building Android APK for testing..."
        eas build --platform android --profile preview --non-interactive
        ;;
    2)
        print_info "🤖 Building Android AAB for Play Store..."
        eas build --platform android --profile production --non-interactive
        ;;
    3)
        print_info "🍎 Building iOS for App Store..."
        eas build --platform ios --profile production --non-interactive
        ;;
    4)
        print_info "📱 Building for both platforms..."
        eas build --platform all --profile production --non-interactive
        ;;
    5)
        print_info "🔨 Attempting local Android build..."
        npx expo run:android --variant release
        ;;
    6)
        print_info "📊 Checking build status..."
        eas build:list --limit 10
        ;;
    7)
        print_info "📥 Showing download links for latest builds..."
        eas build:list --limit 5 --json | jq -r '.[] | select(.artifacts != null) | "Platform: \(.platform) | Status: \(.status) | Download: \(.artifacts.buildUrl // "N/A")"'
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

if [ $choice -le 4 ]; then
    echo ""
    print_status "Build process initiated!"
    print_info "You can monitor the build progress at: https://expo.dev/accounts/$(eas whoami)/projects/ot-skills-mobile/builds"
    print_info "You'll receive an email when the build is complete."
    print_info "Run './build.sh' and choose option 6 to check build status anytime."
fi
