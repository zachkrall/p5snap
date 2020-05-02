import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'lib/bin.js',
      format: 'cjs',
      banner: '#! /usr/bin/env node'
    },
    plugins: [commonjs(), json()]
  },
  {
    input: 'src/snap.js',
    banner: '#! /usr/bin/env node',
    output: {
      file: 'lib/snap.js',
      format: 'cjs'
    },
    plugins: [commonjs(), json()]
  }
]
