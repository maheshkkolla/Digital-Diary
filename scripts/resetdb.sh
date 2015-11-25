#!/bin/bash
set +e
echo " *** Deleting database *** "
dropdb digitaldiary

set -e
echo " *** Creating database *** "
createdb digitaldiary
