// SPDX-License-Identifier: NO LICENSE
pragma solidity >=0.8.0;

import "./utils/ownable.sol";
import "./interfaces/erc20.sol";

//  = "Terminated The Token";, "T801", "1000000"
contract TestToken is ERC20, Ownable {
    // @dev the mapping manages account balances
    mapping(address => uint256) private balances;

    //@dev the mapping manages approvals between 2 accounts, could be further optimised
    mapping(address => mapping(address => uint256)) private approvals;

    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    // @notice constructor initializes name, symbol and totalsupply during deployment
    constructor(
        string memory _initName,
        string memory _initSymbol,
        uint256 _initSupply
    ) {
        balances[_owner] = _initSupply;
        _name = _initName;
        _symbol = _initSymbol;
        _totalSupply = _initSupply;
    }

    // @notice name of the contract
    function name() external view override returns (string memory) {
        return _name;
    }

    // @notice symbol of the contract
    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    // @notice totalsupply of the contract
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    // @notice modifier to check if user balance is sufficient for the transaction
    modifier sufficientBalance(uint256 _value) {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        _;
    }

    // @notice function returns the account balance of the `_owner`
    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    // @notice function handles transferring `_value` tokens from `_to` address
    function transfer(address _to, uint256 _value)
        public
        override
        sufficientBalance(_value)
        returns (bool success)
    {
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // @notice function checks the remaining allowance given by `_owner` to `_spender`
    // @notice the user cant view allowances between other users
    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        require(
            msg.sender == _owner || msg.sender == _spender,
            "You cant see the allowance"
        );
        return approvals[_owner][_spender];
    }

    // @notice function approves `_spender` to spend `_value` amount on behalf of the owner(Acc. which called the approve function)
    // @notice do not send tokens to yourself, this is a know bug and will lead to loss of tokens
    // @dev test case where msg.sender == _spender leading to loss of tokens, is not handled. Redeploy later.
    function approve(address _spender, uint256 _value)
        public
        sufficientBalance(_value)
        returns (bool success)
    {
        balances[msg.sender] -= _value;
        approvals[msg.sender][_spender] += _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // @notice function transfers the approved `_value` from `_from` account to `_to` account
    // @notice if the owner(Acc. which called the approve function) is the `_from` account, then a regular transfer() is initiated
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        if (_from == msg.sender) {
            transfer(_to, _value);
        }
        require(approvals[_from][msg.sender] >= _value, "Insufficient balance");
        approvals[_from][msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
