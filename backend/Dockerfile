#mongodb server
FROM mongo:latest

#setup
CMD mkdir data && mkdir data/db

#start server
CMD mongod --port 27017 --dbpath /data/db
CMD mongo --port 27017 && use admin && db.createUser(\
  {\
    user: "myUserAdmin",\
    pwd: "abc123",\
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]\
  }\
)
CMD mongod --auth --port 27017 --dbpath /data/db
