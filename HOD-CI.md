# HOD

## End-point: Assign instructor to course
### Description: Assign a course instructor for each course in his department.
Method: POST
>```
>localhost:3000/hod/assignInstructor
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-6",
        "courseCode":"CSEN 401"
    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [
            "5fdd1b91f4df1c53ac0b9661",
            "5fdfdfba2de69a30d40b0ff0"
        ],
        "taList": [
            "5fe5e20fffcc464320be69d5",
            "5fe5d6049eb70954207dca83"
        ],
        "slots": [
            "5fe60e3702de9f499caaccc5",
            "5fe63172ea7dc545d86c8e24"
        ],
        "_id": "5fe5e2d23397bb4859bedcde",
        "courseCode": "CSEN 401",
        "coordinatorID": "5fe5e1c7ffcc464320be69d4"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Update instructor course (course)
### Description: update a course instructor for each course in his department.
Method: POST
>```
>localhost:3000/hod/updateInstructor
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-4",
        "courseCodeBefore":"cs",
        "courseCodeAfter":"CSEN 401"
    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [
            "5fdd1b91f4df1c53ac0b9661",
            "5fdfdfba2de69a30d40b0ff0"
        ],
        "taList": [
            "5fe5e20fffcc464320be69d5",
            "5fe5d6049eb70954207dca83"
        ],
        "slots": [
            "5fe60e3702de9f499caaccc5",
            "5fe63172ea7dc545d86c8e24"
        ],
        "_id": "5fe5e2d23397bb4859bedcde",
        "courseCode": "CSEN 401",
        "coordinatorID": "5fe5e1c7ffcc464320be69d4"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Delete instructor from course
### Description: delete a course instructor for each course in his department.
Method: DELETE
>```
>localhost:3000/hod/deleteInstructor
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-6",
        "courseCode":"CSEN 401"
    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [
            "5fdd1b91f4df1c53ac0b9661"
        ],
        "taList": [
            "5fe5e20fffcc464320be69d5",
            "5fe5d6049eb70954207dca83"
        ],
        "slots": [
            "5fe60e3702de9f499caaccc5",
            "5fe63172ea7dc545d86c8e24"
        ],
        "_id": "5fe5e2d23397bb4859bedcde",
        "courseCode": "CSEN 401",
        "coordinatorID": "5fe5e1c7ffcc464320be69d4"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: view dayOff
### Description: View the day off of all the staff/ a single staff in his/her department
Method: GET
>```
>localhost:3000/hod/viewDayOff
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|staffID|ac-4|

Response Ex:
```
{
    "result": [
        {
            "_id": "5fdd1b91f4df1c53ac0b9661",
            "staffID": "ac-4"
        },
        {
            "_id": "5fdfdfba2de69a30d40b0ff0",
            "staffID": "ac-6"
        },
        {
            "_id": "5fdfe690902d9b2a58444945",
            "staffID": "ac-7"
        },
        {
            "_id": "5fe5d6049eb70954207dca83",
            "staffID": "ac-8"
        },
        {
            "_id": "5fe5e20fffcc464320be69d5",
            "staffID": "ac-10"
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View all Staff in my department
### Description:  View all the staff in his/her department or per course along with their profiles.

Method: GET
>```
>localhost:3000/hod/viewStaff
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json

```
Response Ex:
```
{
    "result": [
        {
            "courseIDs": [
                "5fe5e2d23397bb4859bedcde"
            ],
            "_id": "5fdd1b91f4df1c53ac0b9661",
            "staffID": "ac-4",
            "email": "test10@guc.edu.eg",
            "role": "Course Instructor",
            "attendance": [],
            "notifications": [],
            "schedule": [
                {
                    "staffID": null,
                    "weekday": "Saturday",
                    "number": "First",
                    "_id": "5fdfdbbed0aef357ffff5667",
                    "course": "5fde0c35efbba4d74bccc8e7"
                }
            ],
            "__v": 98
        },
        {
            "courseIDs": [
                "5fde0c35efbba4d74bccc8e7",
                "5fe5e2d23397bb4859bedcde"
            ],
            "_id": "5fdfdfba2de69a30d40b0ff0",
            "staffID": "ac-6",
            "email": "CI@test.com",
            "role": "Course Instructor",
            "schedule": [
                {
                    "staffID": "ac-6",
                    "_id": "5fdfdfba2de69a30d40b0ff1",
                    "course": "5fde0c35efbba4d74bccc8e7",
                    "number": "First",
                    "weekday": "Saturday"
                }
            ],
            "attendance": [],
            "notifications": [],
            "__v": 1
        },
        {
            "courseIDs": [
                "5fde0c35efbba4d74bccc8e7"
            ],
            "_id": "5fdfe690902d9b2a58444945",
            "staffID": "ac-7",
            "email": "TA@test.com",
            "role": "TA",
            "schedule": [
                {
                    "staffID": "ac-7",
                    "_id": "5fe60fcb067fd948b81f3b65",
                    "course": "5fde0c35efbba4d74bccc8e7",
                    "number": "First",
                    "weekday": "Monday",
                    "location": "5fe4f2272e981a388385c9fc"
                }
            ],
            "attendance": [],
            "notifications": [],
            "__v": 60
        },
        {
            "courseIDs": [
                "5fe5e2d23397bb4859bedcde",
                "5fde0c35efbba4d74bccc8e7"
            ],
            "_id": "5fe5d6049eb70954207dca83",
            "staffID": "ac-8",
            "email": "TA2@test.com",
            "role": "TA",
            "attendance": [],
            "notifications": [],
            "schedule": [],
            "__v": 0
        },
        {
            "courseIDs": [
                "5fe5e2d23397bb4859bedcde"
            ],
            "_id": "5fe5e20fffcc464320be69d5",
            "staffID": "ac-10",
            "email": "ahmedaly@guc.edu.eg",
            "role": "TA",
            "attendance": [],
            "notifications": [
                {
                    "date": "2020-12-25T19:39:55.023Z",
                    "read": false,
                    "_id": "5fe6400be8a2fc5f94a864e0",
                    "message": {
                        "status": "Pending",
                        "_id": "5fe6400ae8a2fc5f94a864dd",
                        "senderID": "5fe5e20fffcc464320be69d5",
                        "receiverID": "5fe5e1c7ffcc464320be69d4",
                        "linkingSlot": {
                            "_id": "5fe6400ae8a2fc5f94a864db",
                            "slot": {
                                "staffID": null,
                                "_id": "5fe5e7b93397bb4859bedcdf",
                                "weekday": "Wednesday",
                                "number": "Second",
                                "location": "5fe5e72d1a8106b169946528",
                                "course": "5fe5e2d23397bb4859bedcde"
                            },
                            "__v": 0
                        },
                        "sentDate": "2020-12-25T19:39:54.815Z",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "date": "2020-12-25T19:47:03.773Z",
                    "read": false,
                    "_id": "5fe641b7e8a2fc5f94a86503",
                    "message": {
                        "status": "Pending",
                        "_id": "5fe641b7e8a2fc5f94a86500",
                        "senderID": "5fe5e20fffcc464320be69d5",
                        "receiverID": "5fe5e1c7ffcc464320be69d4",
                        "linkingSlot": {
                            "_id": "5fe641b7e8a2fc5f94a864fe",
                            "slot": {
                                "staffID": null,
                                "_id": "5fe60e3702de9f499caaccc5",
                                "weekday": "Sunday",
                                "number": "Second",
                                "location": "5fe5fda33397bb4859bedce2",
                                "course": "5fe5e2d23397bb4859bedcde",
                                "__v": 0
                            },
                            "__v": 0
                        },
                        "sentDate": "2020-12-25T19:47:03.613Z",
                        "__v": 0
                    },
                    "__v": 0
                }
            ],
            "schedule": [],
            "__v": 9
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View requests
### Description: • View all the requests “change day off/leave” sent by staff members in his/her department.

Method: GET
>```
>localhost:3000/hod/viewRequests/
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json

```
Response Ex:
```
{
    "result": [
        {
            "status": "Pending",
            "_id": "5fdf8ec03d749d1934bd459c",
            "senderID": "5fdd11797cf00e5608244634",
            "receiverID": "5fde0d554dd30e34fc2658ef"
        },
        {
            "status": "Rejected",
            "_id": "5fe5aea9454910a6eba36eb2",
            "senderID": "5fde9289417127e59ea05104",
            "receiverID": "5fde0d554dd30e34fc2658ef",
            "leave": {
                "document": null,
                "_id": "5fe63ee99aa1b7289cf7873f",
                "leaveType": "Annual",
                "startDate": "2020-12-14T00:00:00.000Z",
                "endDate": "2020-12-16T00:00:00.000Z"
            },
            "responseDate": "2020-12-25T17:49:36.542Z",
            "comment": "\"study weeeeell\""
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View coverage
### Description: • View the coverage of each course in his/her department.

Method: GET
>```
>localhost:3000/hod/viewCoverage
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json

```
Response Ex:
```
{
    "result": [
        {
            "courseCode": "CSEN 401",
            "_id": "5fe5e2d23397bb4859bedcde",
            "coverage": 0
        },
        {
            "courseCode": "cs",
            "_id": "5fde0c35efbba4d74bccc8e7",
            "coverage": 66.66666666666666
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View teaching assignments
### Description: View teaching assignments (which staff members teach which slots) of course offered by
his department.
Method: GET
>```
>localhost:3000/hod/viewAssignements
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1weyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json

```
Response Ex:
```
{
    "result": [
        {
            "courseCode": "cs",
            "courseID": "5fde0c35efbba4d74bccc8e7",
            "result": [
                {
                    "staffID": "ac-7",
                    "staffObjectID": "5fdfe690902d9b2a58444945",
                    "role": "TA",
                    "schedule": [
                        {
                            "staffID": "ac-7",
                            "_id": "5fe60fcb067fd948b81f3b65",
                            "course": "5fde0c35efbba4d74bccc8e7",
                            "number": "First",
                            "weekday": "Monday",
                            "location": "5fe4f2272e981a388385c9fc"
                        }
                    ]
                },
                {
                    "staffID": "ac-8",
                    "staffObjectID": "5fe5d6049eb70954207dca83",
                    "role": "TA",
                    "schedule": []
                }
            ]
        },
        {
            "courseCode": "CSEN 401",
            "courseID": "5fe5e2d23397bb4859bedcde",
            "result": [
                {
                    "staffID": "ac-4",
                    "staffObjectID": "5fdd1b91f4df1c53ac0b9661",
                    "role": "Course Instructor",
                    "schedule": []
                },
                {
                    "staffID": "ac-10",
                    "staffObjectID": "5fe5e20fffcc464320be69d5",
                    "role": "TA",
                    "schedule": []
                },
                {
                    "staffID": "ac-8",
                    "staffObjectID": "5fe5d6049eb70954207dca83",
                    "role": "TA",
                    "schedule": []
                }
            ]
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Accept Request
### Description: Accept a request. if a request is accepted, appropriate logic should be executed to handle
this request.
Method: POST
>```
>localhost:3000/hod/AcceptRequest
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json
{
    "data":{
        "requestID":"5fe5aea9454910a6eba36eb2"
    }
}
```
Response Ex:
```
{
    "result": {
        "status": "Accepted",
        "_id": "5fe5aea9454910a6eba36eb2",
        "senderID": "5fde9289417127e59ea05104",
        "receiverID": "5fde0d554dd30e34fc2658ef",
        "leave": {
            "document": null,
            "_id": "5fe6457ea60c67068c72875c",
            "leaveType": "Annual",
            "startDate": "2020-12-14T00:00:00.000Z",
            "endDate": "2020-12-16T00:00:00.000Z"
        },
        "responseDate": "2020-12-25T20:03:10.754Z",
        "comment": "\"study weeeeell\""
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Reject Request
### Description: Reject a request, and optionally leave a comment as to why this request was rejected
Method: POST
>```
>localhost:3000/hod/RejectRequest?comment="study weeeeell"
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMDEyMDAwMX0.lioP_wVNUH_LtVm15y1GAlMltM72g2ABCnqYqQySu1w|


### Body (**raw**)

```json
{
    "data":{
        "requestID":"5fe5aea9454910a6eba36eb2"
    }
}
```

### Query Params

|Param|value|
|---|---|
|comment|"study weeeeell"|

Response Ex:
```
{
    "result": {
        "status": "Rejected",
        "_id": "5fe5aea9454910a6eba36eb2",
        "senderID": "5fde9289417127e59ea05104",
        "receiverID": "5fde0d554dd30e34fc2658ef",
        "leave": {
            "document": null,
            "_id": "5fe6458ba60c67068c728780",
            "leaveType": "Annual",
            "startDate": "2020-12-14T00:00:00.000Z",
            "endDate": "2020-12-16T00:00:00.000Z"
        },
        "responseDate": "2020-12-25T20:03:23.426Z",
        "comment": "\"study weeeeell\""
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# Course Instructor 

## End-point: View coverage
### Description: View the coverage of course(s) he/she is assigned to.

Method: GET
>```
>http://localhost:3000/ci/viewCoverage
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|

Resopnse Ex.
```
{
    "result": [
        {
            "courseCode": "CSEN 401",
            "_id": "5fe5e2d23397bb4859bedcde",
            "coverage": 33.33333333333333
        },
        {
            "courseCode": "cs",
            "_id": "5fde0c35efbba4d74bccc8e7",
            "coverage": 66.66666666666666
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View slots
### Description: View the slots’ assignment of course(s) he/she is assigned to.
Method: GET
>```
>http://localhost:3000/ci/viewSlots
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|

Resopnse Ex.
```
{
    "result": {
        "schedule": [
            {
                "weekday": "Saturday",
                "number": "First",
                "courseID": "5fde0c35efbba4d74bccc8e7",
                "courseCode": "cs"
            }
        ],
        "staffID": "ac-6",
        "_id": "5fdfdfba2de69a30d40b0ff0",
        "email": "CI@test.com"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: assign academic to unassigned slot (slots)
### Description: Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
Method: POST
>```
>http://localhost:3000/ci/AssignUnassignedSlot
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{

 "data":{
"staffID":"ac-7",
"weekday":"Saturday",
"number":"Third",
"courseCode":"cs",
"location":"C7.102"
 }   

}
```

Response Ex:
```
{
    "result": {
        "staffID": "ac-7",
        "_id": "5fdfd99a3f70a1ef937d8368",
        "weekday": "Saturday",
        "number": "Third",
        "course": "5fde0c35efbba4d74bccc8e7",
        "location": "5fe4f2272e981a388385c9fc"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete academic from slot (slots)
### Description: delete assignment of academic member in course(s) he/she is assigned to
Method: POST
>```
>http://localhost:3000/ci/deleteAcademicFromSlot
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{

 "data":{
"staffID":"ac-7",
"weekday":"Saturday",
"number":"Third",
"courseCode":"cs",
"location":"C7.102"
 }   

}
```

Response Ex:
```
{
    "result": {
        "staffID": null,
        "_id": "5fdfd99a3f70a1ef937d8368",
        "weekday": "Saturday",
        "number": "Third",
        "course": "5fde0c35efbba4d74bccc8e7",
        "location": "5fe4f2272e981a388385c9fc"
    }
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update academic slot assignment (slots)
### Description: Update assignment of academic member in course(s) he/she is assigned to.
Method: POST
>```
>http://localhost:3000/ci/updateSlot
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{

 "data":{
"staffID":"ac-7",
"courseCode":"cs",
"weekdayBefore":"Saturday",
"numberBefore":"Third",
"locationBefore":"C7.102",
"weekdayAfter":"Monday",
"numberAfter":"First",
"locationAfter":"C7.102"

 }   

}
```
Response Ex:
```
{
    "result": {
        "staffID": "ac-7",
        "_id": "5fe5c55ad199d450a8cba072",
        "course": "5fde0c35efbba4d74bccc8e7",
        "number": "First",
        "weekday": "Monday",
        "location": "5fe4f2272e981a388385c9fc"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View staff assignments
### Description: View all the staff in his/her department or per course along with their profiles.

Method: GET
>```
>http://localhost:3000/ci/viewStaffWithCourseAssignments
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|

Response Ex:
```
{
    "result": [
        {
            "courseCode": "cs",
            "courseID": "5fde0c35efbba4d74bccc8e7",
            "result": [
                {
                    "courseIDs": [
                        "5fde0c35efbba4d74bccc8e7"
                    ],
                    "tokens": [],
                    "_id": "5fdfe690902d9b2a58444945",
                    "staffID": "ac-7",
                    "email": "TA@test.com",
                    "role": "TA",
                    "schedule": [
                        {
                            "staffID": "ac-7",
                            "_id": "5fe60fcb067fd948b81f3b65",
                            "course": "5fde0c35efbba4d74bccc8e7",
                            "number": "First",
                            "weekday": "Monday",
                            "location": "5fe4f2272e981a388385c9fc"
                        }
                    ],
                    "attendance": [],
                    "notifications": [],
                    "__v": 60
                },
                {
                    "courseIDs": [
                        "5fe5e2d23397bb4859bedcde",
                        "5fde0c35efbba4d74bccc8e7"
                    ],
                    "tokens": [],
                    "_id": "5fe5d6049eb70954207dca83",
                    "staffID": "ac-8",
                    "email": "TA2@test.com",
                    "role": "TA",
                    "attendance": [],
                    "notifications": [],
                    "schedule": [],
                    "__v": 0
                }
            ]
        },
        {
            "courseCode": "CSEN 401",
            "courseID": "5fe5e2d23397bb4859bedcde",
            "result": [
                {
                    "staffID": "ac-4",
                    "staffObjectID": "5fdd1b91f4df1c53ac0b9661",
                    "role": "Course Instructor",
                    "schedule": []
                },
                {
                    "staffID": "ac-6",
                    "staffObjectID": "5fdfdfba2de69a30d40b0ff0",
                    "role": "Course Instructor",
                    "schedule": []
                },
                {
                    "courseIDs": [
                        "5fe5e2d23397bb4859bedcde"
                    ],
                    "tokens": [],
                    "_id": "5fe5e20fffcc464320be69d5",
                    "staffID": "ac-10",
                    "email": "ahmedaly@guc.edu.eg",
                    "role": "TA",
                    "attendance": [],
                    "notifications": [
                        {
                            "date": "2020-12-25T13:58:31.382Z",
                            "read": false,
                            "_id": "5fe5f007fd4c4901fc771417",
                            "message": {
                                "status": "Accepted",
                                "_id": "5fe5f007fd4c4901fc771414",
                                "senderID": "5fe5e20fffcc464320be69d5",
                                "receiverID": "5fe5e1c7ffcc464320be69d4",
                                "linkingSlot": {
                                    "_id": "5fe5f007fd4c4901fc771412",
                                    "slot": {
                                        "staffID": null,
                                        "_id": "5fe5e7b93397bb4859bedcdf",
                                        "weekday": "Sunday",
                                        "number": "Second",
                                        "location": "5fe5e72d1a8106b169946528",
                                        "course": "5fe5e2d23397bb4859bedcde"
                                    },
                                    "__v": 0
                                },
                                "sentDate": "2020-12-25T13:58:31.215Z",
                                "__v": 0,
                                "responseDate": "2020-12-25T18:07:45.723Z"
                            },
                            "__v": 0
                        }
                    ],
                    "schedule": [
                        {
                            "staffID": "ac-10",
                            "_id": "5fe5e7b93397bb4859bedcdf",
                            "weekday": "Sunday",
                            "number": "Second",
                            "location": "5fe5e72d1a8106b169946528",
                            "course": "5fe5e2d23397bb4859bedcde"
                        }
                    ],
                    "__v": 7
                },
                {
                    "courseIDs": [
                        "5fe5e2d23397bb4859bedcde",
                        "5fde0c35efbba4d74bccc8e7"
                    ],
                    "tokens": [],
                    "_id": "5fe5d6049eb70954207dca83",
                    "staffID": "ac-8",
                    "email": "TA2@test.com",
                    "role": "TA",
                    "attendance": [],
                    "notifications": [],
                    "schedule": [],
                    "__v": 0
                }
            ]
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: assign course to TA (course)
### Description: 
Method: POST
>```
>localhost:3000/ci/assignTaToCourse
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-8",
        "courseCode":"cs"
    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [],
        "taList": [
            "5fdfe690902d9b2a58444945",
            "5fe5d6049eb70954207dca83"
        ],
        "slots": [
            "5fdfd9613f70a1ef937d8367",
            "5fdfd99a3f70a1ef937d8368"
        ],
        "_id": "5fde0c35efbba4d74bccc8e7",
        "courseCode": "cs",
        "coordinatorID": "5fdd1b91f4df1c53ac0b9661"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update ta course (course)
### Description: 
Method: POST
>```
>localhost:3000/ci/updateTACourse
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-8",
        "courseCodeBefore":"cs",
        "courseCodeAfter":"CSEN 401"

    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [
            "5fdd1b91f4df1c53ac0b9661",
            "5fdfdfba2de69a30d40b0ff0"
        ],
        "taList": [
            "5fe5e20fffcc464320be69d5",
            "5fe5d6049eb70954207dca83"
        ],
        "slots": [
            "5fe60e3702de9f499caaccc5"
        ],
        "_id": "5fe5e2d23397bb4859bedcde",
        "courseCode": "CSEN 401",
        "coordinatorID": "5fe5e1c7ffcc464320be69d4"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete course from TA (course)
### Description: 
Method: POST
>```
>localhost:3000/ci/deleteTafromCourse
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-8",
        "courseCode":"cs"
    }
}
```
Response Ex:
```
{
    "result": {
        "instructorIDs": [],
        "taList": [
            "5fdfe690902d9b2a58444945"
        ],
        "slots": [
            "5fdfd9613f70a1ef937d8367",
            "5fdfd99a3f70a1ef937d8368"
        ],
        "_id": "5fde0c35efbba4d74bccc8e7",
        "courseCode": "cs",
        "coordinatorID": "5fdd1b91f4df1c53ac0b9661"
    }
}
```



## End-point: assign course coordinator
### Description: Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
Method: POST
>```
>http://localhost:3000/ci/AssignCoordinator
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-3",
        "courseCode":"cs"
    }
}
```

Response Ex:
```
{
    "result": {
        "courseIDs": [],
        "tokens": [],
        "_id": "5fdd11b07cf00e5608244638",
        "staffID": "ac-3",
        "email": "test4@guc.edu.eg",
        "role": "Course Coordinator",
        "attendance": [],
        "notifications": [],
        "schedule": [],
        "__v": 102
    }
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
