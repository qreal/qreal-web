## Технологии ##

* Maven
* Grunt
* Spring MVC
* Apache Tomcat
* TypeScript (+JavaScript)
* AngularJS
* JointJS
* jQuery
* Ajax
* TreeView (http://bassistance.de/jquery-plugins/jquery-plugin-treeview/)
* Twitter Bootstrap
* Jackson - FasterXML
* Java
* Hibernate
* MySQL
* Log4j

## Инструкция по сборке ##

* установить mysql-server, mysql-client
* создать нового пользвотеля user с паролем user
* зайти в mysql, выполнить скрипт setup.sql из папки /Robots_diagram
* установить npm, nodejs
* установить grunt-cli (в линуксе делается так: sudo npm install -g grunt-cli)
* в папке /Robots_diagram/src/main/webapp сделать следующие действия:
	* npm install
	* grunt (в линуксе при появлении ошибки /usr/bin/env: node: No such file or directory, сделать следующее: sudo ln -s /usr/bin/nodejs /usr/bin/node)
* проверить, что правильно установлена переменная JAVA_HOME
* в папке /Robots_diagram выполнить mvn clean install tomcat7:run (если все закончится успешно, можно перейти по ссылке localhost:8080/Robots_diagram/)

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
