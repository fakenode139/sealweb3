import React from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Card, Container, Flex, Text } from "@radix-ui/themes";

function App() {
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

        {/* Wallet prompt */}
        <Text align="center" mt="6">
          Please connect your Sui wallet to continue
        </Text>
      </Container>
    </div>
  );
}

export default App;
