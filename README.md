run with:
npm run clean-build-start

open browser and enter: http://127.0.0.1:8081/playground

enter query: 

query {
  find(code: "test")
}

press run button twice to generate error.

You will see 500 error with error: 
{
  "error": {
    "test": "error handler test"
  }
}
Please look at logs. 500 errors go through errorFormatter, however, fails on the errorHandler when trying to print the error due to data being null. Ideally we want to use the error message coming form the error.

next run query:
query {
  find(code: null)
}

You will receive a 400 error with the custom error handler:
{
  "error": {
    "test": "error handler test"
  }
}
Please look at logs. 400 errors DO NOT go through errorFormatter, they go directly to the error handler.