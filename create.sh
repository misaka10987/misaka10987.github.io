#!/bin/sh

set -e

title=$1
folder="src/content/posts/$title"

mkdir -p $folder

today=$(date +%Y-%m-%d)

frontmatter=$(cat <<EOF
+++
title = $title
published = $today
description = ''
image = ''
tags = ''
category = ''
draft = false
lang = ''
+++
EOF
)

echo "$frontmatter" > "$folder/index.md"

xdg-open $folder
