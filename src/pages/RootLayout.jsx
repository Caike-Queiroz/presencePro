import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Index'
import Sidebar from '../components/Sidebar/Index'
import WelcomeText from '../components/WelcomeText/Index'

export default function RootLayout() {

    let selectedTheme = localStorage.getItem('ppads-temaSelecionado');
    selectedTheme = JSON.parse(selectedTheme);
    console.log(`selectedTheme ${selectedTheme}`);
    
    return (
        <div
            style={{
                backgroundColor: selectedTheme === 'light' ? "#fff" : "#262626",
                height: "140vh"
            }}
        >
            <Header/>

            <Sidebar/>

            <WelcomeText/>

            <Outlet/>
        </div>
    )
}