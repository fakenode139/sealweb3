import React from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { Routes, Route, Link } from "react-router-dom";
import { CreateAllowlist } from "./CreateAllowlist";
import { Allowlist } from "./Allowlist";
import WalrusUpload from "./EncryptAndUpload";
import { AllAllowlist } from "./OwnedAllowlists";
import Feeds from "./AllowlistView";
import { CreateService } from "./CreateSubscriptionService";
import { Service } from "./SubscriptionService";
import { AllServices } from "./OwnedSubscriptionServices";
import FeedsToSubscribe from "./SubscriptionView";
import { useState } from "react";

function HomePage() {
  const currentAccount = useCurrentAccount();

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
            marginBottom: "2rem",
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

        {/* Feature Section: Allowlist and Subscription */}
        {currentAccount && (
          <Grid columns="2" gap="4">
            <Card>
              <Flex direction="column" gap="2" align="center" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>
                  <h2>TRY Allowlist</h2>
                </div>
                <div style={{ textAlign: "left" }}>
                  <h3>Tutorial</h3>
                  <p>1. Click 'Try it'</p>
                  <p>2. Create Your Name Allow List</p>
                  <p>3. Add New Sui Wallet</p>
                  <p>4. Select Walrus service</p>
                  <p>5. Upload file</p>
                  <p>6. Click 'First step: Encrypt and upload to Walrus'</p>
                  <p>7. Click 'Second step: Associate file to Sui object'</p>
                  <p>8. Done</p>
                </div>
                <Link to="/allowlist-example">
                  <button className="rt-Button">Try it</button>
                </Link>
              </Flex>
            </Card>
            <Card>
              <Flex direction="column" gap="2" align="center" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>
                  <h2>TRY Subscription</h2>
                </div>
                <div style={{ textAlign: "left" }}>
                  <h3>Tutorial</h3>
                  <p>1. Click 'Try it'</p>
                  <p>2. Enter Price in Mist</p>
                  <p>3. Subscription duration in minutes</p>
                  <p>4. Name of the Service</p>
                  <p>5. Click Create Service</p>
                  <p>6. Click 'this link'</p>
                  <p>7. Click and Download Decrypt</p>
                  <p>8. Done</p>
                </div>
                <Link to="/subscription-example">
                  <button className="rt-Button">Try it</button>
                </Link>
              </Flex>
            </Card>
          </Grid>
        )}

        {!currentAccount && (
          <Text align="center" mt="6">
            Please connect your Sui wallet to continue
          </Text>
        )}
      </Container>
    </div>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>("");
  const [capId, setCapId] = useState<string>("");

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/allowlist-example/*"
        element={
          <Routes>
            <Route path="/" element={<CreateAllowlist />} />
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
              element={<Feeds suiAddress={currentAccount?.address || ""} />}
            />
          </Routes>
        }
      />
      <Route
        path="/subscription-example/*"
        element={
          <Routes>
            <Route path="/" element={<CreateService />} />
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
              element={<FeedsToSubscribe suiAddress={currentAccount?.address || ""} />}
            />
          </Routes>
        }
      />
    </Routes>
  );
}

export default App;
