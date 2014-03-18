@if (%1) == () goto no_param

cd %1
call android update project --target android-19 -p \
call ant debug
@goto exit

:no_param
@echo too few params
@pause

:exit