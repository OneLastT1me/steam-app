type MenuItem = {
    name: string;
    link: string;
    dropDown?: MenuItem[];
};

export const MOCK_MENU: MenuItem[] = [
    {
        name: 'STORE',
        link: '/',
        dropDown: [
            {
                name: 'Home',
                link: '/'
            },
            {
                name:'Discovery Queue',
                link: '/'
            } ,
            {
                name: 'Wishlist',
                link: '/'
            },
            {
                name:'News',
                link: '/'
            }
        ]
    },
    {
        name: 'COMUNNITY',
        link: '/',
        dropDown: [
           { 
                name:'Home',
                link: '/'
            },
            {
                name: 'Discussions',
                link: '/'
            } ,
            {
                name:'Markeds',
                link: '/'
            },
        ]
    },
    { 
        name: 'ABOUT',
        link: '/'
    },
    { 
        name: 'SUPPORT',
        link: '/'
    }
    
]