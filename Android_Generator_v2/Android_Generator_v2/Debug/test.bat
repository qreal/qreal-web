Android_Generator_v2 -c "%cd%" testName example.testpackage
copy "%cd%\app.json" "%cd%\testName\app.json"
copy "%cd%\example1.json" "%cd%\testName\example1.json"
Android_Generator_v2 -b "%cd%" testName example.testpackage