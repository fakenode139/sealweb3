import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Inset,
} from '@radix-ui/themes';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="4">
      <Card size="3" style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
        <Flex direction="column" gap="3" align="center">
          <Heading size="4" align="center">TRY Allowlist</Heading>
          <Box>
            <Text as="ol" size="2">
              <li>Click "Try it"</li>
              <li>Create Your Name Allow List</li>
              <li>Add New Wallets</li>
              <li>Select Values service</li>
              <li>Upload file</li>
              <li>Click "Encrypt and Upload to Walrus"</li>
              <li>Click "Associate file to Sui object"</li>
              <li>Done</li>
            </Text>
          </Box>
          <Link to="/allowlist-example">
            <Button size="3" variant="solid" color="blue">
              Try it
            </Button>
          </Link>
        </Flex>
      </Card>

      <Card size="3" style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
        <Flex direction="column" gap="3" align="center">
          <Heading size="4" align="center">TRY Subscription</Heading>
          <Box>
            <Text as="ol" size="2">
              <li>Click "Try it"</li>
              <li>Enter Price in MIST</li>
              <li>Set duration in minutes</li>
              <li>Name the service</li>
              <li>Click Create Service</li>
              <li>Upload & Encrypt</li>
              <li>Associate file to subscription</li>
              <li>Done</li>
            </Text>
          </Box>
          <Link to="/subscription-example">
            <Button size="3" variant="solid" color="blue">
              Try it
            </Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState('');
  const [capId, setCapId] = useState('');

  return (
    <Box style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <Container py="5">
        <Flex direction="column" align="center" gap="4">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
          />
          <Heading size="6" align="center">
            Fakenode Seal Testnet
          </Heading>
          <Flex gap="3">
            <a href="https://twitter.com" target="_blank">
              <img src="/twitter-icon.svg" width={24} />
            </a>
            <a href="https://t.me" target="_blank">
              <img src="/telegram-icon.svg" width={24} />
            </a>
            <a href="https://youtube.com" target="_blank">
              <img src="/youtube-icon.svg" width={24} />
            </a>
          </Flex>
          <ConnectButton />
        </Flex>

        <Inset side="top" my="4">
          <Card>
            <Text size="2">
              1. Code available at{' '}
              <a href="https://github.com/fakenode139/gensyn-testnet" target="_blank">
                GitHub
              </a>
              .
              <br />
              2. Make sure your wallet is set to Testnet and has some SUI from{' '}
              <a href="https://faucet.sui.io/" target="_blank">
                faucet.sui.io
              </a>
              .
              <br />
              3. Files stored on Walrus Testnet are temporary and expire quickly.
            </Text>
          </Card>
        </Inset>

        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/allowlist-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateAllowlist />} />
                    <Route
                      path="/admin/allowlist/:id"
                      element={
                        <Box>
                          <Allowlist
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="allowlist"
                          />
                        </Box>
                      }
                    />
                    <Route path="/admin/allowlists" element={<AllAllowlist />} />
                    <Route
                      path="/view/allowlist/:id"
                      element={<Feeds suiAddress={currentAccount.address} />}
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
                        <Box>
                          <Service
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="subscription"
                          />
                        </Box>
                      }
                    />
                    <Route path="/admin/services" element={<AllServices />} />
                    <Route
                      path="/view/service/:id"
                      element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Flex justify="center" mt="4">
            <Text size="3">Please connect your wallet to continue</Text>
          </Flex>
        )}
      </Container>
    </Box>
  );
}

export default App;
