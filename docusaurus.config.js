// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CodeGame',
  tagline: 'A rich ecosystem of tools and libraries for writing player controllers for many games.',
  url: 'https://code-game.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CodeGame',
        logo: {
          alt: 'CG',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/docs/intro',
            label: "Introduction",
            position: "left",
          },
          {
            to: '/docs/quick-start',
            label: "Quick Start",
            position: "left",
          },
          {
            to: '/docs/specification',
            label: "Specification",
            position: "left",
          },
          {
            href: 'https://github.com/code-game-project',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} CodeGame Contributors. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
