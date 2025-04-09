import React, { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Card, Container, Flex, Text } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateAllowlist } from "./CreateAllowlist";
import { Allowlist } from "./Allowlist";
import WalrusUpload from "./EncryptAndUpload";
import { CreateService } from "./CreateSubscriptionService";
import FeedsToSubscribe from "./SubscriptionView";
import { Service } from "./SubscriptionService";
import { AllAllowlist } from "./OwnedAllowlists";
import { AllServices } from "./OwnedSubscriptionServices";
import Feeds from "./AllowlistView";

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>("");
  const [capId, setCapId] = useState<string>("");

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
      }}
    >
      <Container size="3" px="4" py="4">
        {/* Header */}
        <Flex justify="between" align="center" mb="6">
          <Flex align="center" gap="4">
            <img
              src="/FakeAirdropX.png"
              alt="FakeAirdropX Logo"
              style={{ width: 120 }}
            />
            <Text size="6" weight="bold">
              SealSui Testnet By FakeAirdropX
            </Text>
          </Flex>
          <Box>
            <ConnectButton />
          </Box>
        </Flex>

        {/* Main Logo & Community Team Section */}
        <Card
          size="3"
          style={{
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          {/* Big Centered Logo */}
          <Flex justify="center" mb="4">
            <img
              src="/FakeAirdropX.png"
              alt="Main Logo"
              style={{ width: 200 }}
            />
          </Flex>

          {/* Community Team Section */}
          <Text
            size="4"
            weight="bold"
            style={{
              borderBottom: "2px solid black",
              paddingBottom: "10px",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            Community Team
          </Text>

          <Flex justify="center" gap="4" mt="4">
            <a
              href="https://t.me/FakeAirdropX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/telegram-icon.svg" alt="Telegram" width={50} />
            </a>
            <a
              href="https://x.com/FakeAirdropX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/x-icon.svg" alt="X" width={50} />
            </a>
          </Flex>
        </Card>

        {/* Routing only shown after wallet connected */}
        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              <Route path="/allowlist-example" element={<CreateAllowlist />} />
              <Route
                path="/admin/allowlist/:id"
                element={
                  <div>
                    <Allowlist
                      setRecipientAllowlist={setRecipientAllowlist}
                      setCapId={setCapId}
                    />
                    <WalrusUpload
                      policyObject={recipientAllowlist}
                      cap_id={capId}
                      moduleName="allowlist"
                    />
                  </div>
                }
              />
              <Route path="/admin/allowlists" element={<AllAllowlist />} />
              <Route
                path="/view/allowlist/:id"
                element={<Feeds suiAddress={currentAccount.address} />}
              />

              <Route path="/subscription-example" element={<CreateService />} />
              <Route
                path="/admin/service/:id"
                element={
                  <div>
                    <Service
                      setRecipientAllowlist={setRecipientAllowlist}
                      setCapId={setCapId}
                    />
                    <WalrusUpload
                      policyObject={recipientAllowlist}
                      cap_id={capId}
                      moduleName="subscription"
                    />
                  </div>
                }
              />
              <Route path="/admin/services" element={<AllServices />} />
              <Route
                path="/view/service/:id"
                element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Text align="center" mt="6">
            Please connect your Sui wallet to continue
          </Text>
        )}
      </Container>
    </div>
  );
}

export default App;
