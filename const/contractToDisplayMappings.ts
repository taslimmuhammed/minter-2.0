const contractTypeToDisplayNameMapping = {
  "nft-drop": "NFT Drop",
  "nft-collection": "NFT Collection",
  "edition-drop": "Edition Drop",
  "edition": "Edition",
  "token-drop": "Token Drop",
  "token": "Token",
  "vote": "Vote",
  "split": "Split",
  "marketplace": "Marketplace",
  "pack": "Pack",
  "custom": "Custom",
  "multiwrap": "Multiwrap",
  "signature-drop": "Signature Drop",
};

const contractTypeToImageMapping = {
  "signature-drop": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/signature-drop.webp`,
  "nft-drop": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/drop.webp`,
  "edition-drop": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/drop.webp`,
  "nft-collection": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/nft-collection.webp`,
  "edition": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/nft-collection.webp`,
  "token": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/drop.webp`,
  "token-drop": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/token.webp`,
  "split": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/splits.webp`,
  "vote": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/vote.webp`,
  "marketplace": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/marketplace.webp`,
  "pack": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/pack.webp`,
  "multiwrap": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/general.webp`,
  "custom": `https://custom-dashboard-k7edh8glg.thirdweb-preview.com/icons/custom.svg`,
};

// Here's a list of contracts that you can deploy.
const contractsToShowOnDeploy = [
  "nft-collection",
  "split",
  "token",
  "pack",
  "edition",
  "edition-drop",
  "token-drop",
  "vote",
  "marketplace",
  "nft-drop",
  // "multi-wrap",
  // "signature-drop",
];

export {
  contractTypeToDisplayNameMapping,
  contractTypeToImageMapping,
  contractsToShowOnDeploy,
};
