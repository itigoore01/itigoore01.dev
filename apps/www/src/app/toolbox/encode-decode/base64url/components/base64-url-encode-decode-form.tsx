'use client';

import { EncodeDecodeForm } from '../../components/encode-decode-form';
import { decodeBase64URL } from '../lib/decode-base64-url';
import { encodeBase64URL } from '../lib/encode-base64-url';

export function Base64URLEncodeDecodeForm() {
  return <EncodeDecodeForm encode={encodeBase64URL} decode={decodeBase64URL} />;
}
