#!/usr/bin/env bash

# Folder containing the images
DIR="/Users/kibverse/Projects/js/potraitsbypolo/docs/portraitsbypolo/commercials"

# Prefix for renamed files
PREFIX="commercial"

# Counter
count=1

# Change into target directory
cd "$DIR" || exit 1

# Rename files
for file in *.jpg *.jpeg *.png *.webp; do
  # Skip if no matching files
  [ -e "$file" ] || continue

  # Extract extension
  ext="${file##*.}"

  # Generate new filename
  new_name=$(printf "%s-%03d.%s" "$PREFIX" "$count" "$ext")

  echo "Renaming: $file -> $new_name"

  mv "$file" "$new_name"

  ((count++))
done

echo "Done."