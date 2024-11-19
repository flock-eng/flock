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

https://github.com/keycloak/keycloak/tree/main/operator
https://www.keycloak.org/operator/advanced-configuration
https://www.keycloak.org/server/all-config

```bash
skaffold dev -m keycloak-configuration

k describe pod flock-kc-0
 
Name:             flock-kc-0
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Mon, 18 Nov 2024 07:44:02 -0600
Labels:           app=keycloak
                  app.kubernetes.io/component=server
                  app.kubernetes.io/instance=flock-kc
                  app.kubernetes.io/managed-by=keycloak-operator
                  apps.kubernetes.io/pod-index=0
                  controller-revision-hash=flock-kc-9d7945dfc
                  statefulset.kubernetes.io/pod-name=flock-kc-0
Annotations:      operator.keycloak.org/watched-secret-hash: 13b486b0ce7ebca8898296654e533a79d11d0ee01fbbbcd106dde8ce9038caeb
Status:           Running
IP:               10.244.0.84
IPs:
  IP:           10.244.0.84
Controlled By:  StatefulSet/flock-kc
Containers:
  keycloak:
    Container ID:  docker://863d4ce57456d02edfd3e8cddedd1f58a499fef3b567e40e3d0336ee8be7d4bd
    Image:         quay.io/keycloak/keycloak:26.0.5
    Image ID:      docker-pullable://quay.io/keycloak/keycloak@sha256:089b5898cb0ba151224c83aef3806538582880029eb5ea71c2afd00b627d4907
    Ports:         8443/TCP, 8080/TCP, 9000/TCP
    Host Ports:    0/TCP, 0/TCP, 0/TCP
    Args:
      -Djgroups.dns.query=flock-kc-discovery.default
      --verbose
      start
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    2
      Started:      Mon, 18 Nov 2024 07:44:17 -0600
      Finished:     Mon, 18 Nov 2024 07:44:28 -0600
    Ready:          False
    Restart Count:  1
    Limits:
      memory:  2Gi
    Requests:
      memory:   1700Mi
    Liveness:   http-get http://:9000/health/live delay=0s timeout=1s period=10s #success=1 #failure=3
    Readiness:  http-get http://:9000/health/ready delay=0s timeout=1s period=10s #success=1 #failure=3
    Startup:    http-get http://:9000/health/started delay=0s timeout=1s period=1s #success=1 #failure=600
    Environment:
      KC_DB:                           postgres
      KC_DB_USERNAME:                  <set to the key 'username' in secret 'flockuser-secret'>  Optional: false
      KC_DB_PASSWORD:                  <set to the key 'password' in secret 'flockuser-secret'>  Optional: false
      KC_DB_URL_DATABASE:              flockdb
      KC_DB_URL_HOST:                  flock-db-rw.default.svc.cluster.local
      KC_DB_URL_PORT:                  5432
      KC_PROXY_HEADERS:                xforwarded
      KC_BOOTSTRAP_ADMIN_USERNAME:     <set to the key 'username' in secret 'flock-kc-initial-admin'>  Optional: false
      KC_BOOTSTRAP_ADMIN_PASSWORD:     <set to the key 'password' in secret 'flock-kc-initial-admin'>  Optional: false
      KC_HEALTH_ENABLED:               true
      KC_CACHE:                        ispn
      KC_CACHE_STACK:                  kubernetes
      KC_TRUSTSTORE_PATHS:             /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      KC_TRACING_SERVICE_NAME:         flock-kc
      KC_TRACING_RESOURCE_ATTRIBUTES:  k8s.namespace.name=default
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-72tqw (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       False 
  ContainersReady             False 
  PodScheduled                True 
Volumes:
  kube-api-access-72tqw:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   Burstable
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Normal   Scheduled  43s                 default-scheduler  Successfully assigned default/flock-kc-0 to minikube
  Normal   Pulled     42s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 1.11s (1.11s including waiting). Image size: 440923675 bytes.
  Normal   Pulling    30s (x2 over 44s)   kubelet            Pulling image "quay.io/keycloak/keycloak:26.0.5"
  Normal   Created    29s (x2 over 42s)   kubelet            Created container keycloak
  Normal   Started    29s (x2 over 42s)   kubelet            Started container keycloak
  Normal   Pulled     29s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 563ms (563ms including waiting). Image size: 440923675 bytes.
  Warning  Unhealthy  25s (x17 over 42s)  kubelet            Startup probe failed: Get "http://10.244.0.84:9000/health/started": dial tcp 10.244.0.84:9000: connect: connection refused
wcygan@foobar flock % k logs flock-kc-0
wcygan@foobar flock % kdp Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Normal   Scheduled  43s                 default-scheduler  Successfully assigned default/flock-kc-0 to minikube
  Normal   Pulled     42s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 1.11s (1.11s including waiting). Image size: 440923675 bytes.
  Normal   Pulling    30s (x2 over 44s)   kubelet            Pulling image "quay.io/keycloak/keycloak:26.0.5"
  Normal   Created    29s (x2 over 42s)   kubelet            Created container keycloak
  Normal   Started    29s (x2 over 42s)   kubelet            Started container keycloak
  Normal   Pulled     29s                 kubelet            Successfully pulled image "quay.io/keycloak/keycloak:26.0.5" in 563ms (563ms including waiting). Image size: 440923675 bytes.
  Warning  Unhealthy  25s (x17 over 42s)  kubelet            Startup probe failed: Get "http://10.244.0.84:9000/health/started": dial tcp 10.244.0.84:9000: connect: connection refused
```

So, if it's saying `dial tcp 10.244.0.84:9000: connect: connection refused`, then this means that the `flock-kc-0` pod is not listening on port `9000`.

Possible references:

- https://github.com/linode/apl-core/blob/8cc8441c0342b59e678736ff3c0fbe0cfe1c7a80/values/keycloak-operator/keycloak-operator-cr.gotmpl#L27
- https://github.com/andymunro/keycloak-antora/blob/60fce94dabbf400d6bfa9fc4bd25b69c5c7b4341/doc/guides-operator/modules/ROOT/pages/basic-deployment.adoc#L120
- https://github.com/vladadaba/k8s-playground/blob/cfcae9ee4c1b4d9d706ffd0f89e4155f034642b2/helm/infra/keycloak.yml#L32

## Generating a TLS Secret for KeyCloak

https://www.keycloak.org/operator/basic-deployment

```bash
openssl req -subj '/CN=test.keycloak.org/O=Test Keycloak./C=US' -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

## KeyCloak Operator install issue

```bash
[keycloak-operator-84d7d466cf-rdp2l keycloak-operator] 2024-11-19 00:02:02,514 ERROR [io.fab.kub.cli.inf.imp.cac.Reflector] (vert.x-eventloop-thread-0) listSyncAndWatch failed for k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks, will stop: java.util.concurrent.CompletionException: io.fabric8.kubernetes.client.KubernetesClientException: Failure executing: GET at: https://10.96.0.1:443/apis/k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks?resourceVersion=0. Message: storage is (re)initializing. Received status: Status(apiVersion=v1, code=429, details=StatusDetails(causes=[], group=null, kind=null, name=null, retryAfterSeconds=1, uid=null, additionalProperties={}), kind=Status, message=storage is (re)initializing, metadata=ListMeta(_continue=null, remainingItemCount=null, resourceVersion=null, selfLink=null, additionalProperties={}), reason=TooManyRequests, status=Failure, additionalProperties={}).
      > [keycloak-operator-84d7d466cf-rdp2l keycloak-operator] Caused by: io.fabric8.kubernetes.client.KubernetesClientException: Failure executing: GET at: https://10.96.0.1:443/apis/k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks?resourceVersion=0. Message: storage is (re)initializing. Received status: Status(apiVersion=v1, code=429, details=StatusDetails(causes=[], group=null, kind=null, name=null, retryAfterSeconds=1, uid=null, additionalProperties={}), kind=Status, message=storage is (re)initializing, metadata=ListMeta(_continue=null, remainingItemCount=null, resourceVersion=null, selfLink=null, additionalProperties={}), reason=TooManyRequests, status=Failure, additionalProperties={}).
      > [keycloak-operator-84d7d466cf-rdp2l keycloak-operator] 2024-11-19 00:02:02,516 ERROR [io.jav.ope.pro.eve.sou.inf.InformerWrapper] (InformerWrapper [keycloaks.k8s.keycloak.org/v2alpha1] 28) Informer startup error. Operator will be stopped. Informer: k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks: java.util.concurrent.ExecutionException: io.fabric8.kubernetes.client.KubernetesClientException: Failure executing: GET at: https://10.96.0.1:443/apis/k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks?resourceVersion=0. Message: storage is (re)initializing. Received status: Status(apiVersion=v1, code=429, details=StatusDetails(causes=[], group=null, kind=null, name=null, retryAfterSeconds=1, uid=null, additionalProperties={}), kind=Status, message=storage is (re)initializing, metadata=ListMeta(_continue=null, remainingItemCount=null, resourceVersion=null, selfLink=null, additionalProperties={}), reason=TooManyRequests, status=Failure, additionalProperties={}).
          > [keycloak-operator-84d7d466cf-rdp2l keycloak-operator] Caused by: io.fabric8.kubernetes.client.KubernetesClientException: Failure executing: GET at: https://10.96.0.1:443/apis/k8s.keycloak.org/v2alpha1/namespaces/default/keycloaks?resourceVersion=0. Message: storage is (re)initializing. Received status: Status(apiVersion=v1, code=429, details=StatusDetails(causes=[], group=null, kind=null, name=null, retryAfterSeconds=1, uid=null, additionalProperties={}), kind=Status, message=storage is (re)initializing, metadata=ListMeta(_continue=null, remainingItemCount=null, resourceVersion=null, selfLink=null, additionalProperties={}), reason=TooManyRequests, status=Failure, additionalProperties={}).
      > [keycloak-operator-84d7d466cf-rdp2l keycloak-operator] Caused by: java.util.concurrent.ExecutionException: io.javaoperatorsdk.operator.OperatorException: Couldn't start source ControllerResourceEventSource
```