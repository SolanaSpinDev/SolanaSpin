#!/bin/bash

# Define the target directory (you can change this to your specific directory)
TARGET_DIR="./"  # Change this to the directory you want

# Loop through all the files in the directory
for file in "$TARGET_DIR"/*; do
  if [[ -f "$file" ]]; then  # Ensure it's a file and not a directory
    # Get the base name of the file and replace spaces with underscores
    new_name=$(echo "$file" | tr ' ' '_')

    # Rename the file
    mv "$file" "$new_name"

    echo "Renamed: $file -> $new_name"
  fi
done

echo "Renaming complete."
