Задание 2,3
1. Выполнено копирование директории без git файлов в новую папку с правильным названием. Далее публикация в github
2. Внесены шарды и реплики шардов в файл compose.yaml.
Проверены сетевые настройки и настройки по портам.
3. Выполнена команда по запуску контейнеров
4. Подключение к primary ноде первого шарда с помощью команды docker exec -it shard1-primary mongosh --port 27018 
5. Инициализация реплик-сета с помощью команды
rs.initiate({
  _id: "shard1rs",
  members: [
    { _id: 0, host: "shard1-primary:27018" },
    { _id: 1, host: "shard1-secondary1:27018" },
    { _id: 2, host: "shard1-secondary2:27018" }
  ]
});
6. Подключение к primary ноде второго шарда с помощью команды docker exec -it shard2-primary mongosh --port 27019
7. Инициализация реплик-сета с помощью команды
rs.initiate({
  _id: "shard2rs",
  members: [
    { _id: 0, host: "shard2-primary:27019" },
    { _id: 1, host: "shard2-secondary1:27019" },
    { _id: 2, host: "shard2-secondary2:27019" }
  ]
});

8. Подключение к контейнеру сервера конфигурации docker exec -it configSrv mongosh --port 27017
9. Инициация реплики в контейнере конфигурации
rs.initiate({
    _id: "config_server",
    members: [
      { _id: 0, host: "configSrv:27017" }
    ]
  });
10. Подключение к контейнеру роутера с помощью команды docker exec -it mongos_router mongosh --port 27020
11. Добавление шардов в кластер
sh.addShard("shard1rs/shard1-primary:27018");
sh.addShard("shard2rs/shard2-primary:27019");
12. Включите шардирование для базы данных:  sh.enableSharding("somedb");
13. Задать ключ шардирования для коллекции:
Определите ключ шардирования и выполнить команду sh.shardCollection("somedb.hellodoc", { _id: "hashed" });
14. Запуск команды по добавлению данных в базу данных somedb с помощью команд 
use somedb
for(var i = 0; i < 2000; i++) db.helloDoc.insertOne({age:i, name:"ly"+i})
15. Проверка количества записей в БД с помощью команды db.helloDoc.countDocuments()
ответ 1000
16. Проверка документов в шард 1 : 1022
17. Проверка документов в шард 2: 978
18. Удаление контейнера pymongo_api в приложении docker copmose desktop
Выполнение команды docker-compose build для сборки образа pymongo_api
Выполнение команды docker-compose up -d для запуска контейнера pymongo_api
Запуск браузера, http://localhost:8080
Отображение сведений в браузере:
{"mongo_topology_type":"Sharded","mongo_replicaset_name":null,"mongo_db":"somedb","read_preference":"Primary()","mongo_nodes":[["174.18.0.7",27020]],"mongo_primary_host":null,"mongo_secondary_hosts":[],"mongo_address":["174.18.0.7",27020],"mongo_is_primary":true,"mongo_is_mongos":true,"collections":{"mycollection":{"documents_count":2000},"helloDoc":{"documents_count":5000}},"shards":{"shard1rs":"shard1rs/shard1-primary:27018,shard1-secondary1:27018,shard1-secondary2:27018","shard2rs":"shard2rs/shard2-primary:27019,shard2-secondary1:27019,shard2-secondary2:27019"},"cache_enabled":false,"status":"OK"}

Задание 4
1. Добавлен контейнер redis_1 в файл compose.yaml
2. Добавлены папка и файл конфигурации redis
3. Добавлена переменная REDIS_URL: "redis://174.18.0.2:6379" к контейнеру pymongo_api. Переменная указан со статическим ip, т.к. ранее была ошибка при работе с наименованием с переменной MONGODB_URL.
4. Построение контейнера pymongo_api с помощью команды docker-compose build
5. Запуск контейнеров с помощью команды docker-compose up -d
6. Инициализация реплик в контейнерах shaerd1-primary, shard2-primary, configSrv
7. Подключение к контейнеру mongo_router, включение шардов в кластер
8. Включение шардирование для базы данных somedb, добавление коллекции helloDoc
9. Добавление данных в базу
10. Запуск postman и добавление запроса GET http://localhost:8080/helloDoc/users
Вызов метода первый раз 1,02s
Очистка ответа в postman
Вызов метода второй раз 16ms

Задание 5, 
Ссылка на схемы, которые созданы вкладками с наименованиями:
1. AS-IS
3. TO-BE Кэш+Шарды+Кэш
4. TO-BE Кэш+Шарды+Кэш+APISIX+CDN 
https://drive.google.com/file/d/1jRxZ5vu23hErpNZB1WI0KGG6UgzzQTEI/view?usp=sharing
