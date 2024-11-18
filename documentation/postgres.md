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