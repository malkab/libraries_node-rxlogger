#!/bin/bash

# This script builds the library

LIBRARY_GROUP=malkab
LIBRARY_NAME=angular-mapbox
LIBRARY_TARGET_NAME=@$LIBRARY_GROUP/$LIBRARY_NAME
DIST_LIBRARY_PATH=dist


# Drop existing build, just in case

rm -Rf $DIST_LIBRARY_PATH


# Build the lib

npm run build-lib


# Create docs

npm run builddocs:html

cp -R typedoc/build/html $DIST_LIBRARY_PATH/docs
