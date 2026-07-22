import glsl from 'vite-plugin-glsl'

export default {
    root: 'src/', // Sources files (typically where index.html is)
    // The virtual desktop can open this page through either /game-tour/ or
    // /game-tour/index.html. An absolute route keeps Vite's assets stable
    // when a static host applies its clean-URL redirect.
    base: '/game-tour/',
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../../public/game-tour', // Published by the parent Next.js static export
        emptyOutDir: true, // Empty the folder first
        sourcemap: false // Keep the public static deployment lean
    },
    plugins:
    [
        glsl() // Support GLSL files
    ],
}
