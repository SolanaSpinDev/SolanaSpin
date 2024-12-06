#!/bin/bash

# Input file containing the list of .mp4 videos
VIDEO_LIST="video_list.txt"  # Replace with your list file name

# Directory to save the extracted frames
OUTPUT_DIR="extracted_frames"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if the list file exists
if [[ ! -f "$VIDEO_LIST" ]]; then
  echo "Error: File '$VIDEO_LIST' not found!"
  exit 1
fi

# Loop through each video in the list
while IFS= read -r video; do
  # Check if the file exists
  if [[ -f "$video" ]]; then
    # Extract the base name of the video (without extension)
    base_name=$(basename "$video" .mp4)
    
    # Extract the first frame and save it as a PNG in the output directory
    ffmpeg -i "$video" -vf "select=eq(n\,0)" -q:v 3 "$OUTPUT_DIR/${base_name}_frame.png"
    
    echo "Extracted first frame from '$video' -> '$OUTPUT_DIR/${base_name}_frame.png'"
  else
    echo "Skipping: File '$video' not found!"
  fi
done < "$VIDEO_LIST"

echo "Frame extraction completed. Frames saved in '$OUTPUT_DIR'."
