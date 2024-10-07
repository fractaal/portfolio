export default [
  {
    name: 'Curator - LLM Powered Horror Game',
    description:
      'Curator is an innovative horror game that leverages large language models (LLMs) to generate dynamic ghost behaviors and dialogue in real-time.<br><br>The player must decipher the type of ghost they are dealing with by observing its interactions and effects on the environment. Ghosts are able to manipulate both the environment and the player in unpredictable ways. The game integrates natural language processing to create immersive, intelligent, and emergent gameplay.<br><br>This project explored the viability of generative AI within a gaming context, particularly for creating responsive non-playable characters (NPCs). The LLM was integrated via external APIs (OpenAI, OpenRouter).',
    main_discipline: {
      name: 'Artificial Intelligence',
      icon: 'fas fa-robot',
    },
    disciplines: [
      { name: 'Artificial Intelligence', icon: 'fas fa-robot' },
      { name: 'Natural Language Processing', icon: 'fas fa-language' },
      { name: 'Game Development', icon: 'fas fa-gamepad' },
      { name: 'Procedural Generation', icon: 'fas fa-random' },
      { name: 'External API Integration', icon: 'fas fa-plug' },
    ],
    technologies: [
      { name: 'Godot Engine', icon: 'fas fa-cube' },
      { name: 'OpenAI API', icon: 'fas fa-cloud' },
      { name: 'OpenRouter', icon: 'fas fa-network-wired' },
      { name: 'Natural Language Processing', icon: 'fas fa-language' },
    ],
    images: [
      '/curator/screenshot1.png',
      '/curator/screenshot2.png',
      '/curator/screenshot3.png',
      '/curator/screenshot4.png',
      '/curator/screenshot5.png',
      '/curator/curator.mp4',
    ],
  },

  {
    name: 'Doctor Who - 2023 Title Sequence Recreation',
    description:
      "Recreated the 2023 Doctor Who Specials Title Sequence using After Effects, Premiere Pro for VFX, compositing, editing, and color grading.<br><br>EmberGen was used for smoke simulations, and Blender's Eevee engine was utilized for 3D rendering.",
    main_discipline: {
      name: 'Visual Effects and Compositing',
      icon: 'fas fa-paint-brush',
    },
    disciplines: [
      { name: 'Visual Effects', icon: 'fas fa-film' },
      { name: 'Compositing', icon: 'fas fa-layer-group' },
      { name: '3D Rendering', icon: 'fas fa-cube' },
      { name: 'Color Grading', icon: 'fas fa-adjust' },
      { name: 'Smoke Simulation', icon: 'fas fa-cloud' },
    ],
    technologies: [
      { name: 'Adobe After Effects', icon: 'fas fa-video' },
      { name: 'Adobe Premiere Pro', icon: 'fas fa-video' },
      { name: 'Blender', icon: 'fas fa-cube' },
      { name: 'EmberGen', icon: 'fas fa-cloud' },
    ],
    images: [
      '/dw2023/4.png',
      '/dw2023/1.png',
      '/dw2023/2.png',
      '/dw2023/3.png',

      '/dw2023/movie.mp4',
    ],
  },
  //
  //

  //

  {
    name: 'Star Trek: Enterprise Warp Out Recreation',
    description:
      "Recreated the iconic 'Enterprise Warp Out' scene from the JJ Abrams Star Trek films.<br><br>Blender’s Eevee engine was used for 3D rendering, while Adobe After Effects was utilized for compositing and further tweaking the visual effects. Premiere Pro handled the final edit and color grading.",

    main_discipline: {
      name: 'Visual Effects and Compositing',
      icon: 'fas fa-paint-brush',
    },
    disciplines: [
      { name: 'Visual Effects', icon: 'fas fa-film' },
      { name: 'Compositing', icon: 'fas fa-layer-group' },
      { name: '3D Rendering', icon: 'fas fa-cube' },
      { name: 'Color Grading', icon: 'fas fa-adjust' },
    ],
    technologies: [
      { name: 'Blender', icon: 'fas fa-cube' },
      { name: 'Adobe After Effects', icon: 'fas fa-video' },
      { name: 'Adobe Premiere Pro', icon: 'fas fa-video' },
    ],
    images: [
      '/enterprise/1.png',
      '/enterprise/2.png',
      '/enterprise/3.png',
      '/enterprise/4.png',
      '/enterprise/5.png',
      '/enterprise/6.png',
      '/enterprise/enterprise.mp4',
    ],
  },

  {
    images: [
      // '/tracvac/home.png',
      '/tracvac/insight.png',
      // '/tracvac/notifs.png',
    ],
    name: 'Tracvac - Vaccine Tracking Application',
    description:
      'Developed during the pandemic, Tracvac tracked vaccines, user occupation, and post-vaccine health reports.<br><br>LGUs received consolidated health data with graphs and analytics to monitor public health. The app also enabled LGUs to send push notifications for schedules, alerts, and updates. It featured a plugin system allowing LGUs to extend functionality, such as adding custom user fields.<br><br>Built using Vue, Quasar for the frontend, Node.js, Express, and PostgreSQL for the backend.',
    main_discipline: {
      name: 'Health Technology',
      icon: 'fas fa-heartbeat',
    },
    disciplines: [
      { name: 'Health Technology', icon: 'fas fa-heartbeat' },
      { name: 'Data Analytics', icon: 'fas fa-chart-bar' },
      { name: 'Mobile Notifications', icon: 'fas fa-bell' },
      { name: 'Backend Development', icon: 'fas fa-server' },
      { name: 'Frontend Development', icon: 'fas fa-code' },
      { name: 'Plugin Architecture', icon: 'fas fa-plug' },
    ],
    technologies: [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Quasar', icon: 'fab fa-vuejs' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Express.js', icon: 'fas fa-server' },
      { name: 'PostgreSQL', icon: 'fas fa-database' },
      { name: 'Push Notifications', icon: 'fas fa-bell' },
    ],
  },

  {
    name: 'Dysglopia Marketplace - NFT Marketplace',
    description:
      "A demo marketplace for the NFT game 'Dysglopia'.<br><br>The marketplace allows users to filter NFTs by attributes such as type, eye shape, and rating. Built using Quasar (Vue), Vue, and Tailwind for a sleek, modern design.",
    main_discipline: {
      name: 'Frontend Development',
      icon: 'fas fa-code',
    },
    disciplines: [
      { name: 'Frontend Development', icon: 'fas fa-code' },
      { name: 'UI/UX Design', icon: 'fas fa-paint-brush' },
      { name: 'Blockchain Integration', icon: 'fas fa-lock' },
    ],
    technologies: [
      { name: 'Quasar', icon: 'fab fa-vuejs' },
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
    ],
    images: ['/dysglopia/1.png', '/dysglopia/2.png'],
  },

  {
    name: 'Receipts - Group Expenses Tracker',
    images: [
      '/receipts/1.png',
      '/receipts/2.png',
      '/receipts/3.png',
      '/receipts/receipts.mp4',
    ],
    description:
      'A homebrew group expenses tracker that allows friends to list how much each person spent and how much they owe or are owed.<br><br>Users can add receipts, and view a summary of how much money they gain or lose, taking into account money to pay or receive from others. Built using Vue, Quasar, and Firebase for the realtime updates.',
    main_discipline: {
      name: 'Full Stack Development',
      icon: 'fas fa-code',
    },
    disciplines: [
      { name: 'Realtime Updates', icon: 'fas fa-sync' },
      { name: 'Firebase', icon: 'fas fa-database' },
      { name: 'Frontend Development', icon: 'fas fa-code' },
    ],
    technologies: [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Quasar', icon: 'fab fa-vuejs' },
      { name: 'Firebase Firestore', icon: 'fas fa-database' },
    ],
  },

  {
    name: 'Dysglopia The Game',
    description:
      "An accessible real-time battle game featuring dynamic and fast-paced combat with you and an enemy's 'gloops.'.<br><br>Players compete to defeat all of their opponent’s gloops in reflex-driven, high-octane gameplay. Built using Unity and C#.",
    main_discipline: {
      name: 'Game Development',
      icon: 'fas fa-gamepad',
    },
    disciplines: [
      { name: 'Game Development', icon: 'fas fa-gamepad' },
      { name: 'Real-time Battle Systems', icon: 'fas fa-bolt' },
      { name: 'Reflex-based Gameplay', icon: 'fas fa-stopwatch' },
    ],
    technologies: [
      { name: 'Unity', icon: 'fas fa-cubes' },
      { name: 'C#', icon: 'fas fa-code' },
    ],

    images: [
      '/dysglopiagame/1.png',
      '/dysglopiagame/2.png',
      '/dysglopiagame/gameplay.mp4',
    ],
  },

  {
    name: 'Bilibenta - E-commerce Platform',
    description:
      'A mock e-commerce platform designed for farmers to deliver products directly to buyers. Focused on UI/UX design with a seamless experience for browsing and purchasing items such as rice, wheat, and meat.<br><br>Implemented using Quasar (Vue), Vue, Tailwind, and TanStack Query.',
    main_discipline: {
      name: 'UI/UX Design',
      icon: 'fas fa-paint-brush',
    },
    disciplines: [
      { name: 'UI/UX Design', icon: 'fas fa-paint-brush' },
      { name: 'Frontend Development', icon: 'fas fa-code' },
      { name: 'E-commerce', icon: 'fas fa-shopping-cart' },
    ],
    technologies: [
      { name: 'Quasar', icon: 'fab fa-vuejs' },
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
      { name: 'TanStack Query', icon: 'fas fa-database' },
    ],
    images: [
      '/bilibenta/1.png',
      // '/bilibenta/2.png',
      '/bilibenta/bilibenta.mp4',
    ],
  },

  {
    name: 'Endeavor - Alternative Moodle Frontend',
    description:
      "Developed as a solution to address the limitations of a school's Moodle LMS during the pandemic.<br><br>Includes a unified reminders system, searchable databases, an improved grade display, and theming support. Built using Vue and Electron.",
    main_discipline: {
      name: 'Educational Technology',
      icon: 'fas fa-graduation-cap',
    },
    disciplines: [
      { name: 'Educational Technology', icon: 'fas fa-graduation-cap' },
      { name: 'Frontend Development', icon: 'fas fa-code' },
      { name: 'UI/UX Design', icon: 'fas fa-paint-brush' },
      { name: 'Electron App Development', icon: 'fas fa-desktop' },
    ],
    technologies: [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Electron', icon: 'fas fa-desktop' },
    ],

    images: ['/endeavor/1.png', '/endeavor/endeavor.mp4'],
  },
  // {
  //   name: 'Wherenau - PUV Tracking Application',
  //   images: ['/endeavor/1.png', '/endeavor/endeavor.mp4'],
  //   description:
  //     'Wherenau allows PUV operators to use phones as GPS beacons for real-time tracking of public utility vehicles on specific routes.<br><br>This helps commuters know the location of their transport in real-time. The app leverages existing technologies like GPS and mobile data to provide an efficient solution.<br><br>Built using Vue and Quasar for the frontend, with Firebase handling the backend and real-time updates.',
  //   main_discipline: {
  //     name: 'Transport Technology',
  //     icon: 'fas fa-bus',
  //   },
  //   disciplines: [
  //     { name: 'Transport Technology', icon: 'fas fa-bus' },
  //     { name: 'GPS Tracking', icon: 'fas fa-map-marker-alt' },
  //     { name: 'Real-time Systems', icon: 'fas fa-clock' },
  //     { name: 'Frontend Development', icon: 'fas fa-code' },
  //     { name: 'Backend Development', icon: 'fas fa-server' },
  //   ],
  //   technologies: [
  //     { name: 'Vue.js', icon: 'fas fa-vuejs' },
  //     { name: 'Quasar', icon: 'fas fa-vuejs' },
  //     { name: 'Firebase', icon: 'fas fa-fire' },
  //     { name: 'GPS', icon: 'fas fa-map-marker-alt' },
  //   ],
  // },
];
