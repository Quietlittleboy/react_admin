import Home from '../components/home';
import Category from '../components/category';


const routes = [
    {
        path: '/category',
        component: Category,
        exact: true
    },
    {
        path: '/',
        component: Home,
        exact: true
    },
    
]

export default routes;

