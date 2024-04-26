/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  BASE_ACCOUNT_SIZE,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { getCounterSize } from '../accounts';
import { findCounterPda } from '../pdas';
import { COUNTER_PROGRAM_ADDRESS } from '../programs';
import {
  IInstructionWithByteDelta,
  ResolvedAccount,
  expectAddress,
  expectSome,
  getAccountMetaFactory,
} from '../shared';

export type CreateInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountCounter extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCounter extends string
        ? WritableAccount<TAccountCounter>
        : TAccountCounter,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CreateInstructionData = { discriminator: number };

export type CreateInstructionDataArgs = {};

export function getCreateInstructionDataEncoder(): Encoder<CreateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 0 })
  );
}

export function getCreateInstructionDataDecoder(): Decoder<CreateInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCreateInstructionDataCodec(): Codec<
  CreateInstructionDataArgs,
  CreateInstructionData
> {
  return combineCodec(
    getCreateInstructionDataEncoder(),
    getCreateInstructionDataDecoder()
  );
}

export type CreateAsyncInput<
  TAccountCounter extends string = string,
  TAccountAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  /** The program derived address of the counter account to create (seeds: ['counter', authority]) */
  counter?: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: TransactionSigner<TAccountAuthority>;
  /** The account paying for the storage fees */
  payer?: TransactionSigner<TAccountPayer>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
};

export async function getCreateInstructionAsync<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
>(
  input: CreateAsyncInput<
    TAccountCounter,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): Promise<
  CreateInstruction<
    typeof COUNTER_PROGRAM_ADDRESS,
    TAccountCounter,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  > &
    IInstructionWithByteDelta
> {
  // Program address.
  const programAddress = COUNTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    counter: { value: input.counter ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.counter.value) {
    accounts.counter.value = await findCounterPda({
      authority: expectAddress(accounts.authority.value),
    });
  }
  if (!accounts.payer.value) {
    accounts.payer.value = expectSome(accounts.authority.value);
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  // Bytes created or reallocated by the instruction.
  const byteDelta: number = [getCounterSize() + BASE_ACCOUNT_SIZE].reduce(
    (a, b) => a + b,
    0
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.counter),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCreateInstructionDataEncoder().encode({}),
  } as CreateInstruction<
    typeof COUNTER_PROGRAM_ADDRESS,
    TAccountCounter,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >;

  return Object.freeze({ ...instruction, byteDelta });
}

export type CreateInput<
  TAccountCounter extends string = string,
  TAccountAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  /** The program derived address of the counter account to create (seeds: ['counter', authority]) */
  counter: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: TransactionSigner<TAccountAuthority>;
  /** The account paying for the storage fees */
  payer?: TransactionSigner<TAccountPayer>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getCreateInstruction<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
>(
  input: CreateInput<
    TAccountCounter,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): CreateInstruction<
  typeof COUNTER_PROGRAM_ADDRESS,
  TAccountCounter,
  TAccountAuthority,
  TAccountPayer,
  TAccountSystemProgram
> &
  IInstructionWithByteDelta {
  // Program address.
  const programAddress = COUNTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    counter: { value: input.counter ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.payer.value) {
    accounts.payer.value = expectSome(accounts.authority.value);
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  // Bytes created or reallocated by the instruction.
  const byteDelta: number = [getCounterSize() + BASE_ACCOUNT_SIZE].reduce(
    (a, b) => a + b,
    0
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.counter),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCreateInstructionDataEncoder().encode({}),
  } as CreateInstruction<
    typeof COUNTER_PROGRAM_ADDRESS,
    TAccountCounter,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >;

  return Object.freeze({ ...instruction, byteDelta });
}

export type ParsedCreateInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The program derived address of the counter account to create (seeds: ['counter', authority]) */
    counter: TAccountMetas[0];
    /** The authority of the counter */
    authority: TAccountMetas[1];
    /** The account paying for the storage fees */
    payer: TAccountMetas[2];
    /** The system program */
    systemProgram: TAccountMetas[3];
  };
  data: CreateInstructionData;
};

export function parseCreateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      counter: getNextAccount(),
      authority: getNextAccount(),
      payer: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getCreateInstructionDataDecoder().decode(instruction.data),
  };
}
