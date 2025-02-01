# Flock Auth Database

This directory contains the files necessary to deploy the Flock Auth databases.

More specifically, we will deploy these databases using Skaffold and Helm:

1. https://www.postgresql.org/
2. https://www.dragonflydb.io/

This will be done by following these examples:

1. https://github.com/wcygan/ping/blob/main/postgres/skaffold.yaml
2. https://github.com/wcygan/dragonfly-k8s/blob/main/skaffold.yaml

The databases will have the following names:

1. flock-auth-postgres
2. flock-auth-dragonfly

```mermaid
flowchart LR
    A[Client] -->|API Request| B[Flock Auth Service]
    B -->|SQL Queries| C@{ shape: cyl, label: "Database" }
    B -->|Cache Get/Set| D{{Dragonfly Cache}}

    %% Updated styling for improved readability
    style B fill:#AED6F1,stroke:#2E86C1,stroke-width:1px
    style C fill:#FADBD8,stroke:#C0392B,stroke-width:1px
    style D fill:#D4EFDF,stroke:#27AE60,stroke-width:1px
```