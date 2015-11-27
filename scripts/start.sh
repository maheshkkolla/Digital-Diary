npm install
npm run migrateUp -e $1

cd public
npm install
npm run bower install
cd ..

./node_modules/nodemon/bin/nodemon.js ./bin/www