# Once

```shell
git config --global push.autoSetupRemote 1
```

# Checkout

```shell
git checkout -b feature/$(date +%Y%m%d)-$(uuidgen | tr -d '-' | tr '[:upper:]' '[:lower:]')
```

# Commit + push

```shell
oco
```

# Version release

```shell
ns release version
```

then, publish a release on gh: `v*` for latest or `v*beta*` for beta release.