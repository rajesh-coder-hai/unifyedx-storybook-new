#!/bin/bash

# Ask user for name
read -p "Enter the component name: " name

# Create folder with the component name
mkdir -p "$name"

# Navigate into the new folder
cd "$name" || exit

# Create the three files
touch "${name}.jsx" "${name}.stories.jsx" "${name}.css"

echo "Component folder '$name' created with files:"
echo "- ${name}.jsx"
echo "- ${name}.stories.jsx"
echo "- ${name}.css"
