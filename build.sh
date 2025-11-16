#!/bin/bash
# Build script - syncs gallery and runs hugo
cd "/Users/andy/Work/Website/Personal 2"
./sync-gallery.sh
hugo --gc --cleanDestinationDir
