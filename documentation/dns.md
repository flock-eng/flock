# DNS

This needs to happen after both `flock-web` and `keycloak` are deployed.

We want `flock-web` to be able to resolve the IP address of our Magic DNS name for KeyCloak (prefixed like `auth.domain.net`). This DNS modification allows that to happen.

[Expose a tailnet HTTPS service to your cluster workloads](https://tailscale.com/kb/1438/kubernetes-operator-cluster-egress#expose-a-tailnet-https-service-to-your-cluster-workloads)

Firstly, populate this record:

```yaml
apiVersion: tailscale.com/v1alpha1
kind: DNSConfig
metadata:
  name: tailscale-dns-test
spec:
  nameserver:
    image:
      repo: tailscale/k8s-nameserver
      tag: unstable
```

```bash
k apply -f dns/dns.yaml
kubectl get dnsconfig tailscale-dns-test -o json | jq '.status.nameserver.ip' -r | pbcopy
```

```bash
# Edit your CoreDNS configmap
kubectl -n kube-system edit configmap coredns

# Restart the CoreDNS pods to apply the changes
kubectl rollout restart deployment coredns -n kube-system
```

Lastly, make sure you have an egress for KeyCloak:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    tailscale.com/tailnet-fqdn: "auth.<custom-domain>.ts.net"
  name: kc-egress
spec:
  externalName: unused
  type: ExternalName
```

And apply it with `k apply -f dns/kc.yaml`.