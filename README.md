# GUC Staff Members routes

Functionality: Log in\
Route: general/login\
Request type: POST\
Request Parameters: -\
Route example: -\
Request body: { “email”: “user@domain.com", “password: “123456”}\
Response type and format: -\
Response example: -

Functionality: Log out\
Route: staff/logout\
Request type: POST\
Request Parameters: -\
Route example: -\
Request body: -\
Response type and format: -\
Response example: -

Functionality: view my profile\
Route: staff/myprofile\
Request type: GET\
Request Parameters: -\
Route example:  -\
Request body: -\
Response type and format: the user object without the password\
Response example: {“staffID”: “hr-1”, “name”: pickle, …}

Functionality: update my profile\
Route: /updateprofile\
Request type: PUT\
Request Parameters: -\
Route example:  -\
Request body: the new user object {email, password, gender,\
 officeLocation, facultyName, departmentName, others}\
Response type and format: the updated user\
Response example: {“staffID”:1, “name”: “some guy”, email:”user@domain.com”, …}

Functionality: Reset my password\
Route: /resetpassword\
Request type: PUT\
Request Parameters: -\
Route example:  -\
Request body: current and new password {“curPassword”: “1234”, “newPassword”: ”5678”}\
Response type and format: the updated user object\
Response example: {“staffID”:1, “name”: “ahmed, email:”user@domain.com”, …}

Functionality: Sign in (attendance)\
Route: /signin\
Request type: PUT \
Request Parameters: -\
Route example:  -\
Request body: -\
Response type and format: -\
Response example: -

Functionality: Sign out (attendance)\
Route: /signout/\
Request type: PUT \
Request Parameters: -\
Route example:  -\
Request body: -\
Response type and format: -\
Response example: -

Functionality: view my attendance record\
Route: /attendance/:month?\
Request type: GET\
Request Parameters: month is the month(1-12) number we filter by. Not providing month get all the records\
Route example:  /attendace/6\
Request body: -
Response type and format: an array of sign in/out pairs {signIn: Date, signOut: Date}\
Response example: [{signIn: “2020-12-19T11:30:00.000”, signOut: “2020-12-19T13:46:26.000”}, …]

Functionality: return a user's missing days so far for this month (11th to today)\
Route: /missingdays\
Request type: GET\
Request Parameters: -\
Route example: -\
Request body: -\
Response type and format: total missed day with their dates { total: int, dates: array }\
Response example: { total: 2, dates:  [“2020-12-19T00:00:00.000”, “2020-12-20T00:00:00.000”] }

Functionality: return a user's missing hours so far for this month (11th to today)\
Route: /missinghours\
Request type: GET\
Request Parameters: -\
Route example: -\
Request body: -\
Response type and format: total missed hours with their dates and hours in each date { total: int, dates: array<{date: Date, missingHours: float}> }\
Response example: { total: 3.5, dates: [{date: “2020-12-19T00:00:00.000”, missingHours: 2.3},…]}

Functionality: return a user's extra hours so far this month (11th to today)\
Route: /extrahours\
Request type: GET\
Request Parameters: -\
Route example:  -\
Request body: -\
Response type and format: total extra hours with their dates and hours in each date { total: int, dates: array<{date: Date, extraHours: float}> }\
Response example:{ total: 3.5, dates: [{date: “2020-12-22T00:00:00.000”, extraHours: 2.3},…]}



# HR routes

Functionality: add a location to the database\
Route: /addlocation\
Request type: POST\
Request Parameters: -\
Route example: -\
Request body: {name, capacity, currentlyTakenSeats(optional), type}\
Response type and format: the added location object\
Response example: {“name”: “C2.302”, “capacity”: 25, “currentlyTakenSeats”: 4, “type”: “tutorial”}

Functionality: update location\
Route: /updatelocation/:locationName\
Request type: PUT\
Request Parameters: locationName is the name of the location we wish to update e.g(“C3.206”)\
Route example:  /updatelocation/C3.203\
Request body: updated location object {“name”: “C2.302”, “capacity”: 28, “currentlyTakenSeats”: 4, “type”: “tutorial”}\
Response type and format: the updated location object\
Response example: {“name”: “C2.302”, “capacity”: 28, “currentlyTakenSeats”: 4, “type”: “tutorial”}

Functionality: delete a location from the database\
Route: /deletelocation/:locationName\
Request type: PUT\
Request Parameters: locationName is the name of the location we wish to delete e.g(“C3.206”)\
Route example:  /deletelocation/C3.203\
Request body: -\
Response type and format: -\
Response example: -\


Functionality: add a faculty to the database\
Route: /addfaculty/:name/\
Request type: POST
Request Parameters: name is the name of the faculty we wish to add\
Route example:  /addfaculty/engineering\
Request body: -\
Response type and format: the added faculty object\
Response example: {“name”: “ENGINEERING”, “departments”: []}

Functionality: update a faculty in the database\
Route: /updatefaculty/:facultyName/\
Request type: PUT
Request Parameters: facultyName is the name of the faculty we wish to update\
Route example:  /updatefaculty/engineering\
Request body: the new faculty name {name: “law”}\
Response type and format: the updated faculty object\
Response example: {“name”: “LAW”, “departments”: []}

Functionality: delete a faculty from the database\
Route: /deletefaculty/:facultyName\
Request type: PUT\
Request Parameters: facultyName is the name of the faculty we wish to delete\
Route example:  /deletefaculty/engineering\
Request body: -\
Response type and format: -\
Response example: -

Functionality: add a department under a faculty. create the department if it does not exist\
Route: /adddepartment/:facultyName/:departmentName\
Request type: POST\
Request Parameters: facultyName is the name of the faculty we wish to add the department under. departmentName is the dperatment name we wish to add\
Route example:  /adddepartment/engineering/batates\
Request body: -\
Response type and format: the added department object\
Response example: {“name”: “BATATES”, “courseIDs”: [], hodID: Undefined}

Functionality: update a department in the database\
Route: /updatedepartment/:facultyName/:departmentName\
Request type: PUT\
Request Parameters: facultyName is the name of the faculty containing the department we wish to update. departmentName is the name of the department we wish to update\
Route example:  /updatedepartment/engineering/batates\
Request body: the new department name and hodID {name: “tamatem”, hodID: “ac-2”}\
Response type and format: the updated department object\
Response example: {“name”: “TAMATEM”, “courseIDs”: [], hodID: “ac-2”}

Functionality: remove a department under a faculty (not deletion)\
Route: removedepartment/:facultyName/:departmentName\
Request type: PUT\
Request Parameters: facultyName is the name of the faculty containing the department we wish to remove. departmentName is the name of the department we wish to remove\
Route example:  /removedepartment/engineering/batates\
Request body: -\
Response type and format: the updated faculty document\
Response example: {“name”: “ENGINEERING”, “departments”: [TAMATEM]}

Functionality: delete a department from the database\
Route: deletedepartment/:departmentName\
Request type: PUT\
Request Parameters: departmentName is the name of the department we wish to delete\
Route example:  /deletedepartment/engineering/batates\
Request body: -\
Response type and format: -\
Response example: -

Functionality: add a course under a department. create the course if it does not exist\
Route: /addcourse/:departmentName/:courseCode\
Request type: POST\
Request Parameters: departmentName is the name of the department we wish to add the course under. courseCode is the code of the course we wish to add \
Route example:  /addcourse/batates/csen101\
Request body: -\
Response type and format: the added course object\
Response example: {“courseCode”: “CSEN101”, “instructorIDs”: [], “coordinatorID”: [], “taList”: [], “slots”: []}


Functionality: update a course in the database\
Route: /updatecourse/:departmentName/:courseCode\
Request type: PUT
Request Parameters: departmentName is the department containing the course we wish to update. courseCode is the code of the course we wish to update \
Route example:  /updatecourse/batates/csen101\
Request body: the new course code {code: “csen202””}\
Response type and format: the updated course object\
Response example: {“courseCode”: “CSEN202”, “instructorIDs”: [], “coordinatorID”: [], “taList”: [], “slots”: []}

Functionality: remove a course under a department (not deletion)\
Route: /removecourse/:departmentName/:courseCode\
Request type: PUT\
Request Parameters: departmentName is the department containing the course we wish to remove. courseCode is the code of the course we wish to remove\ 
Route example:  /removecourse/batates/csen101\
Request body: -\
Response type and format: the updated department document\
Response example: {“name”: “TAMATEM”, “courseIDs”: [], hodID: “ac-2”}

Functionality: delete a course from the database\
Route: /deletecourse/:courseCode\
Request type: PUT\
Request Parameters: courseCode is the code of the course we wish to delete\
Route example:  /deletefaculty/csen101\
Request body: -\
Response type and format: -\
Response example: -


Functionality: add a new staff member to the system\
Route: /addstaff\
Request type: POST\
Request Parameters: -\
Route example:  /addcourse/batates/csen101\
Request body: the staff object {“staffID”:1, “name”: “ahmed, email:”user@domain.com”, …}\
Response type and format: the added staff object\
Response example: {“staffID”:1, “name”: “ahmed, email:”user@domain.com”, …}

Functionality: update a user's info.\
Route: /updatestaff\
Request type: PUT\
Request Parameters: -\
Route example:  -\
Request body: the staff object (must contain staffID) {“staffID”:hr-1, “name”: “ahmed, email:”user@domain.com”, …}\
Response type and format: the updated staff object\
Response example: {“staffID”:hr-1, “name”: “ahmed, email:”user@domain.com”, …}

Functionality: delete a staff member from the system\
Route: /deletestaff/:staffID\
Request type: DELETE\
Request Parameters: staffID is the id of the user we wish to delete\
Route example:  /deletestaff/hr-1\
Request body: -\
Response type and format: -\
Response example: -

Functionality: add missing attendance for a user\
Route: /addmissingattendance/:staffID\
Request type: PUT\
Request Parameters: staffID is the id of the user we wish to modify\
Route example:  /addmissingattendance/hr-1\
Request body: {attendanceDateTime, inOut}. attendanceDateTime is the date and time of the sign in/out. inOut is a sting indicating whether this is a sign in or a sign out. values: [IN,OUT] \
Response type and format: updated attendance record\
Response example: {date:”2020-12-19T00:00:00.000”, signIn: [], signOut: []}

Functionality: view any user's attendance record\
Route: /viewattendance/:staffID\
Request type: GET\
Request Parameters: staffID is the id of the user we wish to view\
Route example:  /viewattendance/hr-1\
Request body: all attendance records of a user \
Response example: [{date:”2020-12-19T00:00:00.000”, signIn: [], signOut: []},…]

Functionality: get users with missing days/hours this month so far\
Route: /viewmissingusers\
Request type: GET\
Request Parameters: -\
Request body: -\
Response type and format: array of users with missed days/hours along with their total missed days/hours so far this month\
Response example: [{staffID: hr-1, missingDays: 3, missingHours: 2.3},…]

Functionality: update a staff member's salary\
Route: /updatesalary/:staffID/:newSalary\
Request type: PUT\
Request Parameters: staffID is the id of the user we wish to modify. newSalary is the updated salary\
Request body: -\
Response type and format: the updated user object\
Response example: {“staffID”:1, “name”: “ahmed, email:”user@domain.com”, “salary”: 10 …}





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

Functionality: View “slot linking” request(s) from academic members linked to his/her course.
Route: /course-coordinator/slot-linking-request
Request type: GET
Response: Array of slot linking requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T13:58:31.382Z",
            "read": false,
            "_id": "5fe5f007fd4c4901fc771417",
            "message": {
                "status": "Pending",
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
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T14:45:25.993Z",
            "read": false,
            "_id": "5fe5fb05d5091f53784492aa",
            "message": {
                "status": "Pending",
                "_id": "5fe5fb05d5091f53784492a7",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe5fb05d5091f53784492a5",
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
                "sentDate": "2020-12-25T14:45:25.834Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: Accept “slot linking” requests from academic members linked to his/her course.
Route: /course-coordinator/slot-linking-request/accept
Request type: POST
Request body: { "requestID" : "5fe63fbbe8a2fc5f94a864a3" }
Response: { msg: "Slot linking accepted." }

Functionality: Reject “slot linking” requests from academic members linked to his/her course.
Route: /course-coordinator/slot-linking-request/reject
Request type: POST
Request body: { "requestID" : "5fe63fbbe8a2fc5f94a864a3" }
Response: { msg: "Slot linking rejected." }

Functionality: Add course slot(s) in his/her course.
Route: /course-coordinator/course-slot/add
Request type: POST
Request body: { "weekday": "Monday", "slotNum" : "Second", "locationId": "5fe5e72d1a8106b169946528" }
Response: { msg: "Slot added"}

Functionality: Delete course slot(s) in his/her course.
Route: /course-coordinator/course-slot/delete
Request type: DELETE
Request body: { "slotId" : "5fe63172ea7dc545d86c8e24" }
Response: { msg: "Slot deleted"}


Functionality: Update course slot(s) in his/her course.
Route: /course-coordinator/course-slot/update
Request type: PUT
Request body: { "slotId" : "5fe63172ea7dc545d86c8e24" , "newWeekday" : "Wednesday", "newSlotNum": "First", "newLocationId" : "5fe5e72d1a8106b169946528" }
Response: { msg: "Slot updated"}




Functionality: View their schedule.
Route: /academic/schedule
Request type: GET
Response: An array of slots. Example:
{
	"schedule": {
	  sat: {
		first: 'Free',
		second: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  },
	  sun: {
		second: {
		  staffID: 'ac-10',
		  _id: 5fe60e3702de9f499caaccc5,
		  weekday: 'Sunday',
		  number: 'Second',
		  location: 5fe5fda33397bb4859bedce2,
		  course: 5fe5e2d23397bb4859bedcde
		},
		first: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  },
	  mon: {
		first: 'Free',
		second: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  },
	  tue: {
		first: 'Free',
		second: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  },
	  wed: {
		second: {
		  staffID: 'ac-10',
		  _id: 5fe5e7b93397bb4859bedcdf,
		  weekday: 'Wednesday',
		  number: 'Second',
		  location: 5fe5e72d1a8106b169946528,
		  course: 5fe5e2d23397bb4859bedcde
		},
		first: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  },
	  thu: {
		first: 'Free',
		second: 'Free',
		third: 'Free',
		fourth: 'Free',
		fifth: 'Free'
	  }
	}
}


Functionality: view “replacement” request(s).
Route: /academic/replacement-request
Request type: GET
Response: Array of replacement requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T13:58:31.382Z",
            "read": false,
            "_id": "5fe5f007fd4c4901fc771417",
            "message": {
                "status": "Pending",
                "_id": "5fe5f007fd4c4901fc771414",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "replacement": {
                    "_id": "5fe5f007fd4c4901fc771412",
					"replacementDay" : 2020-12-27T00:00:00.000+00:00,
                    "replacementSlot": {
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
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: send “replacement” request(s).
Route: /academic/replacement-request/send
Request type: POST
Request body: { "replacementDate" : "2020-12-31", "slotRep" : ["ac-12"]}
Response: { msg: "Replacement requests sent." }

Functionality: Send a “slot linking” request
Route: /academic/slot-linking-request/send
Request type: POST
Request body: { "slotID": "5fe63172ea7dc545d86c8e24" }
Response: { msg: "Slot linking request sent." }

Functionality: Change their day off by sending a “change day off” request 
Route: /academic/day-off-request/send
Request type: POST
Request body:  { "dayOff" : "Sunday", "reason" : "any reason" }
Response: { msg: "Day off request sent." }


Functionality: Submit annual leave
Route: /academic/annual-leave-request/send
Request type: POST
Request body:  { "startLeaveDate" : "2020-12-30", "endLeaveDate" : "2021-01-10", "reason" : "any reason" }
Response: { msg: "Annual leave request sent. Please send replacement requests for the following working days: 
Thu Dec 31 2020"}

Functionality: Submit accidental leave
Route: /academic/accidental-leave-request/send
Request type: POST
Request body:  { "startLeaveDate" : "2020-12-30", "endLeaveDate" : "2021-01-10", "reason" : "any reason" }
Response: { msg: "Accidental leave request sent."}


Functionality: Submit sick leave
Route: /academic/sick-leave-request/send
Request type: POST
Request body:  { "startLeaveDate" : "2020-12-30", "endLeaveDate" : "2021-01-10", "reason" : "any reason"}
Response: { msg: "Sick leave request sent." }


Functionality: Submit maternity leave
Route: /academic/maternity-leave-request/send
Request type: POST
Request body:  { "startLeaveDate" : "2020-12-30", "endLeaveDate" : "2021-01-10", "reason" : "any reason"}
Response: { msg: "Maternity leave request sent." }


Functionality: Submit compensation leave
Route: /academic/compensation-leave-request/send
Request type: POST
Request body:  { "compensationLeaveDate" : "2020-12-30", "compensationDate" : "2021-01-10", "reason" : "any reason"}
Response: { msg: "Compensation leave request sent." }

Functionality: view notifications
Route: /academic/notifications
Request type: GET
Response: An array of notifications. Example:
{
    "notifications": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: view accepted notifications
Route: /academic/notifications/accepted
Request type: GET
Response: An array of notifications. Example:
{
    "notifications": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: view rejected notifications
Route: /academic/notifications/rejected
Request type: GET
Response: An array of notifications. Example:
{
    "notifications": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: view requests
Route: /academic/requests
Request type: GET
Response: An array of requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}


Functionality: view accepted requests
Route: /academic/requests/accepted
Request type: GET
Response: An array of requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: view rejected requests
Route: /academic/requests/rejected
Request type: GET
Response: An array of requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}


Functionality: view pending requests
Route: /academic/requests/pending
Request type: GET
Response: An array of requests. Example:
{
    "requests": [
        {
            "date": "2020-12-25T19:39:55.023Z",
            "read": true,
            "_id": "5fe6400be8a2fc5f94a864e0",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:09:08.514Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:03.773Z",
            "read": true,
            "_id": "5fe641b7e8a2fc5f94a86503",
            "message": {
                "status": "Accepted",
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
                "__v": 0,
                "responseDate": "2020-12-25T20:08:46.223Z"
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:47:51.185Z",
            "read": true,
            "_id": "5fe641e7e8a2fc5f94a8652c",
            "message": {
                "status": "Pending",
                "_id": "5fe641e7e8a2fc5f94a86529",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe641e6e8a2fc5f94a86527",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:47:51.023Z",
                "__v": 0
            },
            "__v": 0
        },
        {
            "date": "2020-12-25T19:49:15.865Z",
            "read": true,
            "_id": "5fe6423be8a2fc5f94a8655b",
            "message": {
                "status": "Pending",
                "_id": "5fe6423be8a2fc5f94a86558",
                "senderID": "5fe5e20fffcc464320be69d5",
                "receiverID": "5fe5e1c7ffcc464320be69d4",
                "linkingSlot": {
                    "_id": "5fe6423be8a2fc5f94a86556",
                    "slot": {
                        "staffID": null,
                        "_id": "5fe63172ea7dc545d86c8e24",
                        "weekday": "Monday",
                        "number": "Third",
                        "location": "5fe5fda33397bb4859bedce2",
                        "course": "5fe5e2d23397bb4859bedcde",
                        "__v": 0
                    },
                    "__v": 0
                },
                "sentDate": "2020-12-25T19:49:15.695Z",
                "__v": 0
            },
            "__v": 0
        }
    ]
}

Functionality: cancel request
Route: /academic/requests/cancel
Request type: POST
Request body:  { "reqID" : "5fe006752b20d1fd634dbc1e"}
Response: { msg: "Request deleted." }