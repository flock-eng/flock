# Secrets through 1password

We are using 1password for k8s secret management.

## Operator deployment

See https://developer.1password.com/docs/k8s/k8s-operator/?deployment-type=helm

We are essentially deploying this with the following command:

```bash
helm install connect 1password/connect --set-file connect.credentials=1password-credentials.json --set operator.create=true --set operator.token.value=OP_CONNECT_TOKEN
```

## Creating Secrets from 1password items

See https://developer.1password.com/docs/k8s/k8s-operator/?deployment-type=helm#kubernetes-secret-from-item

Let's say I have a 1password item named `tailet` in the vault `flock`, then I can create a k8s secret for it like so:

```yaml
apiVersion: onepassword.com/v1
kind: OnePasswordItem
metadata:
  name: tailnet-domain
spec:
  itemPath: "vaults/flock/items/tailnet"
```

This secret can be applied:

```bash
kubectl apply -f secrets/domain-name.yaml
kubectl delete -f secrets/domain-name.yaml
```

Or, we can apply it with skaffold:

```bash
skaffold run -p infrastructure -m secrets
skaffold delete -p infrastructure -m secrets
```

Finally, I can fetch the value with this command:

```bash
kubectl get secret tailnet-domain -o jsonpath="{.data.URL}" | base64 --decode
```

## Other Secrets

```bash
kubectl get secret keycloak-credentials -o jsonpath="{.data.issuer}" | base64 --decode
kubectl get secret keycloak-credentials -o jsonpath="{.data.client_id}" | base64 --decode
kubectl get secret keycloak-credentials -o jsonpath="{.data.client_secret}" | base64 --decode
kubectl get secret nextauth-config -o jsonpath="{.data.url}" | base64 --decode
kubectl get secret nextauth-config -o jsonpath="{.data.secret}" | base64 --decode
```