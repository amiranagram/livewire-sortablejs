import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve"
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/livewire-sortable.js',
            format: 'umd',
            sourcemap: true,
        },
        {
            file: 'dist/livewire-sortable.min.js',
            format: 'umd',
            plugins: [
                terser({
                    compress: {
                        drop_debugger: false,
                    },
                }),
            ]
        }
    ],
    plugins: [
        commonjs(),
        resolve(),
        filesize(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
