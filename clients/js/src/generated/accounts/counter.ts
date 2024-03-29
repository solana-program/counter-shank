/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  EncodedAccount,
  FetchAccountConfig,
  FetchAccountsConfig,
  MaybeAccount,
  MaybeEncodedAccount,
  assertAccountExists,
  assertAccountsExist,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
} from '@solana/accounts';
import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  mapEncoder,
} from '@solana/codecs';
import { CounterSeeds, findCounterPda } from '../pdas';
import { Key, getKeyDecoder, getKeyEncoder } from '../types';

export type Counter<TAddress extends string = string> = Account<
  CounterAccountData,
  TAddress
>;

export type MaybeCounter<TAddress extends string = string> = MaybeAccount<
  CounterAccountData,
  TAddress
>;

export type CounterAccountData = {
  key: Key;
  authority: Address;
  value: number;
};

export type CounterAccountDataArgs = { authority: Address; value: number };

export function getCounterAccountDataEncoder(): Encoder<CounterAccountDataArgs> {
  return mapEncoder(
    getStructEncoder([
      ['key', getKeyEncoder()],
      ['authority', getAddressEncoder()],
      ['value', getU32Encoder()],
    ]),
    (value) => ({ ...value, key: Key.Counter })
  );
}

export function getCounterAccountDataDecoder(): Decoder<CounterAccountData> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['authority', getAddressDecoder()],
    ['value', getU32Decoder()],
  ]);
}

export function getCounterAccountDataCodec(): Codec<
  CounterAccountDataArgs,
  CounterAccountData
> {
  return combineCodec(
    getCounterAccountDataEncoder(),
    getCounterAccountDataDecoder()
  );
}

export function decodeCounter<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Counter<TAddress>;
export function decodeCounter<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeCounter<TAddress>;
export function decodeCounter<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Counter<TAddress> | MaybeCounter<TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getCounterAccountDataDecoder()
  );
}

export async function fetchCounter<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Counter<TAddress>> {
  const maybeAccount = await fetchMaybeCounter(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeCounter<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeCounter<TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeCounter(maybeAccount);
}

export async function fetchAllCounter(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Counter[]> {
  const maybeAccounts = await fetchAllMaybeCounter(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeCounter(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeCounter[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeCounter(maybeAccount));
}

export function getCounterSize(): number {
  return 37;
}

export async function fetchCounterFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: CounterSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Counter> {
  const maybeAccount = await fetchMaybeCounterFromSeeds(rpc, seeds, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeCounterFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: CounterSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeCounter> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findCounterPda(seeds, { programAddress });
  return fetchMaybeCounter(rpc, address, fetchConfig);
}
