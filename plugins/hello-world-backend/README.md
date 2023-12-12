# hello-world - dynamic plugin

Welcome to the hello-world dynamic backend plugin!

_This plugin was created through the Backstage CLI_

## Install the dynamic plugin

To install this dynamic plugin and have it loaded without explicitly adding router entries for it, please follow
these steps:

- Run the following command from this plugin's directory:
  ```
  yarn export-dynamic --dev
  ```
- The above command creates `dist-dynamic` directory (in the plugin directory) containing the exported dynamic plugin
  package.
- The `--dev` option in the above command creates a symbolic link, in the `<REPO_ROOT_DIR>/dynamic-plugins-root`
  directory, to the `dist-dynamic` directory created by the command.
- For more detailed information on dynamic plugin support as well as what has been added to this plugin to enable
  dynamic plugin support, please look at
  [dynamic-plugins support](https://github.com/janus-idp/backstage-showcase/blob/main/showcase-docs/dynamic-plugins.md)

#### Changes done to the plugin to make it dynamic

Even though the documentation mentioned above gives all the information regarding converting a plugin to dynamic one,
the changes are also mentioned here to keep all the information in one place:

- `package.json`:
  - added script `export-dynamic`
  - added `@backstage/backend-plugin-manager` dependency
  - added `@janus-idp/cli` devDependency
  - added `dist-dynamic` entries to files
- `src/dynamic/index.ts`:
  - New file that contains only the `router` field for the plugin. This field creates the router using `createRouter`
    from `src/service/router.ts`.

## Run the app

Once the dynamic plugin has been installed, you can run the Backstage app normally as given in the
[Getting Started](https://github.com/janus-idp/backstage-showcase/blob/main/showcase-docs/getting-started.md) steps.

## Verify the plugin is loaded

When the app is started, look at the logs. There should be an entry like the following:

```
backend:start: <DATE_TIME> backstage info loaded dynamic backend plugin '@internal/plugin-hello-world-backend-dynamic' from 'file:///<REPO_ROOT_DIR>/dynamic-plugins-root/hello-world-backend'
```

## Access the plugin endpoints

Once the app is running, the plugin endpoints can be accessed by running the following commands:

```bash
# Access "greetings" endpoint
curl localhost:7007/api/hello-world/greetings

# Access "health" endpoint
curl localhost:7007/api/hello-world/health
```
