import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { globSync } from 'glob'
import { relative, extname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto'
import dts from 'vite-plugin-dts'
// @ts-ignore
import postcssMediaMinMax from 'postcss-media-minmax'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      outDir: 'dist/types'
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
      entry: resolve(__dirname, 'lib/components/main.ts'),
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
        entryFileNames: '[name].js',
        chunkFileNames: chunkInfo => {
          console.log(chunkInfo)
          /**
           * chunkInfo {
           *   moduleIds: [
           *     '/Users/<user>/Desktop/geist-components/lib/components/Grid/GridCell.vue?vue&type=script&setup=true&lang.ts'
           *   ]
           * }
           */
          const moduleId = chunkInfo.moduleIds.find(moduleId => moduleId.includes('lib'))!
          const path = moduleId.split('/lib/')[1]

          // this is for cases where there is a chunk at the root
          // '/Users/<user>/Desktop/geist-components/lib/foo.module.css'
          const folder =
            path.includes('/')
              ? path.split('/')[0]
              : null

          if (folder) {
            return `${folder}/[name].js`
          }

          return '[name].js'
        }
      }
    }
  }
})