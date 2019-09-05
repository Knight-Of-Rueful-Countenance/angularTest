#mongodb server
FROM mongo:latest

#setup
CMD mkdir data && mkdir data/db

#start server
CMD mongod --port 27017 --dbpath /data/db --bind_up 127.0.0.1
CMD username="myUserAdmin" && \
    password="abc123" && \
mongo auth --port 27017 && use admin && db.createUser(\
  {\
    user: $username,\
    pwd:  $password,\
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]\
  }\
) ; use auth && db.grantRolesToUser('$username', [{ role: 'root', db: 'admin' }]) ;\
db.createCollection("Credentials",{ validator: {$jsonSchema: {bsonType:"object",required:["username","password"], properties:{username:{ bsonType: "string", pattern: "^[a-zA-Z0-9_]*$", minLength:4, maxLength:32, description: "Username and is required"    },password:{ bsonType: "string", minLength:4,maxLength:32, description: "Password and is required"}}}},validationLevel:"strict",validationAction:"error"});\
db.createCollection("Tokens",{ validator: {$jsonSchema: {bsonType:"object",required:["access_key","expiry"], properties:{username:{ bsonType: "string", description: "access_key and is required"    },password:{ bsonType: "timestamp", description: "Date of expiry for access key"}}}},validationLevel:"strict",validationAction:"error"})

CMD mongod --auth --port 27017 --dbpath /data/db
