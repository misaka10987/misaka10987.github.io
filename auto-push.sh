#!/bin/bash
git add --all &&
    git commit -m "[auto] $(date -u "+%Y%m%d.%H%M%S")" &&
    git push origin
