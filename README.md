# API для музыкального приложения

API для отправки и получения данных связанных с треками, исполнителями, альбомами и т.д. с помощью HTTP-запросов.

## Эндпоинты

### 1. **POST** `/albums`

Этот эндпоинт сохраняет альбом в базе данных.

#### Описание:

Когда пользователь отправляет POST-запрос на этот путь, сервер сохраняет информацию об альбоме в базе данных. Имеет необязательное поле image.

#### Пример запроса:

```http
POST /albums HTTP/1.1
Content-Type: application/json

{
    "name": "My Album",
    "author": "Barns Courtney",
    "year": "2024"
}
```

#### Пример ответа:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "author": "Barns Courtney",
    "name": "My Album",
    "year": "2024",
    "image": "no-photo-available.png",
    "isPublish": false,
    "user": 1
}
```

### 2. **GET** `/albums`

Этот эндпоинт позволяет получить список всех альбомов.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает массив объектов альбомов. Так же он позволяет передавать query параметр `?artist`, куда необходимо указать айди исполнителя, и тогда вернутся альбомы только этого исполнителя.

#### Пример запроса:

```http
GET /albums HTTP/1.1
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "author": "Barns Courtney",
    "name": "My Album",
    "year": "2024",
    "image": "no-photo-available.png",
    "isPublish": true,
    "user": 1
  },
  {
    "id": 2,
    "author": "Barns Courtney",
    "name": "My Album 2",
    "year": "2021",
    "image": "no-photo-available.png",
    "isPublish": true,
    "user": 1
  }
]
```

### 3. **GET** `/albums/:id`

Этот эндпоинт позволяет получить информацию об альбоме по его айди.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает объект альбома с указанным айди.

#### Пример запроса:

```http
GET /albums/1 HTTP/1.1
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "author": "Barns Courtney",
  "name": "My Album",
  "year": "2024",
  "image": "no-photo-available.png",
  "isPublish": true,
  "user": 1
}
```

### 4. **DELETE** `/albums/:id`

Этот эндпоинт позволяет удалить альбом по его айди.

#### Описание:

При отправке DELETE-запроса на этот путь сервер удаляет альбом с указанным айди.
Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /albums/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "author": "Barns Courtney",
  "name": "My Album",
  "year": "2024",
  "image": "no-photo-available.png",
  "isPublish": true,
  "user": 1
}
```

### 5. **POST** `/albums/:id/publish`

Этот эндпоинт позволяет опубликовать альбом по его айди.

#### Описание:

При отправке POST-запроса на этот путь сервер публикует альбом с указанным айди. Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /albums/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 201 OK
Content-Type: application/json

```

### 6. **POST** `/artists`

Этот эндпоинт сохраняет исполнителя в базе данных.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет информацию об исполнителе в базе данных. Имеет необязательное поле photo.

#### Пример запроса:

```http
POST /artists HTTP/1.1
Content-Type: application/json

{
    "name": "Barns Courtney",
    "info": "My info"
}
```

#### Пример ответа:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "name": "Barns Courtney",
    "info": "My info",
    "photo": "",
    "isPublish": true,
    "user": 1
}
```

### 7. **GET** `/artists`

Этот эндпоинт позволяет получить список всех исполнителей.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает массив объектов исполнителей.

#### Пример запроса:

```http
GET /artists HTTP/1.1
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Barns Courtney",
    "info": "My info",
    "photo": "",
    "user": 1,
    "isPublish": true
  },
  {
    "id": 2,
    "name": "Barns Courtney 2",
    "info": "My info 2",
    "photo": "",
    "user": 1,
    "isPublish": true
  }
]
```

### 8. **DELETE** `/artists/:id`

Этот эндпоинт позволяет удалить исполнителя по его айди.

#### Описание:

При отправке DELETE-запроса на этот путь сервер удаляет исполнителя с указанным айди.
Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /artists/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Barns Courtney",
  "info": "My info",
  "photo": "",
  "isPublish": true,
  "user": 1
}
```

### 9. **POST** `/artists/:id/publish`

Этот эндпоинт позволяет опубликовать артиста по его айди.

#### Описание:

При отправке POST-запроса на этот путь сервер публикует ариста с указанным айди.
Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /artists/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 201 OK
Content-Type: application/json

```

### 10. **POST** `/tracks`

Этот эндпоинт сохраняет трек в базе данных.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет информацию о треке в базе данных. Также позволяет отправить аудио в поле `track` и подтянуть из метаданных файла длительность трека.

#### Пример запроса:

```http
POST /tracks HTTP/1.1
Content-Type: application/json

{
    "name": "Kicks",
    "albumId": "1",
    "duration": "3:00",
    "trackNumber": "1",
    "youtubeLink": "https://www.youtube.com/watch?v=kW2KaAgNcN4",
    "track": "",
    "user": 1,
    "isPublish": true
}
```

#### Пример ответа:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "name": "Kicks",
    "albumId": "1",
    "duration": "3:00",
    "trackNumber": 1,
    "youtubeLink": "kW2KaAgNcN4",
    "track": "",
    "user": 1,
    "isPublish": true
}
```

### 11. **GET** `/tracks`

Этот эндпоинт позволяет получить список всех треков.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает массив объектов треков. Так же он позволяет передавать query параметры, такие как `?album` и `?artist`, куда необходимо указать айди альбома и исполнителя, чтобы получить треки по ним.

#### Пример запроса:

```http
GET /tracks HTTP/1.1
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Kicks",
    "albumId": "1",
    "duration": "3:00",
    "trackNumber": 1
    "track": "",
    "youtubeLink": "",
    "user": 1,
    "isPublish": true
  },
  {
    "id": 2,
    "name": "Hellfire",
    "albumId": "2",
    "duration": "2:41",
    "trackNumber": 1,
    "track": "",
    "youtubeLink": "",
    "user": 1,
    "isPublish": true
  }
]
```

### 12. **DELETE** `/tracks/:id`

Этот эндпоинт позволяет удалить трек по его айди.

#### Описание:

При отправке DELETE-запроса на этот путь сервер удаляет трек с указанным айди.
Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /tracks/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "name": "Kicks",
    "albumId": "1",
    "duration": "3:00",
    "trackNumber": 1,
    "isPublish": true,
    "user": 1
}
```

### 13. **POST** `/tracks/:id/publish`

Этот эндпоинт позволяет опубликовать трек по его айди.

#### Описание:

При отправке POST-запроса на этот путь сервер публикует трек с указанным айди.
Необходимо передавать токен пользователя в заголовке и чтобы пользователь был админом.

#### Пример запроса:

```http
DELETE /tracks/1 HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 201 OK
Content-Type: application/json

```

### 14. **POST** `/users`

Этот эндпоинт сохраняет пользователя в базе данных.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет информацию о пользователе в базе данных.

#### Пример запроса:

```http
POST /users HTTP/1.1
Content-Type: application/json

{
    "username": "vasya_pupkin",
    "password": "qwerty123"
}
```

#### Пример ответа:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "username": "vasya_pupkin",
    "token": "some_token"
}
```

### 15. **POST** `/users/sessions`

Этот эндпоинт позволяет авторизовать пользователя.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет токен авторизации пользователя в базе данных.

#### Пример запроса:

```http
POST /users/sessions HTTP/1.1

{
    "username": "vasya_pupkin",
    "password": "qwerty123"
}
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "username": "vasya_pupkin",
    "token": "some_token"
}
```

### 16. **DELETE** `/users/logout`

Этот эндпоинт позволяет выходить из аккаунта.

#### Описание:

При отправке DELETE-запроса на этот путь сервер удаляет токен авторизации пользователя из базы данных. Необходимо в заголовке указать токен авторизации пользователя.

#### Пример запроса:

```http
DELETE /users/logout HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### 17. **POST** `/track_history`

Этот эндпоинт позволяет сохранять историю прослушивания треков.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет историю прослушивания треков. Необходимо в заголовке указать токен авторизации пользователя.

#### Пример запроса:

```http
POST /track_history HTTP/1.1
Authorization: some_token

{
    "track": 1
}
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "user": 1,
    "track": 1,
    "datetime": "2023-06-01T12:34:56Z"
}
```

### 18. **GET** `/track_history`

Эндпоинт для получения истории прослушивания треков.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает массив объектов истории прослушивания треков. Необходимо в заголовке указать токен авторизации пользователя.

#### Пример запроса:

```http
GET /track_history HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
      "track": "Track name",
      "artist": "Artist name",
      "datetime": "2023-06-01T12:34:56Z"
    },
    {
      "track": "Track name 2",
      "artist": "Artist name 2",
      "datetime": "2024-01-01T13:54:16Z"
    }
]
```

### 19. **GET** `/admin/entities-data`

Эндпоинт для получения информации об альбомах, исполнителях и треках.

#### Описание:

При отправке GET-запроса на этот путь сервер возвращает массив объектов альбомов, исполнителей и треков. Необходимо в заголовке указать токен авторизации пользователя. Пользователь должен быть админом.

#### Пример запроса:

```http
GET /admin/entities-data HTTP/1.1
Authorization: some_token
```

#### Пример ответа:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
      "id": 1,
      "name": "Album name",
      "user": "User",
      "type": "album",
      "isPublish": true
    },
    {
      "id": 1,
      "name": "Artist name",
      "user": "User",
      "type": "artist",
      "isPublish": true
    }
]
```

## Запуск проекта

1. Перейдите в папку `/server`.
2. Создайте в ней файл `.env`.
3. Заполните его переменными окружения, например:

```bash
PORT = 8000

DB_HOST = 'localhost'
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = '111'
DB_DATABASE = 'MY_DATABASE'
```

4. Перейдите в папку `/client`.
5. Создайте в ней файл `.env`.
6. Заполните его переменными окружения, например:

```bash
SERVER_URL = "http://localhost:8000"
```

7. Перейдите в корневую папку проекта. После этого в консоли выполните команду `npm run dev`. Эта команда запустит серверную и клиентскую части проекта. Клиентская часть проекта стандартно работает по адресу: http://localhost:3000.
8. Серверная часть проекта стандартно работает по адресу: http://localhost:8000. Можете использовать Postman, чтобы отправлять HTTP-запросы. Подробнее о Postman можно узнать [тут](https://www.postman.com/).

### Запуск фикстур

1. Откроите терминал и перейдите в корневую папку проекта.
2. Выполните команду `npm run seed`. Эта команда запустит фикстуры.

**Все пользователи, которые сгенерированы через фикстуры по умолчанию имеют пароль `111`**

## Спасибо за внимание!
