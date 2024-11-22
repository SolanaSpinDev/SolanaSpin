#!/bin/bash

# Check if a file containing video URLs is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <file_with_video_urls>"
    exit 1
fi

# Input file containing video URLs
input_file="$1"

# Check if the file exists
if [ ! -f "$input_file" ]; then
    echo "Error: File '$input_file' not found!"
    exit 1
fi

# Output array to store durations
declare -a durations

# Process each video URL in the input file
while IFS= read -r video_url; do
    # Use ffprobe to get the duration in seconds
    duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$video_url")

    # Check if ffprobe succeeded
    if [ $? -eq 0 ]; then
        # Convert duration to milliseconds and store in the array
        duration_ms=$(awk "BEGIN {printf \"%.0f\", $duration * 1000}")
        durations+=("$duration_ms")
    else
        echo "Error: Could not process video '$video_url'."
        durations+=("ERROR")
    fi
done < "$input_file"

# Output the list of durations
echo "Durations (ms):"
for duration in "${durations[@]}"; do
    echo "$duration"
done
