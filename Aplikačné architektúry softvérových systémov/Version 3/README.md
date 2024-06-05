# infocat

- vytvorit DB s menom infocat
- na BE pustit node ace migration:run
- node ace db:seed
- pustit import skript
- pustit BE a FE a frcime

# front-end
Start command: npm run dev
# back-end
Start command: node ace serve --watch
# database
Database: PostgreSQL
Login credentials for pgAdmin 4
Hostname/address: localhost
Port: 54321
Maintenance database: postgres
Username: root
Password: password
Database name: infocat

# camunda setup
docker pull camunda/camunda-bpm-platform:run-latest
docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:run-latest
http://localhost:8080/camunda/app/welcome/default/
username: demo
password: demo

# kafka setup 
cd kafka
docker-compose up -d
stiahnut offset explorer 3.0