# R2 Worker

## Local Development

Create a `.dev.vars` file and add the following:

```
AUTH_KEY_SECRET=hoge
```

Then start the development server:

```bash
yarn dev
```

---

## Deployment

Create a `.envrc` file based on `.envrc.sample`.

```bash
# dev
yarn run deploy -e dev

# prod
yarn run deploy -e prod
```
