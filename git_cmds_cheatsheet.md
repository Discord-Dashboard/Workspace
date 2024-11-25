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