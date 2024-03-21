import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Index'
import Sidebar from '../components/Sidebar/Index'
import WelcomeText from '../components/WelcomeText/Index'

export default function RootLayout() {
    return (
        <>
            <Header/>

            <Sidebar/>

            <WelcomeText/>

            <Outlet/>
        </>
    )
}