#!/bin/bash
git add --all &&
    git commit -m "[auto] $(date "+%Y%m%d.%H%M%SUTC+8")" &&
    git push origin
