#!/bin/zsh
# usage: render.sh in.html out.pdf
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=15000 --run-all-compositor-stages-before-draw --print-to-pdf="$2" "file://$1" 2>/dev/null
