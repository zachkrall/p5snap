import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import cleanup from 'rollup-plugin-cleanup'

export default [
	{
		input: 'src/main.js',
		output: {
			file: 'lib/bin.js',
			format: 'cjs',
			banner: '#! /usr/bin/env node'
		},
		plugins: [commonjs(), json(), cleanup()]
	},
	{
		input: 'src/snap.js',
		output: {
			file: 'lib/snap.js',
			format: 'cjs'
		},
		plugins: [commonjs(), cleanup()]
	}
]
