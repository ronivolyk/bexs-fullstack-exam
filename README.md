# Exame - Bexs Full-stack - Back-End

## Build Setup

``` bash
# install dependencies
$ npm install

# start at localhost:8080
$ npm start
```

## API Documentation

### **Questions**

---

> ### Get a list of all questions or of filtered questions

`GET /questions?search={search}&hideAnswered={hideAnswered}`

**URI Parameters**

Parameter | Type | Description
----------|------|------------
search (optional) | string | Filter questions that contains the *search* parameter
hideAnswered (optional) | boolean | Show only unanswered questions if *true*, or show all questions if *false*

Example request

`GET http://localhost:8080/questions?search=you&hideAnswered=false`

Example response

`200 OK`

`[
    {
      "_id": "5ebb8afb929cbd418857a889",
      "question": "What's your name?",
      "user": "roni",
      "creationDate": "2020-05-13T05:51:55.587Z",
      "numberOfAnswers": 0,
      "likes": 1
    },
    {
      "_id": "5ebc801e3b137605a8a43212",
      "question": "How old are you?",
      "user": "joao",
      "creationDate": "2020-05-13T23:17:50.980Z",
      "numberOfAnswers": 2,
      "likes": 0
    }
]`

**Response Body**

Parameter | Type | Description
----------|------|------------
_id | string | Auto-generated identifier of the question
question | string | Question text
user | string | User who asked the question
creationDate | datetime | Date when the question was asked
numberOfAnswers | numeric | Number of answers to the question
likes | numeric | Number of people who liked the question

---

> ### Create a new question

`POST /questions`

Example request

`POST http://localhost:8080/questions`

**Request Body**

`{
    "question": "What's your name?",
    "user": "roni"
}`

Parameter | Type | Description
----------|------|------------
question | string | Question text
user | string | User who asked the question

Example response

`200 OK`


---

> ### Get a question details and it's answers

`GET /questions/{questionId}`

**URI Parameters**

Parameter | Type | Description
----------|------|------------
questionId | string | Identifier of the question

Example request

`GET http://localhost:8080/questions/5ebb8afb929cbd418857a889`

Example response

`200 OK`

`{
    "_id": "5ebc801e3b137605a8a43212",
    "question": "How old are you?",
    "user": "joao",
    "creationDate": "2020-05-13T23:17:50.980Z",
    "numberOfAnswers": 2,
    "likes": 0,
    answers: [
        {
            "position": 1,
            "answer": "I'm 20 years old",
            "user": "joao",
            "creationDate": "2020-05-13T05:52:07.230Z",
            "likes": 2
        },
        {
            "position": 2,
            "answer": "36",
            "user": "roni",
            "creationDate": "2020-05-13T06:11:19.368Z",
            "likes": 0
        }
    ]
}`

**Response Body**

Parameter | Type | Description
----------|------|------------
_id | string | Auto-generated identifier of the question
question | string | Question text
user | string | User who asked the question
creationDate | datetime | Date when the question was asked
numberOfAnswers | numeric | Number of answers to the question
likes | numeric | Number of people who liked the question
answers | object | List of answers to the question
answers.position | numeric | Incremental order according to when it was answered
answer.answer | string | Answer text
answer.user | string | User who posted the answer
answer.creationDate | datetime | Date when the answer was posted
answer.likes | numeric | Number of people who liked the answer

---

> ### Give a like to a question

`POST /questions/{questionId}/like`

Example request

`POST http://localhost:8080/questions/5ebc801e3b137605a8a43212/like`

Example response

`200 OK`


---

> ### Create a new answer

`POST /questions/{questionId}/answers`

Example request

`POST http://localhost:8080/questions/5ebc801e3b137605a8a43212/answers`

**Request Body**

`{
    "answer": "I'm 36 years old",
    "user": "roni"
}`

Parameter | Type | Description
----------|------|------------
answer | string | Answer text
user | string | User who posted the answer

Example response

`200 OK`

---

> ### Give a like to an answer

`POST /questions/{questionId}/answers/{position}/like`

Example request

`POST http://localhost:8080/questions/5ebc801e3b137605a8a43212/answers/2/like`

Example response

`200 OK`
