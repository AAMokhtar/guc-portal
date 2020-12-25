# Project: Course Instructor 

## End-point: View coverage
### Description: 
Method: GET
>```
>http://localhost:3000/ci/viewCoverage
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View slots
### Description: 
Method: GET
>```
>http://localhost:3000/ci/viewSlots
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEwMTE1MDQyfQ.BQIjNtK2MmmSSgWnZwjpf3tM1OUkldlX0J2P15ObkyY|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: assign academic to unassigned slot (slots)
### Description: 
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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete academic from slot (slots)
### Description: 
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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update academic slot assignment (slots)
### Description: 
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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View staff assignments
### Description: 
Method: GET
>```
>http://localhost:3000/ci/viewAssignments
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNCIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZDFiOTFmNGRmMWM1M2FjMGI5NjYxIiwiZXhwIjoxNjA4NTczODYxfQ.SZZJhHH0EvoTH7mZXk0_wYelIj0PZJy8ExJVB2V7BJA|



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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# Project: HOD

## End-point: Assign instructor to course
### Description: 
Method: POST
>```
>localhost:3000/hod/assignInstructor
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODQwMzg5OX0.eGLPCJDCmFK8JAA_FtJd16uy_cZDtKkdTNSvP5F5q5c|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-4",
        "courseCode":"cs"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Update instructor course (course)
### Description: 
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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Delete instructor from course
### Description: 
Method: DELETE
>```
>localhost:3000/hod/deleteInstructor
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODQwMzg5OX0.eGLPCJDCmFK8JAA_FtJd16uy_cZDtKkdTNSvP5F5q5c|


### Body (**raw**)

```json
{
 "data":{
        "staffID":"ac-4",
        "courseCode":"cs"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: view dayOff
### Description: 
Method: GET
>```
>localhost:3000/hod/viewDayOff
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODQwMzg5OX0.eGLPCJDCmFK8JAA_FtJd16uy_cZDtKkdTNSvP5F5q5c|


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View all Staff in my department
### Description: 
Method: GET
>```
>localhost:3000/hod/viewStaff?courseCode=cs
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODQwMzg5OX0.eGLPCJDCmFK8JAA_FtJd16uy_cZDtKkdTNSvP5F5q5c|


### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|courseCode|cs|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View requests
### Description: 
Method: GET
>```
>localhost:3000/hod/viewRequests?staffID=ac-2
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
|staffID|ac-2|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View coverage
### Description: 
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


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: View teaching assignments
### Description: 
Method: GET
>```
>localhost:3000/hod/viewAssignements
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODU3MTQ4NH0.Jl2l8JQ0uOT-vy5xVT7vW0joPa1zyAszhFFGAoSQl9E|


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Accept Request
### Description: 
Method: POST
>```
>localhost:3000/hod/AcceptRequest
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODU2OTMwN30.sjEZVLT0AnExnyBoXboI5b_ALaysJS3FkFxEgQu85m8|


### Body (**raw**)

```json
{
    "body":{
        "requestID":"5fe5aea9454910a6eba36eb2"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Reject Request
### Description: 
Method: POST
>```
>localhost:3000/hod/RejectRequest?comment="study weeeeell"
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYwODg5NjQ5MH0.gLyhTST8G732SOdQbm_Id1WDoRvNk0LtHIHDIkKzVko|


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



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

_________________________________________________
Author: [bautistaj](https://github.com/bautistaj)

Package: [postman-to-markdown](https://github.com/bautistaj)

_________________________________________________
Author: [bautistaj](https://github.com/bautistaj)

Package: [postman-to-markdown](https://github.com/bautistaj)
