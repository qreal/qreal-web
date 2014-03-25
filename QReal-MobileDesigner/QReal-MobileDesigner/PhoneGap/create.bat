set folder=%1
set package=%2
set projectName=%3
call cordova create %folder% %package% %projectName%
cd %folder%
call cordova platform add android