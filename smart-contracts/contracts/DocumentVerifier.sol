// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocumentVerifier {
    struct Document {
        string hash;
        uint256 timestamp;
        address uploader;
    }

    mapping(string => Document) private documents;

    event DocumentAdded(string hash, address uploader);

    function addDocument(string memory _hash) public {
        require(documents[_hash].timestamp == 0, "Already exists");
        documents[_hash] = Document(_hash, block.timestamp, msg.sender);
        emit DocumentAdded(_hash, msg.sender);
    }

    function verifyDocument(string memory _hash) public view returns (bool, uint256, address) {
        Document memory doc = documents[_hash];
        if (doc.timestamp == 0) return (false, 0, address(0));
        return (true, doc.timestamp, doc.uploader);
    }
}
