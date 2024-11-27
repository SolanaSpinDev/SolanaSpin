#!/bin/bash

# Define the input file containing the list of .mp4 files
INPUT_LIST="file_list.txt"  # Change this to the path of your list file

# Get the absolute path of the current directory
BASE_DIR=$(pwd)

# Define the output file name
OUTPUT_FILE="output_video.mp4"

# Create a temporary text file for ffmpeg input
TEMP_LIST="temp_list.txt"
> "$TEMP_LIST"  # Empty the temp file if it already exists

# Loop through the list of files and add each one to the temp file
while IFS= read -r line; do
  # Ensure the line is not empty and the file exists
  if [[ -n "$line" && -f "$BASE_DIR/$line" ]]; then
    # Use absolute path for ffmpeg input
    echo "file '$BASE_DIR/$line'" >> "$TEMP_LIST"
  else
    echo "Skipping invalid file: $line"
  fi
done < "$INPUT_LIST"

# Concatenate the videos using ffmpeg
ffmpeg -f concat -safe 0 -i "$TEMP_LIST" -c:v libx264 -c:a aac -strict experimental "$OUTPUT_FILE"

# Clean up temporary list file
rm "$TEMP_LIST"

echo "Videos have been joined into $OUTPUT_FILE"
