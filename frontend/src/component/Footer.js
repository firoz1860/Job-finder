import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaMedium,
  FaDesktop,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    color: "#4a5568",
    width: "100%",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
    "&.dark": {
      background: "rgba(0, 0, 0, 0.6)",
      color: "#e2e8f0",
    },
  },
  findMeText: {
    marginBottom: theme.spacing(1),
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  socialLinks: {
    display: "flex",
    gap: theme.spacing(2.5),
    fontSize: "1.25rem",
    marginBottom: theme.spacing(2),
  },
  socialLink: {
    color: "inherit",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "&.linkedin:hover": {
      color: "#0077b5",
    },
    "&.github:hover": {
      color: "#333",
    },
    "&.instagram:hover": {
      color: "#e4405f",
    },
    "&.medium:hover": {
      color: "#000",
    },
  },
  themeToggle: {
    display: "flex",
    background: "#e2e8f0",
    borderRadius: "50px",
    padding: theme.spacing(0.5, 2),
    gap: theme.spacing(3),
    color: "#1a202c",
    "&.dark": {
      background: "#4a5568",
      color: "#ffffff",
    },
  },
  themeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: theme.spacing(0.5),
    borderRadius: "50%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.className = isDark ? "dark" : "light";
    } else {
      document.documentElement.className = theme;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <footer className={`${classes.footer} ${theme === "dark" ? "dark" : ""}`}>
      <p className={classes.findMeText}>Find me on:</p>
      <div className={classes.socialLinks}>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
          className={`${classes.socialLink} linkedin`}
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
          className={`${classes.socialLink} github`}
        >
          <FaGithub />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram"
          className={`${classes.socialLink} instagram`}
        >
          <FaInstagram />
        </a>
        <a 
          href="https://medium.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Medium"
          className={`${classes.socialLink} medium`}
        >
          <FaMedium />
        </a>
      </div>

      <div className={`${classes.themeToggle} ${theme === "dark" ? "dark" : ""}`}>
        <button 
          onClick={() => setTheme("system")} 
          title="System"
          className={classes.themeButton}
        >
          <FaDesktop />
        </button>
        <button 
          onClick={() => setTheme("light")} 
          title="Light"
          className={classes.themeButton}
        >
          <FaSun />
        </button>
        <button 
          onClick={() => setTheme("dark")} 
          title="Dark"
          className={classes.themeButton}
        >
          <FaMoon />
        </button>
      </div>
    </footer>
  );
};

export default Footer;




// import { useState, useEffect } from "react";
// import {
//   FaLinkedin,
//   FaGithub,
//   FaInstagram,
//   FaMedium,
//   FaDesktop,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";

// const Footer = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     if (theme === "system") {
//       const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       document.documentElement.className = isDark ? "dark" : "light";
//     } else {
//       document.documentElement.className = theme;
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, []);

//   return (
//     <footer className="flex flex-col items-center justify-center p-6 bg-white/60 dark:bg-black/60 text-gray-700 dark:text-gray-300 w-full backdrop-blur-md shadow-md">
//       <p className="mb-2 text-sm font-semibold tracking-wide">Find me on:</p>
//       <div className="flex space-x-5 text-xl mb-4">
//         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//           <FaLinkedin className="hover:text-blue-600 transition" />
//         </a>
//         <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
//           <FaGithub className="hover:text-gray-900 dark:hover:text-white transition" />
//         </a>
//         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//           <FaInstagram className="hover:text-pink-600 transition" />
//         </a>
//         <a href="https://medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium">
//           <FaMedium className="hover:text-black dark:hover:text-white transition" />
//         </a>
//       </div>

//       <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 space-x-6 text-black dark:text-white">
//         <button onClick={() => setTheme("system")} title="System">
//           <FaDesktop className="hover:scale-110 transition" />
//         </button>
//         <button onClick={() => setTheme("light")} title="Light">
//           <FaSun className="hover:scale-110 transition" />
//         </button>
//         <button onClick={() => setTheme("dark")} title="Dark">
//           <FaMoon className="hover:scale-110 transition" />
//         </button>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



// import { useState, useEffect } from "react";
// import {
//   FaLinkedin,
//   FaGithub,
//   FaInstagram,
//   FaMedium,
//   FaDesktop,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";

// const Footer = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, []);

//   return (
//     <footer className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300">
//       <p className="mb-2 text-sm">Find me on:</p>
//       <div className="flex space-x-4 text-xl mb-4">
//         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//           <FaLinkedin />
//         </a>
//         <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//           <FaGithub />
//         </a>
//         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//           <FaInstagram />
//         </a>
//         <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
//           <FaMedium />
//         </a>
//       </div>

//       <div className="flex bg-gray-800 rounded-full px-4 py-2 space-x-4 text-white">
//         <button onClick={() => setTheme("system")}> <FaDesktop /> </button>
//         <button onClick={() => setTheme("light")}> <FaSun /> </button>
//         <button onClick={() => setTheme("dark")}> <FaMoon /> </button>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
