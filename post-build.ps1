cd dist/spa/
git init -b main
git add .
git commit -m "Update"
git remote add origin https://github.com/fractaal/fractaal.github.io
git push -u origin main --force
cd ../../
