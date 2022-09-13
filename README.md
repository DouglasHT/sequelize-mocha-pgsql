docker run \
 --name postgres \
 -e POSTGRES_USER=admin \
 -e POSTGRES_PASSWORD=senhaadmin \
 -e POSTGRES_DB=heroes \
 -p 5432:5432 \
 -d \
 postgres

docker run \
 --name adminer \
 -p 8080:8080 \
 --link postgres:postgres \
 -d \
 adminer
