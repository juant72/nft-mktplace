//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//Internal import for NFT OpenZeppelin
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";


contract NFTMarketplace is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    
    uint256 listingPrice = 0.0015 ether;
    address payable owner;

    mapping (uint256 => MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner {
        require(
            msg.sender == owner,"Only owner can change the listing price"
        ); 
        _;
    }
    

    constructor() ERC721("NFT Metaverse Token","MYNFT"){
        owner =payable(msg.sender);
    }    

    function updateListingPrice(uint256 _listingPrice) 
        public 
        payable 
        onlyOwner
    {
        listingPrice = _listingPrice;
    }

    function getListingPrice() 
        public 
        view
        returns(uint256)
    {
        return listingPrice;
    }

    //LET Create NFT Token Function
    function createToken(string memory _tokenURI, uint256 _price) 
        public
        payable 
        returns(uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId=_tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        createMarketItem(newTokenId, _price);

        return newTokenId;
    }


    //Creating market item
    function createMarketItem(uint256 _tokenId, uint256 _price) 
        private
    {
        require(_price>0,"Price must be greater than 0");
        require(msg.value==listingPrice,"Price must be equal than listing price");

        idMarketItem[_tokenId] = MarketItem(
            _tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            false
        );

        _transfer( msg.sender, address(this), _tokenId);

        emit idMarketItemCreated(
            _tokenId,
            msg.sender,
            address(this),
            _price,
            false
        );
    }

    // Function for resale token
    function reSellToken(uint256 _tokenId, uint256 _price) 
        public
        payable 
    {
        require(idMarketItem[_tokenId].owner == msg.sender,"Only owner can sell token");

        require(msg.value==listingPrice,"Price must be equal than listing price");

        idMarketItem[_tokenId].sold = true;
        idMarketItem[_tokenId].price = _price;
        idMarketItem[_tokenId].seller =payable(msg.sender);
        idMarketItem[_tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer( msg.sender, address(this), _tokenId);
    }

        //Function create a market sale
    function createMarketSale(uint256 _tokenId)
            public
            payable 
    {
        uint256 _price = idMarketItem[_tokenId].price;
        require(msg.value==_price,"Please set the price of the market");

        idMarketItem[_tokenId].owner = payable(msg.sender);
        idMarketItem[_tokenId].sold = true;
        idMarketItem[_tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this),msg.sender,_tokenId);

        //comissions
        payable(owner).transfer(listingPrice);

        // rest to the seller
        payable(idMarketItem[_tokenId].seller).transfer(msg.value);
    }

    // Getting unsold NFT data
    function fetchMarketItem() 
    public
    view
    returns(MarketItem[] memory)
    {
        uint256 itemCount= _tokenIds.current();
        uint256 unSoldItemCount= _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex= 0;

        MarketItem[] memory items= new MarketItem[](unSoldItemCount);
        for (uint256 i=0;i<itemCount;i++){
            if (idMarketItem[i+1].owner == address(this))
            {
                uint256 currentId=i+1;
                
                MarketItem storage currentItem=idMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }

    //Purchase Item
    function fetchMyNFT()
        public 
        view
        returns(MarketItem[] memory)
    {
        uint256 totalCount= _tokenIds.current();
        uint256 itemCount=0;
        uint256 currentIndex=0;

        for(uint256 i=0;i<totalCount;i++){
            if (idMarketItem[i+1].owner == msg.sender){
                itemCount+=1;
            }
        }

        MarketItem[] memory items= new MarketItem[](itemCount);
        for (uint256 i=0; i < totalCount; i++){
            if (idMarketItem[i+1].owner == msg.sender){
                uint256 currentId=i+1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;
            }
        }
        return items; 
    }

    //Single user item
    function fetchItemsListed()
        public 
        view
        returns(MarketItem[] memory)
    {
        uint256 totalCount= _tokenIds.current();
        uint256 itemCount=0;
        uint256 currentIndex=0;

        for (uint256 i=0; i < totalCount; i++){
            if (idMarketItem[i+1].seller == msg.sender){
                itemCount+=1;
            }
        }

        MarketItem[] memory items=new MarketItem[](itemCount);
        for (uint256 i=0; i < totalCount; i++){
            if (idMarketItem[i+1].seller == msg.sender){
                uint256 currentId=i+1;

                MarketItem storage currentItem=idMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;                
            }
        }
        return items;     
    }

}

