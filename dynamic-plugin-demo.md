This branch is created to give an example of converting the legacy `dynamic-backend` plugin to the dynamic plugin.

### Converting the Backstage plugin configurations from Legacy to Dynamic Plugin.

We have Updated the configurations of the `dynamic-backend` plugin based on the available [documentation](https://github.com/janus-idp/backstage-showcase/blob/main/showcase-docs/dynamic-plugins.md). Current code already reflects these changes.

### Deploying as dynamic plugin.

```shell
## Go to the plugin's root directory. in our case that is root > plugins > dynamic-backend folder.
> cd plugins/dynamic-backend
> pwd
backstage-showcase-tmpv1/plugins/dynamic-backend
# delete the folder if it already exists, dist-dynamic
> rm -rf dist-dynamic
# Regenerate the dynamic plugin. This is will be available in d
> yarn export-dynamic
```
**Example (Expand for full log)** :
<details>
<summary> ➜  dynamic-backend git:(feature/dynamic-trial) ✗ yarn export-dynamic </summary>
<pre>
yarn run v1.22.19
$ janus-cli package export-dynamic-plugin
Moving '@backstage/backend-common' to peerDependencies
Moving '@backstage/backend-plugin-manager' to peerDependencies
Moving '@backstage/config' to peerDependencies
  executing     yarn install --production ✔
✨  Done in 8.19s.
</pre>
</details>

```shell
## Now go to the dist-dynamic folder and package and deploy in to the root > dynamic-plugins-root directory.
> cd dist-dynamic
> pwd
backstage-showcase-tmpv1/plugins/dynamic-backend/dist-dynamic
> ls
README.md    dist         node_modules package.json yarn.lock
#Package the plugin.
> npm pack
```
**Example (Expand for full log)** :
<details>
<summary> ➜  dist-dynamic git:(feature/dynamic-trial) ✗ npm pack </summary>
<pre>
npm notice
npm notice 📦  @internal/plugin-dynamic-backend-dynamic@0.1.0
npm notice === Tarball Contents ===
npm notice 646B  README.md
npm notice 1.1kB dist/index.cjs.js
npm notice 2.8kB dist/index.cjs.js.map
npm notice 1.4kB package.json
npm notice === Bundled Dependencies ===
npm notice logform
npm notice winston-transport
npm notice qs
npm notice call-bind
npm notice side-channel
npm notice debug
npm notice define-data-property
npm notice express-promise-router
npm notice function-bind
npm notice get-intrinsic
npm notice gopd
npm notice has-property-descriptors
npm notice has-proto
npm notice has-symbols
npm notice hasown
npm notice object-inspect
npm notice set-function-length
npm notice fn.name
npm notice tr46
npm notice color-name
npm notice cookie-signature
npm notice mime
npm notice stack-trace
npm notice utils-merge
npm notice @colors/colors
npm notice @dabh/diagnostics
npm notice @types/body-parser
npm notice @types/connect
npm notice @types/express-serve-static-core
npm notice @types/express
npm notice @types/http-errors
npm notice @types/mime
npm notice @types/node
npm notice @types/qs
npm notice @types/range-parser
npm notice @types/send
npm notice @types/serve-static
npm notice @types/triple-beam
npm notice accepts
npm notice array-flatten
npm notice async
npm notice body-parser
npm notice bytes
npm notice color-convert
npm notice color-string
npm notice color
npm notice content-disposition
npm notice content-type
npm notice cookie
npm notice depd
npm notice destroy
npm notice ee-first
npm notice enabled
npm notice encodeurl
npm notice escape-html
npm notice etag
npm notice express
npm notice fecha
npm notice finalhandler
npm notice forwarded
npm notice fresh
npm notice http-errors
npm notice iconv-lite
npm notice inherits
npm notice ipaddr.js
npm notice is-arrayish
npm notice is-promise
npm notice is-stream
npm notice kuler
npm notice lodash.flattendeep
npm notice media-typer
npm notice merge-descriptors
npm notice methods
npm notice mime-db
npm notice mime-types
npm notice negotiator
npm notice on-finished
npm notice one-time
npm notice parseurl
npm notice path-to-regexp
npm notice proxy-addr
npm notice range-parser
npm notice raw-body
npm notice readable-stream
npm notice safe-buffer
npm notice safe-stable-stringify
npm notice safer-buffer
npm notice send
npm notice serve-static
npm notice setprototypeof
npm notice simple-swizzle
npm notice statuses
npm notice string_decoder
npm notice text-hex
npm notice toidentifier
npm notice triple-beam
npm notice type-is
npm notice unpipe
npm notice util-deprecate
npm notice vary
npm notice winston
npm notice yn
npm notice node-fetch
npm notice colorspace
npm notice ms
npm notice webidl-conversions
npm notice whatwg-url
npm notice undici-types
npm notice === Tarball Details ===
npm notice name:          @internal/plugin-dynamic-backend-dynamic
npm notice version:       0.1.0
npm notice filename:      internal-plugin-dynamic-backend-dynamic-0.1.0.tgz
npm notice package size:  1.8 MB
npm notice unpacked size: 8.6 MB
npm notice shasum:        318d1d87a8e2273bb7027be1b51dc47e9ddf29a1
npm notice integrity:     sha512-/bhUuE1lnKuAv[...]031okEvm1BzzA==
npm notice bundled deps:  108
npm notice bundled files: 0
npm notice own files:     1173
npm notice total files:   1173
npm notice
internal-plugin-dynamic-backend-dynamic-0.1.0.tgz
</pre>
</details>

```shell
> pwd
backstage-showcase-tmpv1/plugins/dynamic-backend/dist-dynamic
> ls
README.md    dist         node_modules package.json yarn.lock
# Now unarchive file and remove unarchive.
> archive=internal-plugin-dynamic-backend-dynamic-0.1.0.tgz && tar -xf "$archive" && rm "$archive"
> ls
README.md    dist         node_modules package      package.json yarn.lock
# Now the dynamic plugin is in the package directory. Move the plugin to dynamic-plugins-root directory.
>  mkdir -p ./../../../dynamic-plugins-root/dynamic-plugin-v1 && mv package/* ./../../../dynamic-plugins-root/dynamic-plugin-v1/

# You have successfully deployed the dynamic plugin now. go to root directory and start the backstage server.
# Load the .env.dev with all the environment variable secrets and start the server.
> cd ../../.. && export $(cat .env.dev | xargs) && yarn start-dev
```

You can see below log on the server start up. Below log confirms backend plugin is loaded dynamically.
```
backend:start: 2023-11-06T16:51:34.327Z backstage info loaded dynamic backend plugin '@internal/plugin-dynamic-backend-dynamic' from 'file:///Users/lrangine/Documents/Src/backstage-showcase-tmpv1/dynamic-plugins-root/dynamic-plugin-v1'
```


