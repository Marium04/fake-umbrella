FROM mongo:latest

COPY customer-database.json /customer-database.json

CMD mongoimport  --db=customers --collection=customers --type=json --file=customer-database.json --jsonArray
