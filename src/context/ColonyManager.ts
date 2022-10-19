import { Signer, providers } from 'ethers';
import {
  // getTokenClient,
  ClientType,
  // ColonyClient,
  ContractClient,
  ColonyNetworkClient,
  Extension,
  // OneTxPaymentClient,
  TokenClient,
  TokenLockingClient,
  ExtensionClient,
} from '@colony/colony-js';

import { isAddress } from '~utils/web3';
import { Address, AddressOrENSName } from '~types/index';

export default class ColonyManager {
  private metaColonyClient?: any;

  colonyClients: Map<Address, Promise<any>>;

  extensionClients: Map<string, Promise<ExtensionClient>>;

  tokenClients: Map<Address, Promise<TokenClient>>;

  tokenLockingClients: Map<Address, Promise<TokenLockingClient>>;

  networkClient: ColonyNetworkClient;

  provider: providers.Provider;

  signer: Signer;

  constructor(networkClient: ColonyNetworkClient) {
    this.colonyClients = new Map();
    this.extensionClients = new Map();
    this.tokenClients = new Map();
    this.tokenLockingClients = new Map();
    this.networkClient = networkClient;
    this.provider = networkClient.provider;
    this.signer = networkClient.signer;
  }

  private async getColonyPromise(address: Address) {
    const client = await this.networkClient.getColonyClient(address);

    // Check if the colony exists by calling `version()` (in lieu of an
    // explicit means of checking whether a colony exists at an address).
    try {
      await client.version();
    } catch (caughtError) {
      throw new Error(`Colony with address ${address} not found`);
    }
    return client;
  }

  private async getColonyClient(identifier: AddressOrENSName): Promise<any> {
    if (!(typeof identifier === 'string' && identifier.length)) {
      throw new Error('A colony address or ENS name must be provided');
    }

    const address = await this.resolveColonyIdentifier(identifier);
    return this.colonyClients.get(address) || this.setColonyClient(address);
  }

  private async getColonyExtensionClient(
    identifier: AddressOrENSName,
    extensionId: Extension,
  ): Promise<ExtensionClient> {
    const address = await this.resolveColonyIdentifier(identifier);
    const key = `${address}-${extensionId}`;
    let client = this.extensionClients.get(key);
    if (!client) {
      const colonyClient = await this.getColonyClient(identifier);
      client = colonyClient.getExtensionClient(extensionId);
      this.extensionClients.set(key, client as Promise<ExtensionClient>);
    }
    return client as Promise<ExtensionClient>;
  }

  /*
   * @TODO Thiss needs to be refactored (or removed), as the ENS logic was removed
   * from this, due to it being deprecated
   */
  // eslint-disable-next-line class-methods-use-this
  private async resolveColonyIdentifier(
    identifier: AddressOrENSName,
  ): Promise<Address> {
    return isAddress(identifier) ? identifier : '0x0';
  }

  /*
   * @TODO Refactor to fix the broken colonyJS imports
   *
   * everything that's below is just a placeholders
   */
  // async setColonyClient(address: Address): Promise<ColonyClient> {
  //   const clientPromise = this.getColonyPromise(address);
  //   this.colonyClients.set(address, clientPromise);
  //   clientPromise.catch(() => this.colonyClients.delete(address));
  //   return clientPromise;
  // }
  async setColonyClient(address: Address) {
    return this.getColonyPromise(address);
  }

  // async getMetaColonyClient(): Promise<ColonyClient> {
  //   if (this.metaColonyClient) return this.metaColonyClient;
  //   this.metaColonyClient = await this.networkClient.getMetaColonyClient();
  //   return this.metaColonyClient;
  // }

  async getClient(type: ClientType.NetworkClient): Promise<ColonyNetworkClient>;

  // async getClient(
  //   type: ClientType.ColonyClient,
  //   identifier?: AddressOrENSName,
  // ): Promise<ColonyClient>;

  async getClient(
    type: ClientType.TokenClient,
    identifier?: AddressOrENSName,
  ): Promise<TokenClient>;

  async getClient(
    type: ClientType.TokenLockingClient,
    identifier?: AddressOrENSName,
  ): Promise<TokenLockingClient>;

  // async getClient(
  //   type: ClientType.OneTxPaymentClient,
  //   identifier?: AddressOrENSName,
  // ): Promise<OneTxPaymentClient>;

  async getClient(
    type: ClientType,
    identifier?: AddressOrENSName,
  ): Promise<ContractClient>;

  async getClient(
    type: ClientType,
    identifier?: AddressOrENSName,
  ): Promise<ContractClient> {
    switch (type) {
      case ClientType.NetworkClient: {
        return this.networkClient;
      }
      case ClientType.ColonyClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get ColonyClient');
        return this.getColonyClient(identifier);
      }
      case ClientType.TokenClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get TokenClient');
        const colonyClient = await this.getColonyClient(identifier);
        return colonyClient.tokenClient;
      }
      case ClientType.TokenLockingClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get TokenLockingClient');
        const colonyClient = await this.getColonyClient(identifier);
        const tokenLockingClient = this.networkClient.getTokenLockingClient();
        /*
         * @TODO This needs a proper fix in colonyJS
         */
        // @ts-ignore
        colonyClient.tokenLockingClient = tokenLockingClient;
        return tokenLockingClient;
      }
      case ClientType.OneTxPaymentClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get OneTxPaymentClient');
        return this.getColonyExtensionClient(
          identifier,
          Extension.OneTxPayment,
        );
      }
      case ClientType.CoinMachineClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get CoinMachineClient');
        return this.getColonyExtensionClient(identifier, Extension.CoinMachine);
      }
      case ClientType.VotingReputationClient: {
        if (!identifier)
          throw new Error(
            'Need colony identifier to get the VotingReputationClient',
          );
        return this.getColonyExtensionClient(
          identifier,
          Extension.VotingReputation,
        );
      }
      case ClientType.WhitelistClient: {
        if (!identifier)
          throw new Error('Need colony identifier to get the WhitelistClient');
        return this.getColonyExtensionClient(identifier, Extension.Whitelist);
      }
      default: {
        throw new Error('A valid contract client type has to be specified');
      }
    }
  }

  // async getTokenClient(address: Address): Promise<TokenClient> {
  //   let clientPromise = this.tokenClients.get(address);
  //   if (!clientPromise) {
  //     clientPromise = getTokenClient(address, this.signer);
  //     this.tokenClients.set(address, clientPromise);
  //   }
  //   return clientPromise;
  // }

  // async getTokenLockingClient(address: Address): Promise<TokenLockingClient> {
  //   let clientPromise = this.tokenLockingClients.get(address);
  //   if (!clientPromise) {
  //     clientPromise = this.networkClient.getTokenLockingClient();
  //     this.tokenLockingClients.set(address, clientPromise);
  //   }
  //   return clientPromise;
  // }
}