Демо
================
Опробовать сайт можно по ссылке: [демоверсия](https://dowithoutink.glitch.me)

Структура данных
================
В проекте используется NoSQL база данных - MongoDB. Для демоверсии использовались официальные облачные сервисы MongoDB Atlas для размещения базы данных.

В папке models находятся файлы с описанием моделей MongoDB, аналогично описаниям таблиц в SQL база данных. Документы-экземпляры каждой модели хранятся в отдельных коллекциях, подобно записям в таблицах.

Схема отношений базы данных представлена на следующем рисунке:
![dowithoutink-db](https://db.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=dowithoutink.png#R7Vptc9o4EP41fKTjd8zHhKZJe71Mr2kvvU8dYQusi7BcWQS4X3%2BSJfkVEiB2IFPPZCbeR%2BuVtPt4d2UzsCeL9TUFSfQnCSEeWEa4HtjvB5Zl8j%2F%2BTyAbiXgjXwJzikKlVAB36D%2BoQEOhSxTCtKLICMEMJVUwIHEMA1bBAKVkVVWbEVydNQFz2ADuAoCb6D0KWSRRx7QL%2FAaieaRmdn01sABaV20kjUBIViXIvhrYE0oIk1eL9QRi4TvtlvuPm3v8%2BcG7%2FvRX%2Bgt8v%2Fzj2%2B3fQ2nswyG35DugMGZHm767eXAev30ajh5uktXXD7fXt6k1tD1p%2BxHgpfKX2izbaAfyfSfiEq755JchWU6zEZMLlCzjEIoJDC6tIsTgXQICMbzibOJYxBZYKQOM5jG%2FDvguIOXADGE8IZjQbB47BNCfBRxPGSUPUI%2FEJOb2LtU6IWVwXQvsM24x81hxjkOygIxu%2BH3Kiu2p8G404ZW8Kshiap2oRBRbYUDxc56bLoLAL1QcDonJ6HePiWdUYzI%2BeUj8PiTVkNjGyWMy%2Ft1jkqeqs4mJY%2FQxObPUZW1LXR4WvmdAuN4ypoSGUHrN%2B7UU7cylWVxWFp%2BPC6q5FaWALyYBYYjieUXVqWgVRNCgMn7BB7VVQ%2Bpq%2F2wZkkseBgRjkKRQ6uRSaUJvrv7LHU8Jb2PrIG0g0daVcqqwoaJdNp9k3s7Zphq4Y0REUqI8itO6JsfEnE2wubQmEmrkJwrL94YvNsgQEwRp0yQ%2FCgQUJQyRuF3DAU8rPBppu1YpfERw1bLRgELA4BGxEuA2BgtcPssar%2BVcJpNtKXtuTYrlDKogwlPkDGfHHjFayrsYzoq5zqgvzw%2Be7afSUcOxMORnTSUSyiIyJzHAVwVaq2mFzmdCEhWLfyFjG3VwBktGqpGCa8R%2BiNvfGYaW%2F8nkke8o%2Bf1a2c%2BETUn4Ainiu8%2FSe4bF3BM%2FyoK0xXOrkgtbmaSNya2L%2FR4RZe4zsqQBfMK5qkwxQOeQPRUEdzttKMSAocfq6rZRQN36hSC%2B7qJu1%2Fpb06mxSC5M3VUQ6YJSsCmpJUIh3T2PX53GcUdla8%2Bpm7ZbY7Gcv%2BB07pHjad43DCdvGL6nmdpb6xeWfNkxWLTcMsAFQLhdkwlI0xVnRLtWee6OCH3Xtlf7dqHLs7BldPaCwj5Ju5AXeN4v%2BLUib1rPVPlMavQMqgMxucVxtQNxD25Auu4jZH%2BwTyPhd9JI1Eu2pRekTcgdNBqJtqq3nq4v36cr3xdZIegLuK6LU7Jk7ZpMGaEI9ufy0xfafV9wmn5nddY55bFcFMVRtSiO7YOr4q5juW3kNf2Qit15kd33tG7vINMLi6yrq5zu9sbWXkW2aWjsVw05difHfrf2Nsvynz731%2FVt5xUO%2FurlwgkfJK%2FyIHnO6OAH6XyYbwy6Yb5ZJdK4llZ3MP%2FFhHW9gwhr2tYrEHbb58a%2B133VXnciv7u8wWa3g69bWT%2FX96Sv3ZMe%2B3sh0%2B2sJzX7zHTqzPQ1%2B3b7BhNTN6fwPjedRW7a%2B8X0McmJi8XvkWWXVfyo2776Hw%3D%3D)

Локальный запуск
================
Для того, чтобы заставить работать код на локальной машине необходимо прежде установить базу данных MongoDB, программную платформу Node.js (версии не ниже 12.0.0), а также менеджер пакетов NPM (устанавливается вместе с Node) для удобства.

Чтобы иметь возможность собрать проект необходимо установить вспомогательные модули, список которых указан в файле package.json. Для этого достаточно выполнить следующую команду, будучи в директории проекта:

    $ npm install

Когда MongoDB установлена, следуя инструкции [по установке и запуску](https://docs.mongodb.com/manual/administration/install-community/), необходимо запустить программу базы данных mongod. По умолчанию база данных откроет порт 27017 для подключения по адресу 127.0.0.1. После создания база данных создайте файл .env и добавьтев него переменную MONGODB\_LOCAL по шаблону из файла .env\_sample. Осталось лишь запустить приложение из основной директории проекта. Для этого можно использовать одну из команд:

    $ npm run dev
    $ npm run start
    
Первая запускает приложение с помощью модуля nodemon, который будет автоматически перезапускать программу, если вы захотите изменить код.
Вторая команда единожды запустит приложение.

Увидеть запущенное приложение можно в браузере по адресу localhost:3000
Порт 3000 установлен по умолчанию, чтобы задать собственный порт, добавьте в файл .env переменную PORT, задав ей значение желаемого порта.
