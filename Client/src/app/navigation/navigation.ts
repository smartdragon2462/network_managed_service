import { FuseNavigation } from '@fuse/types';

export const superNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'user',
                title: 'Users',
                type: 'item',
                icon: 'person',
                url: '/super-admin/users'
            },
            {
                id: 'reseller',
                title: 'Resellers',
                type: 'item',
                icon: 'dashboard',
                url: '/super-admin/resellers'
            },
            {
                id: 'settings',
                title: 'Settings',
                type: 'item',
                icon: 'settings',
                url: '/super-admin/settings'
            }
        ]
    }
];

export const standardNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                icon: 'dashboard',
                url: '/standard/dashboard',
            },
            {
                id: 'scheduler',
                title: 'Smart Scheduler',
                type: 'item',
                icon: 'today',
                url: '/standard/smart-scheduler',
            },
            {
                id: 'stories',
                title: 'Stories',
                type: 'item',
                icon: 'layers',
                url: '/standard/stories',
            },
            {
                id: 'artificial',
                title: 'Artificial Intelligence Mode',
                type: 'item',
                icon: 'school',
                url: '/standard/artificial',
            },
            {
                id: 'ranking-engines',
                title: 'Ranking Engines',
                type: 'item',
                icon: 'build',
                url: '/standard/ranking-engines',
            },
            {
                id: 'statistics',
                title: 'Statistics',
                type: 'item',
                icon: 'web_asset',
                url: '/standard/statistics',
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'item',
                icon: 'person',
                url: '/standard/accounts',
            },
            {
                id: 'settings',
                title: 'Settings',
                type: 'item',
                icon: 'settings',
                url: '/standard/settings',
            },
            {
                id: 'help',
                title: 'Help',
                type: 'item',
                icon: 'help',
                url: '/standard/help',
            },
        ]
    }
];

export const proNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                icon: 'dashboard',
                url: '/pro/dashboard',
            },
            {
                id: 'scheduler',
                title: 'Smart Scheduler',
                type: 'item',
                icon: 'today',
                url: '/pro/smart-scheduler',
            },
            {
                id: 'stories',
                title: 'Stories',
                type: 'item',
                icon: 'layers',
                url: '/pro/stories',
            },
            {
                id: 'artificial',
                title: 'Artificial Intelligence Mode',
                type: 'item',
                icon: 'school',
                url: '/pro/artificial',
            },
            {
                id: 'ranking-engines',
                title: 'Ranking Engines',
                type: 'item',
                icon: 'build',
                url: '/pro/ranking-engines',
            },
            {
                id: 'statistics',
                title: 'Statistics',
                type: 'item',
                icon: 'web_asset',
                url: '/pro/statistics',
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'item',
                icon: 'person',
                url: '/pro/accounts',
            },
            {
                id: 'settings',
                title: 'Settings',
                type: 'item',
                icon: 'settings',
                url: '/pro/settings',
            },
            {
                id: 'help',
                title: 'Help',
                type: 'item',
                icon: 'help',
                url: '/pro/help',
            },
        ]
    }
];

export const agencyNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'dashboard',
                url: '/agency/dashboard',
            },
        ]
    }
];

export const resellerNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'dashboard',
                url: '/reseller/dashboard',
            },
        ]
    }
];


