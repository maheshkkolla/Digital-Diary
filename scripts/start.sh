#!/bin/bash
set -e

echo "************ INSTALLING DEPENDENCIES ************"
npm install
echo "************ RUNNING MIGRATIONS FOR ************"
echo $ENV

./node_modules/db-migrate/bin/db-migrate up -e $ENV

echo "************ GO TO PUBLIC DIRECTORY ************"
cd public
 echo "************ INSTALLING CLIENT SIDE DEPENDENCIES ************"
 npm install
 if [ $ENV = 'qa' ]
 then
  HOME=$OPENSHIFT_DATA_DIR
 fi
 ./node_modules/bower/bin/bower install
cd ..

echo "************ STARTING THE SERVER ************"
node ./bin/www