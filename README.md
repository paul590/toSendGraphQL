run with:
npm run clean-build-start

open browser and enter: http://127.0.0.1:8081/playground

enter query: 

mutation {
  save(input: {
    code: "test"
  }){
    code
  }
}

You will see 500 error with error: 
{
  "error": {
    "errors": [
      {
        "message": "Test already exists",
        "locations": [
          {
            "line": 2,
            "column": 3
          }
        ],
        "path": [
          "save"
        ]
      }
    ],
    "data": null
  }
}

next run query:
mutation {
  save(input: {
    code: null
  }){
    code
  }
}

You will receive a 400 error with the custom error handler:
{
  "error": {
    "test": "error handler test"
  }
}