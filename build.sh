#!/bin/bash

# List of directories to navigate
directories=(
    "apps/isomorphic"
    "apps/isomorphic-i18n"
    "apps/isomorphic-starter"
)

# Array of environment variables to fill
env_variables=(
    "NEXT_PUBLIC_GOOGLE_MAP_API_KEY"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
    # Add any other environment variables you need to fill in
)

# Function to copy and fill the .env.local file
copy_and_fill_env() {
    local dir=$1
    if [ -d "$dir" ]; then
        cd "$dir" || exit
        echo "Navigated to $dir"
        
        if [ -f ".env.local.example" ]; then
            cp .env.local.example .env.local
            echo ".env.local.example copied to .env.local"
            
            for var in "${env_variables[@]}"; {
                echo "Please enter the value for $var:"
                read -r value
                echo "$var=$value" >> .env.local
            }
            echo ".env.local file filled successfully in $dir"
        else
            echo ".env.local.example does not exist in $dir"
        fi
        
        cd - > /dev/null || exit
    else
        echo "Directory $dir does not exist"
    fi
}

# Loop through each directory and process
for dir in "${directories[@]}"; do
    copy_and_fill_env "$dir"
done
