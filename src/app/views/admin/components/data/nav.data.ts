// sidenav-data.ts

export interface SidenavOption {
    icon: string;
    path: string;
    label: string;
}

export const sidenavOptions: SidenavOption[] = [
    {
        icon: 'home',
        path: '/admin/',
        label: 'Accueil',
    },
    {
        icon: 'person',
        path: '/admin/user',
        label: 'Mon compte',
    },
    {
        icon: 'school',
        path: '/admin/admission',
        label: 'Admission',
    },
    {
        icon: 'weekend',
        path: '/admin/hebergement',
        label: 'Hébergement',
    },
    {
        icon: 'work',
        path: '/admin/finance',
        label: 'Garantie Financière',
    },

    // Ajoutez d'autres options ici selon vos besoins
];
