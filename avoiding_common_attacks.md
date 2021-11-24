# Avoiding Common Attacks

My code takes the following precautions to avoid pitfalls/attacks: 
1. Properly uses of require, assert, and revert
2. Does not call external contracts

The first (1) guards against issues described in SWC-110 and SWC-123. I do not use assert or revert, as this application does not necessarily need them. This protects against misuse of assert and revert. Require is only used to validate user input.

The second (2) prevents reentrancy attacks (SWC-107).