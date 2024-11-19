# Postgres

We use Postgres as the primary database for the application. It runs through the Cloud Native PostgreSQL Operator.

## Useful Commands

Open a `psql` shell:

```bash
kubectl cnpg psql flock-db
```

Run a command through `psql`:

```bash
kubectl cnpg psql flock-db -- -c "\du"
kubectl cnpg psql flock-db -- -d flockdb -c "\dt"
```

## Connecting in IntellIJ

```bash
kubectl port-forward svc/flock-db-rw 5432:5432 
```

Provide this in IntelliJ's database connection settings:

• Host: `localhost` (because of the port-forward)                                                                                                                                                                                                                                                                     
• Port: `5432` (as configured in skaffold.yaml's port-forward)                                                                                                                                                                                                                                                        
• Database: `flockdb` (from flock-db.yaml's bootstrap.initdb.database)                                                                                                                                                                                                                                                
• Username: `flockuser` (from secret.yaml)                                                                                                                                                                                                                                                                            
• Password: `flock123` (from secret.yaml)

The connection string will look like `jdbc:postgresql://localhost:5432/flockdb`.

### Queries to run

```sql
select *
from credential;
```
