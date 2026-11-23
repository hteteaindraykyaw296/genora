import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
const compat = new FlatCompat({baseDirectory: path.resolve('.')});
export default [...compat.extends('next/core-web-vitals','next/typescript'), {ignores:['out/**','.next/**','next-env.d.ts']}];
