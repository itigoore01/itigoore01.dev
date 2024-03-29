'use client';

import { EncodeDecodeForm } from '../../components/encode-decode-form';
import { decodeBase64 } from '../lib/decode-base64';
import { encodeBase64 } from '../lib/encode-base64';

export function Base64EncodeDecodeForm() {
  return <EncodeDecodeForm encode={encodeBase64} decode={decodeBase64} />;
}
