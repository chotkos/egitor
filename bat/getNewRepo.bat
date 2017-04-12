set url=%1
set login=%2
set pass=%3

cd Repository
cd git

git clone %url%
echo %login%
echo %pass%