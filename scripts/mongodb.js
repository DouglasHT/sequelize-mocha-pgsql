// docker ps
// docker exec -it a9147850fc8e mongo -u doug -p 123 --authenticationDatabase herois

// databases
show dbs

// mudando o conexto para uma database
use herois

// mostrar tabelas(colecoes)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})