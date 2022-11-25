#!/bin/bash

npm install

date=$(date)
echo "*** npm version: ***" 
npm --version
echo "*** node version:  ***" 
node --version


echo  "Installation Next 13 done at $date !" >> install.log

npm run dev