import { useState } from "react";
import styles from "./styles.module.css"
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const { pathname } = useLocation();
    let localTheme = localStorage.getItem('ppads-temaSelecionado');
    localTheme = JSON.parse(localTheme);

    const [selectedTheme, setSelectedTheme] = useState(localTheme ? localTheme : "light");
    const [sideBar, setSideBar] = useState("none");

    const handleTheme = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem('ppads-temaSelecionado', JSON.stringify(theme));
        window.location.reload(true);
        // console.log(`Mudou para ${theme}`);
        // console.log(`selectedTheme ${selectedTheme}`);
    }

    return (
        <header 
            style={{
                backgroundColor: selectedTheme === 'light' ? "#fff" : "#262626",
                transition: ".5s"
            }}
        >
            <div className={styles.openResponsiveSidebarBtn}>
                <label htmlFor="sidebarActive" className={styles.openSidebarButton} onClick={() => {setSideBar("flex")}}>
                    <svg style={{fill: selectedTheme === 'light' ? "#262626" : "#fff"}} xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </label>
            </div>

            <nav className={styles.responsiveSidebar} style={{backgroundColor: selectedTheme === 'light' ? "#fff" : "#262626", transition: ".5s", display: sideBar}}>
                <div className={styles.closeResponsiveSidebarBtn}>
                    <input type="checkbox" className={styles.sidebarActive} id="sidebarActive"/>

                    <label htmlFor="sidebarActive" className={styles.closeSidebarButton} onClick={() => {setSideBar("none")}}>
                        <svg style={{fill: selectedTheme === 'light' ? "#262626" : "#fff"}} xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </label>
                </div>

                <div className={styles.linksContainer}>

                    <ul>
                        <li>
                            <Link 
                                to="/" 
                                className={`${pathname === "/" ? styles.activated : ""}`}
                            >
                                <img 
                                    src={`${pathname === "/" ? "/./src/assets/homeActivated.png" : "/./src/assets/home.png"}`} 
                                    alt="Home"
                                />
                                    Home
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to="/turmas" 
                                className={`${pathname.startsWith("/turmas") ? styles.activated : ""}`}
                            >
                                <img 
                                    src={`${pathname.startsWith("/turmas") ? "/./src/assets/turmasActivated.png" : "/./src/assets/turmas.png"}`} 
                                    alt="Turmas"
                                />
                                    Turmas
                            </Link>
                        </li>
                    
                        <li>
                            <Link 
                                to="/configuracoes" 
                                className={`${pathname === "/configuracoes" ? styles.activated : ""}`}
                            >
                                <img 
                                    src={`${pathname === "/configuracoes" ? "/./src/assets/settingsActivated.png" : "/./src/assets/settings.png"}`} 
                                    alt="Configuracoes"
                                />
                                    Configurações
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.exit}>
                        <Link to="https://google.com"><img src="/./src/assets/exit.png" alt="Exit"/>Sair</Link>
                    </div>
                </div>
            </nav>

            <div className={styles.headerBtns}>
                <button 
                    type="button" 
                    className={styles.light}
                    onClick={() => handleTheme('light')}
                >
                    <img src="/./src/assets/light.png" alt="Light"/>
                </button>
                
                <button 
                    type="button" 
                    className={styles.dark}
                    onClick={() => handleTheme('dark')}
                >
                    <img src="/./src/assets/dark.png" alt="Dark"/>
                </button>
            </div>
      </header>
    )
}