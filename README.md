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
    "image": "no-photo-available.png"
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
    "image": "no-photo-available.png"
  },
  {
    "id": 2,
    "author": "Barns Courtney",
    "name": "My Album 2",
    "year": "2021",
    "image": "no-photo-available.png"
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
  "image": "no-photo-available.png"
}
```

### 4. **POST** `/artists`

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
    "photo": ""
}
```

### 5. **GET** `/artists`

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
    "photo": ""
  },
  {
    "id": 2,
    "name": "Barns Courtney 2",
    "info": "My info 2",
    "photo": ""
  }
]
```

### 6. **POST** `/tracks`

Этот эндпоинт сохраняет трек в базе данных.

#### Описание:

При отправке POST-запроса на этот путь сервер сохраняет информацию о треке в базе данных.

#### Пример запроса:

```http
POST /tracks HTTP/1.1
Content-Type: application/json

{
    "name": "Kicks",
    "albumId": "1",
    "duration": "3:00"
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
    "duration": "3:00"
}
```

### 7. **GET** `/tracks`

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
  "duration": "3:00"
 },
 {
  "id": 2,
  "name": "Hellfire",
  "albumId": "2",
  "duration": "2:41"
 }
]
```

### 8. **POST** `/users`

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
    "username": "vasya_pupkin"
}
```

### 9. **POST** `/users/sessions`

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

### 10. **POST** `/track_history`

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

## Запуск проекта

1. Перейдите в корневую папку проекта.
2. Создайте в ней файл `.env`
3. Заполните его переменными окружения, например:

```bash
PORT = 8000

DB_HOST = 'localhost'
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = '111'
DB_DATABASE = 'MY_DATABASE'
```

4. Выполните команду `pnpm i`. Она установит все зависимости. Затем выполните команду `pnpm run dev`. Эта команда запустит сервер.
5. Можете использовать Postman, чтобы отправлять HTTP-запросы. Подробнее о Postman можно узнать [тут](https://www.postman.com/).
