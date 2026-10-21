import {Route,Routes} from 'react-router-dom';
import Layout from './components/Layout';
import AdminGuard from './components/AdminGuard';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminProjectForm from './pages/AdminProjectForm';
export default function App(){return <Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/work" element={<Work/>}/><Route path="/work/:slug" element={<ProjectDetail/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Route><Route path="/admin/login" element={<AdminLogin/>}/><Route element={<AdminGuard/>}><Route element={<AdminLayout/>}><Route path="/admin" element={<AdminDashboard/>}/><Route path="/admin/projects" element={<AdminProjects/>}/><Route path="/admin/projects/new" element={<AdminProjectForm/>}/><Route path="/admin/projects/:id/edit" element={<AdminProjectForm/>}/></Route></Route></Routes>}
