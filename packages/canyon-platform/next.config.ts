import type { NextConfig } from "next";
import { resolve } from "node:path";
import { config } from "dotenv";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
config({ path: resolve(__dirname, "../../.env") });
import prisma from "@/lib/prisma";

// flag position, do not delete

export default async function (phase: string) {
  if (
    // true
    phase === "phase-production-server" ||
    phase === "phase-development-server"
  ) {
    // cert flag position, do not delete
    const sysSetting = await prisma.sysSetting.findMany({
      where: {
        NOT: {
          key: phase === "phase-development-server" ? "AUTH_URL" : undefined,
        },
      },
    });
    for (let i = 0; i < sysSetting.length; i++) {
      process.env[sysSetting[i].key] = sysSetting[i].value;
      console.log(`设置${sysSetting[i].key}为${sysSetting[i].value}`);
    }
  }
  const nextConfig: NextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      swcPlugins:
        process.env.NODE_ENV === "production"
          ? [
              // ["swc-plugin-coverage-instrument", {}],
              // ["swc-plugin-canyon", {}],
            ]
          : [],
    },
  };

  return withNextIntl(nextConfig);
}

// export default withNextIntl(nextConfig);
