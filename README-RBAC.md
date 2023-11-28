# [Janus Showcase](https://showcase.janus-idp.io) - RBAC with a policy file

[0]: https://quay.io/repository/janus-idp/backstage-showcase

## RBAC policy file

[Rbac policy file](./rbac-policy.csv) contains the RBAC policy as well as the group for which the policy is applied. The policy is given below as well (with slight modification for the userId):

```
p, role:default/red_hat_appeng, catalog-entity, read, allow
p, role:default/red_hat_appeng, catalog.entity.create, read, allow
p, role:default/red_hat_appeng, catalog.entity.create, create, allow
p, role:default/red_hat_appeng, sysInfo, read, allow
g, user:default/sgahlot, role:default/red_hat_appeng
```

The policies are defined in the [Casbin rules format](https://casbin.org/docs/how-it-works). In the above example, we've defined four policies for `role:default/red_hat_appeng` and then added `user:default/sgahlot` to this role (essentially creating a group).

## RBAC policy in action

We will be showing the use of RBAC policy for our custom backend plugin and for that we have added the following policy:

```
p, role:default/red_hat_appeng, sysInfo, read, allow
```

The plugin we are making use of is `sys-info-backend`. This plugin has the following two endpoints:

- `/system-info`
- `/health`

We have secured both of these endpoints with the RBAC policy shown above that `allow`s `read` (GET) action on this plugin.

### Run the app

After checking out the code, run the following commands:

```
cp app-config.local.yaml.template app-config.local.yaml
cp rbac-policy.csv.template rbac-policy.csv
```

Now, please modify the following files to use your own GitHub id:

- **rbac-policy.csv**:
  - `g, user:default/<CHANGE_TO_YOUR_GITHUB_ID>, role:default/red_hat_appeng`
- **app-config.local.yaml** - under `permission.rbac.admin.users`:
  - `- name: user:default/<CHANGE_TO_YOUR_GITHUB_ID>`

Set the following environment variables (for your GitHub OAuth app):

- `AUTH_GITHUB_CLIENT_ID`
- `AUTH_GITHUB_CLIENT_SECRET`

Once the above changes are done, please run the following commands (_please make sure the yarn version is `1.22.19`_):

```
yarn install
yarn start-dev
```

## Getting Started

Dependencies:

- [Node.js](https://nodejs.org/en/) 18
- [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

Information on running the showcase app can be found in our [Getting Started](https://github.com/janus-idp/backstage-showcase/blob/main/showcase-docs/getting-started.md) documentation. In the documentation is how to set up and run an instance of the showcase app locally. We plan to expand upon the documentation at a later point if there is enough interest in other methods for getting the app up and running.

We are excited to see people wanting to contribute to our project and welcome anyone who wishes to participate. You are more than welcome to browse through our open issues and tackle anything you feel confident in working on.

We also welcome non code contributions in the form of bug reporting and documentation writing. If you run across any bugs in the showcase app, please raise an issue here in [GitHub](https://github.com/janus-idp/backstage-showcase/issues/new?assignees=&labels=kind%2Fbug%2Cstatus%2Ftriage&template=bug.md).

## Community, Discussion, and Support

The Janus Community meeting is held biweekly on Thursday at 1:30 UTC via [Google Meet](https://meet.google.com/taq-tpfs-rre). An [agenda](https://docs.google.com/document/d/1RYkKxBRj6uMT5PTIugAuxAIYK9WxTkKgqdcdw1752Dc/edit?usp=sharing) can be found for the meeting and we encourage you to add any topics that you wish to discuss.

[Bugs](https://github.com/janus-idp/backstage-showcase/issues/new?assignees=&labels=kind%2Fbug%2Cstatus%2Ftriage&template=bug.md) should be filled out here on GitHub.

Join the [community slack channel](https://join.slack.com/t/janus-idp/shared_invite/zt-1pxtehxom-fCFtF9rRe3vFqUiFFeAkmg) for a quick way to reach us or members of the community for discussion and collaboration.

Want to see a plugin in the showcase? Create an [issue](https://github.com/janus-idp/backstage-showcase/issues/new?assignees=&labels=kind%2Ffeature%2Cstatus%2Ftriage&template=feature.md) and we will discuss if it is right for the project.

Have an idea for a plugin? Submit a [proposal](https://github.com/janus-idp/backstage-plugins/issues/new?assignees=&labels=plugin&template=plugin.yaml&title=%F0%9F%94%8C+Plugin%3A+) to the Janus IDP Backstage Plugins repo.

## Resources

Our [blog](https://janus-idp.io/blog) is a great way to see what we are up to.

You can find the Backstage Showcase app running at <https://showcase.janus-idp.io>.

For more information on our plugin offerings, consult the [Janus IDP Backstage Plugins](https://github.com/janus-idp/backstage-plugins) repo.

Want to know more about Backstage, consult the [documentation](https://backstage.io/docs/overview/what-is-backstage) and [GitHub](https://github.com/backstage/backstage) repo.
