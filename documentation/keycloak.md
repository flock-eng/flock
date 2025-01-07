# KeyCloak

KeyCloak is used as the identity and access management system.

## Steps after Cluster Deploymetnt

```bash
open "https://$(kubectl get ing keycloak -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

--> Navigate to the `Administration Console` for the `flock` realm 
--> Clients 
--> Create Client
  ... Client ID: `flock-web`, 
  ... Authentication Flow: Standard Flow 
  ... Client Authentication: On
  ... Valid Redirect URIs: `https://app.domain.net/*`
  ... Web Origins: `https://app.domain.net`
--> Save
--> Clients
--> flock-web
--> Credentials
--> Copy the Client Secret
--> Update the 1password item read by KeyCloak.client_secret:

Verify the secret matches what you put in 1password:

```bash
k delete -f secrets/keycloak.yaml
k apply -f secrets/keycloak.yaml
kubectl get secret keycloak-credentials -o jsonpath="{.data.client_secret}" | base64 --decode
```

If it looks good, then restart the `flock-web` pods:

```bash
kubectl rollout restart deployment/flock-web
```

Open the Flock realm:

```bash
open "https://$(kubectl get ing keycloak -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/realms/flock/account/"
```

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

Yields `flock-auth`

We can also check the services:

```bash
k get svc
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
flock-auth-r    ClusterIP   10.109.79.102   <none>        5432/TCP   13m
flock-auth-ro   ClusterIP   10.98.228.131   <none>        5432/TCP   13m
flock-auth-rw   ClusterIP   10.107.226.79   <none>        5432/TCP   13m
```

Basically, `flock-auth-rw` is good to use because it is read-write, like the primary host of the database.

So, we will use `flock-auth-rw` as the host.

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
  host: flock-auth-rw
  port: 5432
  user: flockuser
  password: flock123
  database: keycloak
```

## Accessing the Admin Console

```bash
kubectl port-forward --namespace keycloak svc/keycloak 9091:80
```

Visit http://localhost:9091

Login with the following credentials:

- Username: `admin`
- Password: `password`

