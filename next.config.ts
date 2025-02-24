import type { NextConfig } from "next";

const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withVanillaExtract(nextConfig);
