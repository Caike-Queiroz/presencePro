import { useState } from "react";
import styles from "./styles.module.css"

export default function Header() {
    let localTheme = localStorage.getItem('ppads-temaSelecionado');
    localTheme = JSON.parse(localTheme);

    const [selectedTheme, setSelectedTheme] = useState(localTheme ? localTheme : "light");

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