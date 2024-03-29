'use client';

import { EncodeDecodeForm } from '../../components/encode-decode-form';
import { decodeURL } from '../lib/decode-url';
import { encodeURL } from '../lib/encode-url';

export function URLEncodeDecodeForm() {
  return <EncodeDecodeForm encode={encodeURL} decode={decodeURL} />;
}
