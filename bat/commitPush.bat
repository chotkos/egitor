set login=%1
set pass=%2
set commitName=%3

cd Repository
cd Repository

FOR /D %%a IN (*) DO (
  CD %%a
  GOTO :RUNGIT
)

:RUNGIT

git add .

git commit -m %commitName%

git push origin master

echo %login%
echo %pass%