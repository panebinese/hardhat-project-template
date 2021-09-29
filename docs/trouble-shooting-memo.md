# slither

[Slither](https://github.com/crytic/slither) is a static analyzer for solidity.
Install this by following [its instruction](https://github.com/crytic/slither#how-to-install).
Slither provides [vscode plugin](https://marketplace.visualstudio.com/items?itemName=trailofbits.slither-vscode).
Use this plugin.

## problem: slither require solc, not solcjs.

It does not accept shell script trampoline or symbolic link.

- [FileNotFoundError: [Errno 2] No such file or directory: 'solc' #57](https://github.com/crytic/slither/issues/57)

## problem: slither(solc) can not find 'hardhat/console.sol'.

```
% slither contracts/Greeter.sol
Compilation warnings/errors on contracts/Greeter.sol:
Error: Source "hardhat/console.sol" not found: File not found.
 --> contracts/Greeter.sol:4:1:
  |
4 | import "hardhat/console.sol";
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

```

slither works well if the code does not uses 'hardhat/console.sol'.
