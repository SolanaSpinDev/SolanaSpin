#!/bin/bash

# Define the folder containing the .mp4 files
VIDEO_FOLDER="./"  # Change this to the path of your folder with .mp4 files

# Create an output directory for the extracted frames
OUTPUT_DIR="./extracted_frames"
mkdir -p "$OUTPUT_DIR"

# Loop through all .mp4 files in the folder
for video_file in "$VIDEO_FOLDER"/*.mp4; do
  if [[ -f "$video_file" ]]; then
    # Extract the last frame from the video and save it as an image
    filename=$(basename "$video_file" .mp4)  # Get the filename without extension
    output_image="$OUTPUT_DIR/$filename.png"  # Output image path

    # Use ffmpeg to extract the last frame
    ffmpeg -sseof -3 -i "$video_file" -vf "select=eq(n\,0)" -vsync vfr "$output_image"

    echo "Extracted last frame from $video_file and saved to $output_image"
  fi
done

echo "All frames have been extracted."
