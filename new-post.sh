#!/bin/sh

if [ $# -ne 1 ]; then
    echo "Usage: new-post.sh <NAME>" >&2
    exit 1
fi

name=$1

folder="./content/post/$name"


if [ -d "$folder" ]; then
    echo "Error: $folder already exists" >&2
    exit 1
fi

file="$folder/index.md"

hugo new content $file

xdg-open $file
