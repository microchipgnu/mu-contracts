#!/usr/bin/env zx

import { $ } from "zx";

// Find all files for building
const file_paths = (await $`find ./src -name '*.ts' ! -name '*.ava.ts'`).stdout;

file_paths.split("\n").forEach(async (file_path) => {
  if (file_path.length > 0) {
    const file_name_split = file_path.split("/");
    const file_name = file_path.split("/")[file_name_split.length - 1];
    await $`cd ../.. && near-sdk-js build packages/mb-nft-proxies/src/minting/${file_name} build/${file_name}.wasm`;
  }
});
