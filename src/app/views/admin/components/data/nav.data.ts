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

    // Ajoutez d'autres options ici selon vos besoins
];
