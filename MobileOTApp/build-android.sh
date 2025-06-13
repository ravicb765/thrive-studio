
#!/bin/bash

echo "🤖 Quick Android APK Build Script"
echo "================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo -e "${BLUE}Installing EAS CLI...${NC}"
    npm install -g @expo/eas-cli
fi

# Check login
if ! eas whoami &> /dev/null; then
    echo -e "${BLUE}Please login to Expo:${NC}"
    eas login
fi

echo -e "${GREEN}Logged in as: $(eas whoami)${NC}"

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Build APK
echo -e "${GREEN}🚀 Building Android APK...${NC}"
eas build --platform android --profile preview --non-interactive

echo -e "${GREEN}✅ Build started! Check your email or Expo dashboard for completion.${NC}"
echo -e "${BLUE}Dashboard: https://expo.dev${NC}"
