import Home from '../components/home';
import Category from '../containers/category';


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

