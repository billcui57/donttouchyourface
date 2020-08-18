if [ ! -d "./node_modules" ]; then
  npm install
fi

npm run-script start
