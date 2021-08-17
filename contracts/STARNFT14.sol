//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract STARNFT14 is ERC721,Ownable {

    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;

    //Item visual is stored in IPFS eg: 2D sprite or 3D object file.
    //Game spesific string that is being used for item visual creation can also be stored.
    mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => string) private _imageURIs;

    //So ItemStats are converted into a string in the game
    //The logic of this conversion is in the game side. In game ItemStats are converted into a string.
    //The string that is retrieved from this contract then can be used to re-create the item in game.
    mapping (uint256 => string) private _itemStats;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName,symbol) {}
    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[_tokenId] = _tokenURI;
    }
    function _setImageURI(uint256 _tokenId, string memory _imageURI) internal virtual {
        _imageURIs[_tokenId] = _imageURI;
    }


    function tokenURI(uint tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function imageURI(uint tokenId) public view virtual returns (string memory){
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory _imageURI = _imageURIs[tokenId];
        return _imageURI;
    }

    function tokenItemStat(uint tokenId) public view virtual returns (string memory){
        require(_exists(tokenId), "ERC721Metadata: Item stat query for nonexistent token");
        string memory _itemStat = _itemStats[tokenId];
        return _itemStat;
    }
	function getCurrentTokenId() public view virtual returns (uint256) {
		return _tokenIds.current();
	}
    function mintToken(address _recipient, string memory _uri, string memory _uriimage) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_recipient,newItemId);
        _setTokenURI(newItemId, _uri);
		_setImageURI(newItemId, _uriimage);

        return newItemId;
    }
}