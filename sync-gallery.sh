#!/bin/bash

# Gallery Sync Script
# Syncs photos from Image/ folder to content/gallery/

BASE_DIR="/Users/andy/Work/Website/Personal 2"
IMAGE_DIR="$BASE_DIR/Image"
GALLERY_DIR="$BASE_DIR/content/gallery"

echo "Syncing gallery..."

# Create temp file to track what should exist
TEMP_FILE=$(mktemp)

# Function to get camera tag from folder name
get_camera_tag() {
    case "$1" in
        "Leica X Vario") echo "Leica X Vario" ;;
        "Minolta Weathermatic Dual  35") echo "Minolta Weathermatic Dual 35" ;;
        "Nicon FM3A") echo "Nikon FM3A" ;;
        "iPhone") echo "iPhone" ;;
        *) echo "" ;;
    esac
}

# Process each camera folder
for camera_dir in "$IMAGE_DIR"/*/; do
    if [ -d "$camera_dir" ]; then
        camera_name=$(basename "$camera_dir")
        camera_tag=$(get_camera_tag "$camera_name")

        if [ -z "$camera_tag" ]; then
            echo "Warning: Unknown camera type: $camera_name"
            continue
        fi

        # Process each image in the camera folder
        for image_file in "$camera_dir"*; do
            if [ -f "$image_file" ]; then
                # Check if it's an image file
                case "$(echo "$image_file" | tr '[:upper:]' '[:lower:]')" in
                    *.jpg|*.jpeg|*.png|*.gif|*.webp)
                        # Get image filename without extension
                        image_basename=$(basename "$image_file")
                        image_name="${image_basename%.*}"

                        # Create gallery entry name (camera-imagename)
                        gallery_name=$(echo "$camera_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
                        gallery_entry="${gallery_name}-${image_name}"

                        # Track this entry
                        echo "$gallery_entry" >> "$TEMP_FILE"

                        gallery_entry_dir="$GALLERY_DIR/$gallery_entry"

                        # Check if entry already exists
                        if [ ! -d "$gallery_entry_dir" ]; then
                            echo "Adding: $gallery_entry"
                            mkdir -p "$gallery_entry_dir"

                            # Copy image
                            cp "$image_file" "$gallery_entry_dir/"

                            # Get file modification date
                            file_date=$(stat -f "%Sm" -t "%Y-%m-%d" "$image_file" 2>/dev/null || date -r "$image_file" "+%Y-%m-%d" 2>/dev/null || date "+%Y-%m-%d")

                            # Create index.md
                            cat > "$gallery_entry_dir/index.md" << EOF
---
title: ""
date: $file_date
location: ""
tags: ["$camera_tag"]
description: ""
---
EOF
                        fi
                        ;;
                esac
            fi
        done
    fi
done

# Remove gallery entries that no longer have corresponding images
for entry_dir in "$GALLERY_DIR"/*/; do
    if [ -d "$entry_dir" ]; then
        entry_name=$(basename "$entry_dir")

        # Skip if it's the _index.md file
        if [ "$entry_name" = "_index.md" ]; then
            continue
        fi

        # Check if this entry should exist
        if ! grep -q "^${entry_name}$" "$TEMP_FILE" 2>/dev/null; then
            echo "Removing: $entry_name"
            rm -rf "$entry_dir"
        fi
    fi
done

# Cleanup temp file
rm -f "$TEMP_FILE"

echo "Gallery sync complete!"
