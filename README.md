# n8n-nodes-yealink

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

# If you have n8n installed: Install custom nodes module

Install it to the n8n root folder. This is the node_modules folder on the same level of n8n and n8n-core. This differs when you used the -g flag on n8n initial installation. From there do:
```
npm install @digital-boss/n8n-nodes-yealink
```

# IFresh install n8n

Navigate to desired folder, create a package json and install n8n like so:
```
cd /var/www/vhosts/

mkdir my-n8n && cd my-n8n

npm init --yes

npm install n8n

npm install @digital-boss/n8n-nodes-yealink
```

# Start n8n

Directly:
```
n8n
```
Plesk or C-Panel:
```
node /var/www/vhosts/n8n/bin/n8n
```

# Contribution

To make this node even better, please let us know, [how you use it](mailto:info@digital-north-consulting.com). Commits are always welcome. 

# Issues

If you have any issues, please [let us know on GitHub](https://github.com/digital-boss/n8n-nodes-yealink/issues).

# About

Special thanks to [n8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

Nodes by [digital-north-consulting.com](https://digital-north-consulting.com). For productive use and consulting on this, [contact us please](mailto:info@digital-north-consulting.com).

This node was created with ❤️ by Valentina Lilova [valentina98](https://github.com/valentina98)

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
