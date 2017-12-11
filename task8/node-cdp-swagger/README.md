# Skeleton project for Swagger
Pet project for Node CDP #8

## Getting Started
To setup the project you should do the following steps:

```
npm i swagger -g
npm i pretty-swag -g
npm i
```

To build only project use
```
swagger project start
```

To edit project with enabled request sending use
```
swagger project start
swagger project edit
```

To get standalone html use
```
pretty-swag -i ./api/swagger/swagger.yaml -th green
```