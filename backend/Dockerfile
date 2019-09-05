#mongodb server
FROM mongo:latest

#setup
CMD mkdir data && mkdir data/db

#start server
CMD mongod --port 27017 --dbpath /data/db --bind_up 127.0.0.1
CMD username="myUserAdmin" && \
    password="abc123" && \
mongo --port 27017 && use admin && db.createUser(\
  {\
    user: $username,\
    pwd:  $password,\
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]\
  }\
) && db.grantRolesToUser('$username', [{ role: 'root', db: 'admin' }])
CMD mongod --auth --port 27017 --dbpath /data/db
