# KeyCloak

KeyCloak is used as the identity and access management system.

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
  host: flock-db-rw
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

---

## Keycloak Continued(automatic realm import docs):

Steps to access the keycloak console
```bash
# ### complete all asks in readme.md first ###

# go to the flock-kc directory
cd /flock-kc

# apply the configmap
kubectl apply -f realm-config.yaml

# apply the values.yaml config using Helm 
# effectively restarts pod if changes occur
helm upgrade keycloak bitnami/keycloak -f values.yaml --namespace keycloak

# confirm that pods are running before continuing
kubectl get pods -n keycloak

# port forward in another terminal
kubectl port-forward --namespace keycloak svc/keycloak 9091:80

# navigate to the admin console in your browser
http://localhost:9091
```

Frequent debugging actions:
```bash
# get kubernetes secrets for user/pass
kubectl get secret keycloak -n keycloak -o jsonpath='{.data.admin-username}' | base64 --decode
kubectl get secret keycloak -n keycloak -o jsonpath='{.data.admin-password}' | base64 --decode

# ways to restart the keycloak-0 pod
helm upgrade keycloak bitnami/keycloak -f values.yaml --namespace keycloak
# OR
kubectl delete pod -l app.kubernetes.io/name=keycloak -n keycloak

# check/describe if realm-config cfgmap exists
kubectl get configmap keycloak-realm-config -n keycloak
kubectl describe configmap keycloak-realm-config -n keycloak

# verify if mounted in the pod & check contents
kubectl exec -it -n keycloak keycloak-0 -- ls -l /opt/keycloak/data/import/
kubectl exec -it -n keycloak keycloak-0 -- cat /opt/keycloak/data/import/realm-config.json

# helm relevant keycloak instances
helm list --all-namespaces
helm status keycloak -n keycloak
helm upgrade keycloak bitnami/keycloak -f values.yaml --namespace keycloak

# exploring the keycloak pod / container debugging
kubectl exec -it -n keycloak keycloak-0 -- bash
```