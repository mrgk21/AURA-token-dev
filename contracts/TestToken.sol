// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0;

import "./utils/ownable.sol";
// import "./utils/safeMath.sol";
import "./interfaces/erc20.sol";

contract TestToken is ERC20, Ownable {
    // using SafeMath for uint256;

    mapping(address => uint256) private balances;

    //@dev its approvals[owner][proxyOwner] = value;
    mapping(address => mapping(address => uint256)) private approvals;
    //  = "Terminated The Token";, "T801", "1000000"
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

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

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    modifier sufficientBalance(uint256 _value) {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        _;
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

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
