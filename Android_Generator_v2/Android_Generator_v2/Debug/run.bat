@if (%2) == () goto no_path
@if (%3) == () goto no_name

cd %3
call android update project --name %2 --target android-19 -p %3
call ant debug
@goto exit

:no_path
@echo not found path to folder
@pause

:no_name
@echo not found app name
@pause

:exit
@pause