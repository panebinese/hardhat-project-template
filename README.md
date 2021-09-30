# Hardhat project template

Based on [Advanced Sample Hardhat Project](./docs/README-of-advanced-sample-hardhat-project.md)

## Setup

### Environment

Install [anyenv](https://github.com/anyenv/anyenv), then install nodenv and pyenv through anyenv.
[znz/anyenv-update](https://github.com/znz/anyenv-update),
[nodenv/nodenv-update](https://github.com/nodenv/nodenv-update) and
[pyenv/pyenv-update](https://github.com/pyenv/pyenv-update) are usefule to handle these tools.

Then install the latest stable version of nodejs and python that the *env tools support to install.

### NPM

In the top of this repository, run following commands:

```
npm install -g yarn
yarn install
```

### Slither

[Slither](https://github.com/crytic/slither) is a static analyzer for solidity.
Install this by following [its instruction](https://github.com/crytic/slither#how-to-install).

Slither requires solc compiler, not solcjs of this repository, and does not accept shell script trampoline or symbolic link.
Install it by following [the instruction](https://docs.soliditylang.org/en/v0.8.9/installing-solidity.html).
