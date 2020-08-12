run with:
npm run clean-build-start

open browser and enter: http://127.0.0.1:8081/playground

enter query: 

query {
  test(code: "test")
}

you will see 500 error. On code remove the errorHandler: false it throws correct format on manual error but format changes when system throws error such as when using an incorrect function like test2(code: "test").
