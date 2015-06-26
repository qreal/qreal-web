## Технологии ##

* Maven
* Grunt
* Spring MVC
* Apache Tomcat
* TypeScript (+JavaScript)
* AngularJS
* JointJS
* Raphael
* jQuery
* Ajax
* TreeView (http://bassistance.de/jquery-plugins/jquery-plugin-treeview/)
* Twitter Bootstrap
* Jackson - FasterXML
* Java
* Hibernate
* MySQL
* Log4j

## Инструкция по сборке (Windows) ##

* скачать и установить JDK (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* скачать и распаковать архив Apache Maven (http://maven.apache.org/download.cgi)
* указать в системной переменной Path путь до директории bin распакованного архива
* скачать и установить nodejs (https://nodejs.org/download/)
* в консоли выполнить npm install -g grunt-cli
* в консоли в директории /Robots_diagram/src/main/webapp выполнить следующие команды:
	* npm install
	* grunt (запустится система сборки, которая скомпилирует файлы typescript в javascript и продолжит следить за изменениями)
* в консоли в директории /Robots_diagram выполнить mvn clean tomcat7:run (если все закончится успешно, можно перейти по ссылке localhost:8080/Robots_diagram/)

## Инструкция по сборке (Linux) ##

* установить JDK (sudo apt-get install default-jdk)
* установить Apache Maven (sudo apt-get install maven)
* установить npm (sudo apt-get install npm), nodejs (sudo apt-get install nodejs)
* установить grunt-cli (sudo npm install -g grunt-cli)
* в директории /Robots_diagram/src/main/webapp выполнить следующие команды:
	* npm install
	* grunt (при появлении ошибки /usr/bin/env: node: No such file or directory, сделать следующее: sudo ln -s /usr/bin/nodejs /usr/bin/node)
* в директории /Robots_diagram выполнить mvn clean tomcat7:run (если все закончится успешно, можно перейти по ссылке localhost:8080/Robots_diagram/)

### Запуск через IntelliJ IDEA Ultimate ###

Получить лицензию для студентов можно тут http://www.jetbrains.com/student/

Вместо последнего дейтвия инструкции по сборке сделать следующее:

* импоритровать проект (File -> Import Project...)
* выбрать Maven проект
* поставить галочку Import Maven projects automatically
* проделать остальные действия по имопрту (там ничего сложного)
* Idea должна увидеть Spring Framework, всплывет уведомление, нажать на него, нажать ок
* для запуска нужно нажать Run -> Run...
* выбрать Edit Configurations...
* нажать +, выбрать Maven
* назвать как-нибудь конфигурацию
* в Command line прописать clean install tomcat7:run
* нажать Run (если все закончится успешно, можно перейти по ссылке localhost:8080/Robots_diagram/)
