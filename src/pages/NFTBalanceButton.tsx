import { IonButton } from '@ionic/react';
import meLogo from '../images/me.png';
import { ethers } from 'ethers';
import React, {useState} from 'react';


const NFTBalanceButton: React.FC = () => {
    const [buttonText, setButtonText] = useState("Buy 1 NFT to gain access")
    const nftContractAddress = "0xb2ea51BAa12C461327d12A2069d47b30e680b69D";
    const walletAddress = "0x248Dd3836E2A8B56279C04addC2D11F3c2497836";
    const ABI = [
        "function balanceOf(address owner) view returns (uint256)"
    ];
    const getNFTBalance = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
            const contract = new ethers.Contract(nftContractAddress, ABI, provider);
            //const balance = 0; // to test the code
            const balance = await contract.balanceOf(walletAddress);
            setButtonText(balance>0? '---': 'Buy 1 NFT to gain Access');
        } catch (error) {
            console.error("Error fetching NFT balance:", error);
            setButtonText("Error fetching balance");
        }
    };
    return (
        <IonButton className="buy-nft-btn mt-4 h-11" color='medium' onClick={getNFTBalance}>
            <img src={meLogo} className="me-logo mr-2"/>
             {buttonText}
        </IonButton>
    );
};
export default NFTBalanceButton;