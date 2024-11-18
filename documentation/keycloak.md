# KeyCloak

## Using an external database to power KeyCloak

References:

1. [Configuring a Database](https://www.keycloak.org/server/db#_configuring_a_database)
2. [Use an External Database](https://github.com/bitnami/charts/tree/main/bitnami/keycloak/#use-an-external-database)

```yaml
externalDatabase:
  host: # Replace with your PostgreSQL host
  port: # Default PostgreSQL port; adjust if different
  user: # Your database username
  password: # Your database password
  database: # The name of your Keycloak database
  existingSecret: "" # Optional: specify an existing secret if you store credentials securely
```

Many of these values are obviously defined in `yaml` files, but I will list how to find them explicitly here:

### Host

```bash
kubectl get clusters -o json | jq -r '.items[].metadata.name'
```

Yields `flock-db`

We can also check the services:

```bash
k get svc
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
flock-db-r    ClusterIP   10.109.79.102   <none>        5432/TCP   13m
flock-db-ro   ClusterIP   10.98.228.131   <none>        5432/TCP   13m
flock-db-rw   ClusterIP   10.107.226.79   <none>        5432/TCP   13m
```

Basically, `flock-db-rw` is good to use because it is read-write, like the primary host of the database.

So, we will use `flock-db-rw` as the host.

### Username

```bash
kubectl get secret flockuser-secret -o jsonpath="{.data.username}" | base64 --decode
```

Yields `flockuser`

### Password

```bash
kubectl get secret flockuser-secret -o jsonpath="{.data.password}" | base64 --decode
```

Yields `flock123`

### Database

This seems to be arbitrary, so we can just specify `keycloak` as the name for the database.

### Final Result

```yaml
externalDatabase:
  host: flock-db-rw.default.svc.cluster.local
  port: 5432
  user: flockuser
  password: flock123
  database: keycloak
```

## Operator Installaion

From:

- https://www.keycloak.org/operator/installation
- https://www.keycloak.org/operator/basic-deployment

### 2024/11/17 Failing to setup the operator

```bash
skaffold dev -m keycloak-configuration

k describe pod flock-kc-0
...
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Normal   Scheduled  40s                 default-scheduler  Successfully assigned default/flock-kc-0 to minikube
  Normal   Pulled     39s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 1.419s (1.419s including waiting). Image size: 440923675 bytes.
  Normal   Pulling    25s (x2 over 40s)   kubelet            Pulling image "quay.io/keycloak/keycloak:26.0.5"
  Normal   Created    24s (x2 over 39s)   kubelet            Created container keycloak
  Normal   Started    24s (x2 over 39s)   kubelet            Started container keycloak
  Normal   Pulled     24s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 606ms (606ms including waiting). Image size: 440923675 bytes.
  Warning  Unhealthy  21s (x17 over 38s)  kubelet            Startup probe failed: Get "http://10.244.0.77:9000/health/started": dial tcp 10.244.0.77:9000: connect: connection refused
```