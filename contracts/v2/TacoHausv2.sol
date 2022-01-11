// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TacoHausNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => address) public _permittedForResale;
    mapping(uint256 => uint256) public _tokenResalePrices;

    /**
     * Events
     */
    // This will tell the server to create the JSON manifest
    event MintFreeTaco(address ownerAddress, uint256 tokenId);
    // This will tell the server to create the JSON manifest
    event MintPaidTaco(address ownerAddress, uint256 tokenId);
    event TacoCannotBeSold(uint256 tokenId);
    event TacoResold(
        address previousOwnerAddress,
        address newOwnerAddress,
        uint256 tokenId,
        uint256 salePrice
    );
    event TacoSetToSell(uint256 tokenId, uint256 amount);
    event TacoUriUpdated(uint256 tokenId, string tokenUri);

    /**
     *
     */
    constructor() ERC721("TacoHaus", "TacoHaus") {}

    /**
     * Used to mint a taco when ETH is received to the contract.
     * Paid tacos can be resold!
     */
    receive() external payable {
        require(
            msg.value >= 0.004 ether,
            "You must send 0.004 ETH to get your Taco."
        );

        this.issueToken(msg.sender, false);
    }

    function freeMintTaco(address recipient) public onlyOwner {
        this.issueToken(recipient, false);
    }

    function paidMintTaco(address recipient) public onlyOwner {
        this.issueToken(recipient, true);
    }

    /**
     *
     */
    function issueToken(address recipient, bool allowResale)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        string memory tokenUri = string(
            abi.encodePacked(
                "https://my.taco.haus/assets/metadata/TACO",
                newItemId,
                ".json"
            )
        );
        _setTokenURI(newItemId, tokenUri);

        if (allowResale) {
            _permittedForResale[newItemId] = msg.sender;
        }

        emit MintPaidTaco(recipient, newItemId);

        return newItemId;
    }

    /**
     * Update's the Taco's URI following a purchase
     */
    function updateTacoUri(uint256 _tokenId, string memory tokenURI)
        public
        onlyOwner
    {
        _setTokenURI(_tokenId, tokenURI);

        emit TacoUriUpdated(_tokenId, tokenURI);
    }

    /**
     * Sets a token as available for resale.
     */
    function setForSale(uint256 _tokenId, uint256 salePrice) external {
        require(_exists(_tokenId));

        address owner = ownerOf(_tokenId);

        if (_permittedForResale[_tokenId] == owner) {
            revert("This token is not available for resale.");
        }

        if (owner != msg.sender && msg.sender != this.owner()) {
            revert("You do not have permission to perform this task.");
        }

        _tokenResalePrices[_tokenId] = salePrice;

        emit TacoSetToSell(_tokenId, salePrice);
    }

    /**
     * Remove from resale.
     */
    function removeFromResale(uint256 _tokenId) external {
        address owner = ownerOf(_tokenId);

        require(_exists(_tokenId));
        require(owner == msg.sender);

        delete (_permittedForResale[_tokenId]);
        delete (_tokenResalePrices[_tokenId]);

        emit TacoCannotBeSold(_tokenId);
    }

    /**
     * Allows a user to resell their token, minus a fee to Taco Haus.
     * Presently that fee is fixed at 4000000000000000 wei, or 0.004 ETH per transfer.
     */
    function tacoResale(uint256 _tokenId) public payable {
        require(_exists(_tokenId));

        require(getApproved(_tokenId) == address(this));

        require(
            _tokenResalePrices[_tokenId] <= 0,
            "Could not determine token's price. Please contact the seller."
        );

        require(
            msg.value == _tokenResalePrices[_tokenId],
            "You did not send the correct amount of ETH to complete this transaction."
        );

        uint256 totalMinusOurCut = _tokenResalePrices[_tokenId] -
            4000000000000000;

        // Pay the seller after taking our cut
        address ownerOfToken = ownerOf(_tokenId);
        payable(ownerOfToken).transfer(totalMinusOurCut);

        delete (_permittedForResale[_tokenId]);
        delete (_tokenResalePrices[_tokenId]);

        // Transfer the token and remove from tokensForSale
        transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);

        emit TacoResold(ownerOfToken, msg.sender, _tokenId, msg.value);
    }

    /**
     * Get the balance of ETH for this contract.
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
