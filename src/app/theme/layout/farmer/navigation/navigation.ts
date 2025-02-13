export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Farmer',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/farmer/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'forms',
    title: 'Crop Management',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'view-cultivations',
        title: 'My Cultivations',
        type: 'item',
        url: '/farmer/view-cultivations',
        classes: 'nav-item',
        icon: 'fa-brands fa-pagelines'
      },
      {
        id: 'forms-element',
        title: 'My Listings',
        type: 'item',
        url: '/farmer/view-listings',
        classes: 'nav-item',
        icon: 'fa-regular fa-rectangle-list'
      }
    ]
  },
  {
    id: 'forms',
    title: 'Procurement',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'Marketplace',
        type: 'item',
        url: '/farmer/marketplace',
        classes: 'nav-item',
        icon: 'fa-solid fa-shop'
      },
      // {
      //   id: 'forms-element',
      //   title: 'Buyer Connections',
      //   type: 'item',
      //   url: '/farmer/buyer-connections/table',
      //   classes: 'nav-item',
      //   icon: 'feather icon-file-text'
      // },
      // {
      //   id: 'tables',
      //   title: 'Price Prediction',
      //   type: 'item',
      //   url: '/farmer/price-prediction',
      //   classes: 'nav-item',
      //   icon: 'feather icon-server'
      // },
      {
        id: 'tables',
        title: 'Market Insights',
        type: 'item',
        url: '/farmer/market-insights',
        classes: 'nav-item',
        icon: 'fa-solid fa-chart-line'
      },
      {
        id: 'tables',
        title: 'Financial Overview',
        type: 'item',
        url: '/farmer/financial-overview',
        classes: 'nav-item',
        icon: 'fa-solid fa-file-invoice-dollar'
      }
    ]
  },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     }
  //   ]
  // }
];
