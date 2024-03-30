import styles from "./styles.module.css"

export default function Header() {
    return (
        <header>
            <div className={styles.headerBtns}>
                <button 
                    type="button" 
                    className={styles.light}
                >
                    <img src="/./src/assets/light.png" alt="Light"/>
                </button>
                
                <button 
                    type="button" 
                    className={styles.dark}
                >
                    <img src="/./src/assets/dark.png" alt="Dark"/>
                </button>
            </div>
      </header>
    )
}