// SPDX-License-Identifier: NO LICENSE
pragma solidity >=0.8.0;

import "./utils/ownable.sol";
import "./interfaces/erc20.sol";

//  = "Terminated The Token";, "T801", "1000000"
contract TestToken is ERC20, Ownable {
    // @dev the mapping manages account balances
    mapping(address => uint256) public balances;

    //@dev the mapping manages approvals between 2 accounts, could be further optimised
    mapping(address => mapping(address => uint256)) public approvals;

    string public _name;
    string public _symbol;
    uint256 public _totalSupply;

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

    modifier notSelf(address _to) {
        require(msg.sender != _to, "You cannot send money to yourself");
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
        notSelf(_to)
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
        return approvals[_owner][_spender];
    }

    // @notice function approves `_spender` to spend `_value` amount on behalf of the owner(Acc. which called the approve function)
    function approve(address _spender, uint256 _value)
        public
        notSelf(_spender)
        sufficientBalance(_value)
        returns (bool success)
    {
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
    ) public notSelf(_to) returns (bool success) {
        require(balances[_from] >= _value, "Insufficient balance");
        require(
            approvals[_from][msg.sender] >= _value,
            "Insufficient approval"
        );

        balances[_from] -= _value;
        balances[_to] += _value;
        approvals[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
