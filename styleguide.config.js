module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(s?)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|webp|gif)$/,
          use: ['url-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ]
    }
  },
  title: 'React Big Sur',
  exampleMode: 'expand',
  usageMode: 'expand',
  tocMode: 'expand',
  pagePerSection: true,
  sortProps: props => props,
  styles: {
    StyleGuide: {
      '@global .row': {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      '@global .background': {
        // background: "url('https://i.redd.it/iibrptucse951.png')",
        background: "url('https://wallpapercave.com/wp/wp6761052.jpg')",
      },
      '@global .canvas': {
        width: 800,
        height: 640,
        position: 'relative',

        backgroundColor: '#f0f0f0',
      },
    }
  },
  sections: [
    {
      name: 'System Capabilities',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/system-capabilities/',
      sections: [
        {
          name: 'Dock',
          sectionDepth: 1,
          content: './src/components/dock/dock.md',
        },
        {
          name: 'Notification Center',
          sectionDepth: 1,
          content: './src/components/notification-center/notification-center.md',
        },
      ]
    },
    {
      name: 'Windows and Views',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/windows-and-views/',
      sections: [
        {
          name: 'Windows',
          sectionDepth: 1,
          content: './src/components/windows/windows.md',
        },
      ]
    },
    {
      name: 'Menus',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/menus/',
      sections: [
        {
          name: 'All Menus',
          sectionDepth: 1,
          content: './src/components/menus/menus.md',
        },
      ]
    },
    {
      name: 'Buttons',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/buttons/',
      sections: [
        {
          name: 'All Buttons',
          sectionDepth: 1,
          content: './src/components/buttons/buttons.md',
        },
      ]
    },
    {
      name: 'Selectors',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/selectors/',
      sections: [
        {
          name: 'Segmented Controls',
          sectionDepth: 1,
          content: './src/components/segmented-controls/segmented-controls.md',
        },
        {
          name: 'Sliders',
          sectionDepth: 1,
          content: './src/components/sliders/sliders.md',
        },
      ]
    },
    {
      name: 'Indicators',
      sectionDepth: 2,
      external: true,
      href: 'https://developer.apple.com/design/human-interface-guidelines/macos/indicators/',
      sections: [
        {
          name: 'Indicators',
          sectionDepth: 1,
          content: './src/components/indicators/indicators.md',
        },
        {
          name: 'Progress',
          sectionDepth: 1,
          content: './src/components/progress/progress.md',
        },
      ]
    },
    {
      name: 'Miscellaneous',
      sectionDepth: 2,
      external: true,
      sections: [
        {
          name: 'Traffic Lights',
          sectionDepth: 1,
          content: './src/components/traffic-lights/traffic-lights.md',
        },
        {
          name: 'Lists',
          sectionDepth: 1,
          content: './src/components/lists/lists.md',
        },
        {
          name: 'Tooltip',
          sectionDepth: 1,
          content: './src/components/tooltip/tooltip.md',
        },
      ]
    },
    {
      name: 'Component API',
      components: './src/components/**/*.{js,jsx,ts,tsx}',
    },
  ],
}
