/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  isProgramError,
  type Address,
  type SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM,
  type SolanaError,
} from '@solana/web3.js';
import { COUNTER_PROGRAM_ADDRESS } from '../programs';

/** DeserializationError: Error deserializing an account */
export const COUNTER_ERROR__DESERIALIZATION_ERROR = 0x0; // 0
/** SerializationError: Error serializing an account */
export const COUNTER_ERROR__SERIALIZATION_ERROR = 0x1; // 1
/** InvalidProgramOwner: Invalid program owner. This likely mean the provided account does not exist */
export const COUNTER_ERROR__INVALID_PROGRAM_OWNER = 0x2; // 2
/** InvalidPda: Invalid PDA derivation */
export const COUNTER_ERROR__INVALID_PDA = 0x3; // 3
/** ExpectedEmptyAccount: Expected empty account */
export const COUNTER_ERROR__EXPECTED_EMPTY_ACCOUNT = 0x4; // 4
/** ExpectedNonEmptyAccount: Expected non empty account */
export const COUNTER_ERROR__EXPECTED_NON_EMPTY_ACCOUNT = 0x5; // 5
/** ExpectedSignerAccount: Expected signer account */
export const COUNTER_ERROR__EXPECTED_SIGNER_ACCOUNT = 0x6; // 6
/** ExpectedWritableAccount: Expected writable account */
export const COUNTER_ERROR__EXPECTED_WRITABLE_ACCOUNT = 0x7; // 7
/** AccountMismatch: Account mismatch */
export const COUNTER_ERROR__ACCOUNT_MISMATCH = 0x8; // 8
/** InvalidAccountKey: Invalid account key */
export const COUNTER_ERROR__INVALID_ACCOUNT_KEY = 0x9; // 9
/** NumericalOverflow: Numerical overflow */
export const COUNTER_ERROR__NUMERICAL_OVERFLOW = 0xa; // 10

export type CounterError =
  | typeof COUNTER_ERROR__ACCOUNT_MISMATCH
  | typeof COUNTER_ERROR__DESERIALIZATION_ERROR
  | typeof COUNTER_ERROR__EXPECTED_EMPTY_ACCOUNT
  | typeof COUNTER_ERROR__EXPECTED_NON_EMPTY_ACCOUNT
  | typeof COUNTER_ERROR__EXPECTED_SIGNER_ACCOUNT
  | typeof COUNTER_ERROR__EXPECTED_WRITABLE_ACCOUNT
  | typeof COUNTER_ERROR__INVALID_ACCOUNT_KEY
  | typeof COUNTER_ERROR__INVALID_PDA
  | typeof COUNTER_ERROR__INVALID_PROGRAM_OWNER
  | typeof COUNTER_ERROR__NUMERICAL_OVERFLOW
  | typeof COUNTER_ERROR__SERIALIZATION_ERROR;

let counterErrorMessages: Record<CounterError, string> | undefined;
if (process.env.NODE_ENV !== 'production') {
  counterErrorMessages = {
    [COUNTER_ERROR__ACCOUNT_MISMATCH]: `Account mismatch`,
    [COUNTER_ERROR__DESERIALIZATION_ERROR]: `Error deserializing an account`,
    [COUNTER_ERROR__EXPECTED_EMPTY_ACCOUNT]: `Expected empty account`,
    [COUNTER_ERROR__EXPECTED_NON_EMPTY_ACCOUNT]: `Expected non empty account`,
    [COUNTER_ERROR__EXPECTED_SIGNER_ACCOUNT]: `Expected signer account`,
    [COUNTER_ERROR__EXPECTED_WRITABLE_ACCOUNT]: `Expected writable account`,
    [COUNTER_ERROR__INVALID_ACCOUNT_KEY]: `Invalid account key`,
    [COUNTER_ERROR__INVALID_PDA]: `Invalid PDA derivation`,
    [COUNTER_ERROR__INVALID_PROGRAM_OWNER]: `Invalid program owner. This likely mean the provided account does not exist`,
    [COUNTER_ERROR__NUMERICAL_OVERFLOW]: `Numerical overflow`,
    [COUNTER_ERROR__SERIALIZATION_ERROR]: `Error serializing an account`,
  };
}

export function getCounterErrorMessage(code: CounterError): string {
  if (process.env.NODE_ENV !== 'production') {
    return (counterErrorMessages as Record<CounterError, string>)[code];
  }

  return 'Error message not available in production bundles.';
}

export function isCounterError<TProgramErrorCode extends CounterError>(
  error: unknown,
  transactionMessage: {
    instructions: Record<number, { programAddress: Address }>;
  },
  code?: TProgramErrorCode
): error is SolanaError<typeof SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM> &
  Readonly<{ context: Readonly<{ code: TProgramErrorCode }> }> {
  return isProgramError<TProgramErrorCode>(
    error,
    transactionMessage,
    COUNTER_PROGRAM_ADDRESS,
    code
  );
}
