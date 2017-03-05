#!/bin/bash
set -e

echo "************ INSTALLING DEPENDENCIES ************"
npm install
echo "************ RUNNING MIGRATIONS FOR ************"
[ -z $ENV ] && ENV=dev

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
cd ..

./node_modules/webpack/bin/webpack.js

echo "************ COMPILING CLIENT TEMPLATES ************"
./node_modules/clientjade/bin/clientjade ./views/client/ > ./public/javascripts/bin/templates.js

echo "************ STARTING THE SERVER ************"
node ./bin/www