const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('FinalFantasy7NFTGame');
    const gameContract = await gameContractFactory.deploy(
        ["Cloud", "Aerith", "Tifa"],        // Names
        ["https://i.imgur.com/5PjrcRB.png", // Images
        "https://i.imgur.com/jaTCkTA.png", 
        "https://i.imgur.com/9fCjb3v.png"],
        [300, 600, 400],                    // HP values
        [100, 50, 75],                      // Attack damage values
        "Sephiroth",
        "https://i.imgur.com/dx6VYjB.png",
        10000,
        50
      );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // tokenURI inherited from ERC721. 1 is the tokenId of the NFT to retrieve. 
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();