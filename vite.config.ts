// import { relative, extname, resolve, basename, dirname } from 'node:path';
import { relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { globSync } from 'glob'
import dts from 'vite-plugin-dts'
// @ts-expect-error missing types
import postcssMediaMinMax from 'postcss-media-minmax'

// replace with fileURLToPath
// const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      tsconfigPath: fileURLToPath(new URL('tsconfig.lib.json', import.meta.url))
    })
  ],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        postcssMediaMinMax
      ]
    },
    modules: {
      generateScopedName: (className, filename) => {
        const fileName = basename(filename, '.module.css')

        const hash = createHash('sha256')
          .update(className)
          .digest('base64')
          .substring(0, 5)
          .replace(/\//g, 'X')
          .replace(/\+/g, 'z')

        return `${fileName}_${className}__${hash}`
      }
    }
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL('lib/components/main.ts', import.meta.url)),
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      input: Object.fromEntries(
        globSync('lib/**/*.{ts,vue}', {
          ignore: ['lib/**/*types*.ts']
        }).map(file => [
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    }
  }
})