# Postgres

Postgres is the primary datastore for the application.

## Useful Commands

Open a `psql` shell:

```bash
kubectl cnpg psql flock-auth
```

Run a command through `psql`:

```bash
kubectl cnpg psql flock-auth -- -c "\du"
kubectl cnpg psql flock-auth -- -d authentication -c "\dt"
```

## Connecting in IntellIJ

```bash
kubectl port-forward svc/flock-auth-rw 5432:5432 
```

Provide this in IntelliJ's database connection settings:

• Host: `localhost` 
• Port: `5432` 
• Database: `flockdb`
• Username: `flockuser`
• Password: `flock123`

The connection string will look like `jdbc:postgresql://localhost:5432/authentication`.

### Queries to run

```sql
select *
from credential;
```
