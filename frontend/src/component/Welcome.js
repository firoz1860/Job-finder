import { Grid, Typography, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Users,
  Building,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import isAuth, { userType } from "../lib/isAuth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
  },
  heroSection: {
    width: "100%",
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    overflow: "hidden",
    paddingTop: theme.spacing(8),
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    "& .blob": {
      position: "absolute",
      borderRadius: "50%",
      mixBlendMode: "multiply",
      filter: "blur(40px)",
      opacity: 0.7,
      animation: "$blob 7s infinite",
    },
    "& .blob1": {
      top: "25%",
      left: "25%",
      width: 384,
      height: 384,
      backgroundColor: "white",
    },
    "& .blob2": {
      top: "33%",
      right: "25%",
      width: 384,
      height: 384,
      backgroundColor: "#a855f7",
      animationDelay: "2s",
    },
    "& .blob3": {
      bottom: "25%",
      left: "50%",
      width: 384,
      height: 384,
      backgroundColor: "#3b82f6",
      animationDelay: "4s",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    padding: theme.spacing(0, 4, 12, 4),
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  badgeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 50,
    padding: theme.spacing(1, 2),
    color: "white",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: "clamp(3rem, 8vw, 7rem)",
    color: "white",
    marginBottom: theme.spacing(3),
    lineHeight: 1.1,
  },
  gradientText: {
    display: "block",
    background: "linear-gradient(to right, #60a5fa, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: "#bfdbfe",
    marginBottom: theme.spacing(5),
    maxWidth: 512,
    margin: `0 auto ${theme.spacing(5)}px auto`,
    lineHeight: 1.6,
  },
  tagsContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(4),
  },
  tagsScroll: {
    display: "flex",
    gap: theme.spacing(2),
    animation: "$scroll 30s linear infinite",
    width: "max-content",
  },
  tag: {
    whiteSpace: "nowrap",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    fontSize: "0.875rem",
    padding: theme.spacing(1, 2),
    borderRadius: 50,
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  },
  fadeEdge: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 96,
    pointerEvents: "none",
    zIndex: 10,
    "&.left": {
      left: 0,
      background: "linear-gradient(to right, #667eea, transparent)",
    },
    "&.right": {
      right: 0,
      background: "linear-gradient(to left, #667eea, transparent)",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  primaryButton: {
    backgroundColor: "white",
    color: "#667eea",
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f8ff",
      transform: "scale(1.05)",
    },
  },
  secondaryButton: {
    border: "2px solid white",
    color: "white",
    backgroundColor: "transparent",
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "white",
      color: "#667eea",
    },
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  statItem: {
    textAlign: "center",
  },
  statIcon: {
    width: 32,
    height: 32,
    color: "#93c5fd",
    margin: "0 auto",
    marginBottom: theme.spacing(1),
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "white",
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    color: "#bfdbfe",
    fontSize: "0.875rem",
  },
  "@keyframes blob": {
    "0%": {
      transform: "translate(0px, 0px) scale(1)",
    },
    "33%": {
      transform: "translate(30px, -50px) scale(1.1)",
    },
    "66%": {
      transform: "translate(-20px, 20px) scale(0.9)",
    },
    "100%": {
      transform: "translate(0px, 0px) scale(1)",
    },
  },
  "@keyframes scroll": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-50%)",
    },
  },
}));

const tagPool = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java",
  "UI/UX Design", "Product Management", "Data Science", "DevOps",
  "Machine Learning", "Cloud Computing", "Mobile Development",
  "Blockchain", "Cybersecurity", "Full Stack", "Frontend",
  "Backend", "GraphQL", "MongoDB",
];

const AnimatedTags = ({ classes }) => (
  <div className={classes.tagsContainer}>
    <div className={classes.tagsScroll}>
      {[...tagPool, ...tagPool].map((tag, i) => (
        <div key={i} className={classes.tag}>
          #{tag}
        </div>
      ))}
    </div>
    <div className={`${classes.fadeEdge} left`} />
    <div className={`${classes.fadeEdge} right`} />
  </div>
);

const Welcome = () => {
  const classes = useStyles();
  const history = useHistory();

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "5,000+" },
    { icon: Users, label: "Companies", value: "1,200+" },
    { icon: Building, label: "Success Stories", value: "10,000+" },
    { icon: TrendingUp, label: "Growth Rate", value: "95%" },
  ];

  const handlePostJob = () => {
    if (userType() === "recruiter") {
      history.push("/addjob");
    } else {
      alert("Only recruiters can post jobs!");
    }
  };

  return (
    <div className={classes.root}>
      <main style={{ paddingTop: 64 }}>
        <section className={classes.heroSection}>
          <div className={classes.backgroundPattern}>
            <div className="blob blob1" />
            <div className="blob blob2" />
            <div className="blob blob3" />
          </div>

          <div className={classes.heroContent}>
            <div className={classes.badgeContainer}>
              <div className={classes.badge}>
                <Star style={{ width: 20, height: 20, color: "#fbbf24" }} />
                <span>#1 Job Portal Platform</span>
              </div>
            </div>

            <Typography className={classes.heroTitle}>
              Find Your Dream
              <span className={classes.gradientText}>
                Career Today
              </span>
            </Typography>

            <Typography className={classes.heroSubtitle}>
              Connect with top companies and discover opportunities that match your
              skills and aspirations. Your next career move starts here.
            </Typography>

            <AnimatedTags classes={classes} />

            <div className={classes.buttonContainer}>
              <button
                onClick={() => history.push("/home")}
                className={classes.primaryButton}
              >
                <span>Explore Jobs</span>
                <ArrowRight style={{ width: 20, height: 20 }} />
              </button>

              {userType() === "recruiter" && (
                <button
                  onClick={handlePostJob}
                  className={classes.secondaryButton}
                >
                  Post a Job
                </button>
              )}
            </div>

            <div className={classes.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={classes.statItem}>
                  <stat.icon className={classes.statIcon} />
                  <div className={classes.statValue}>{stat.value}</div>
                  <div className={classes.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const ErrorPage = () => {
  const classes = useStyles();
  
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        padding: 24,
        minHeight: "93vh",
        background: "linear-gradient(135deg, #fee2e2 0%, #fce7f3 100%)",
      }}
    >
      <Grid item>
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            style={{
              fontSize: "clamp(2rem, 5vw, 5rem)",
              fontWeight: 700,
              color: "#dc2626",
              marginBottom: 16,
            }}
          >
            Error 404
          </Typography>
          <Typography style={{ fontSize: "1.125rem", color: "#6b7280" }}>
            Page not found. Please return to the homepage.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Welcome;




// import { Grid, Typography } from "@material-ui/core";
// import { motion } from "framer-motion";
// import { useState, useEffect, useCallback } from "react";
// import {
//   Briefcase,
//   Users,
//   Building,
//   TrendingUp,
//   Star,
//   ArrowRight,
// } from "lucide-react";
// import isAuth, { userType } from "../lib/isAuth";
// import { useHistory } from "react-router-dom";

// const createJobs = (startId, count) =>
//   new Array(count).fill(null).map((_, idx) => ({
//     id: startId + idx,
//     title: `Frontend Developer ${startId + idx}`,
//     company: "Tech Corp",
//     location: "Remote",
//     type: "Full‑time",
//   }));

// const initialJobs = createJobs(1, 30);

// const tagPool = [
//   "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java",
//   "UI/UX Design", "Product Management", "Data Science", "DevOps",
//   "Machine Learning", "Cloud Computing", "Mobile Development",
//   "Blockchain", "Cybersecurity", "Full Stack", "Frontend",
//   "Backend", "GraphQL", "MongoDB",
// ];

// const AnimatedTags = () => (
//   <div className="relative w-full overflow-hidden py-4">
//     <motion.div
//       animate={{ x: ["0%", "-50%"] }}
//       transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
//       className="flex w-max space-x-4"
//     >
//       {[...tagPool, ...tagPool].map((tag, i) => (
//         <div
//           key={i}
//           className="whitespace-nowrap bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
//         >
//           #{tag}
//         </div>
//       ))}
//     </motion.div>
//     <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-blue-900 to-transparent pointer-events-none" />
//     <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-blue-900 to-transparent pointer-events-none" />
//   </div>
// );

// const Welcome = () => {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [visible, setVisible] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   const loadMore = useCallback(() => {
//     if (loading) return;
//     setLoading(true);
//     setTimeout(() => {
//       const more = createJobs(jobs.length + 1, 10);
//       setJobs((prev) => [...prev, ...more]);
//       setVisible((v) => v + 10);
//       setLoading(false);
//     }, 800);
//   }, [jobs.length, loading]);

//   const onScroll = useCallback(() => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 400 &&
//       !loading
//     ) {
//       loadMore();
//     }
//   }, [loadMore, loading]);

//   useEffect(() => {
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [onScroll]);

//   const stats = [
//     { icon: Briefcase, label: "Active Jobs", value: "5,000+" },
//     { icon: Users, label: "Companies", value: "1,200+" },
//     { icon: Building, label: "Success Stories", value: "10,000+" },
//     { icon: TrendingUp, label: "Growth Rate", value: "95%" },
//   ];

//   const handlePostJob = () => {
//     if (userType() === "recruiter") {
//       history.push("/addjob");
//     } else {
//       alert("Only recruiters can post jobs!");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
//       <main className="pt-16">
//         <section className="w-full relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-full h-full">
//               <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob" />
//               <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-2000" />
//               <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-4000" />
//             </div>
//           </div>

//           <div className="relative w-full px-4 py-24 mx-auto max-w-screen-xl text-center">
//             <div className="flex items-center justify-center mb-6">
//               <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
//                 <Star className="w-5 h-5 text-yellow-400" />
//                 <span className="text-sm font-medium">#1 Job Portal Platform</span>
//               </div>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               Find Your Dream
//               <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Career Today
//               </span>
//             </h1>

//             <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
//               Connect with top companies and discover opportunities that match your
//               skills and aspirations. Your next career move starts here.
//             </p>

//             <AnimatedTags />

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
//               <button
//                 onClick={() => history.push("/home")}
//                 className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//               >
//                 <span>Explore Jobs</span>
//                 <ArrowRight className="w-5 h-5" />
//               </button>

//               {userType() === "recruiter" && (
//                   <button
//                     onClick={handlePostJob}
//                     className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
//                   >
//                     Post a Job
//                   </button>
//                 )}
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
//               {stats.map((s, idx) => (
//                 <div key={idx} className="text-center">
//                   <s.icon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
//                   <div className="text-2xl font-bold text-white">{s.value}</div>
//                   <div className="text-blue-200 text-sm">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };



// export const ErrorPage = () => (
//   <Grid
//     container
//     item
//     direction="column"
//     alignItems="center"
//     justifyContent="center"
//     className="p-6 min-h-[93vh] bg-gradient-to-br from-red-100 to-pink-200"
//   >
//     <Grid item>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="text-center"
//       >
//         <Typography
//           variant="h2"
//           className="text-3xl md:text-5xl font-bold text-red-700"
//         >
//           Error 404
//         </Typography>
//         <Typography className="mt-4 text-lg text-gray-600">
//           Page not found. Please return to the homepage.
//         </Typography>
//       </motion.div>
//     </Grid>
//   </Grid>
// );

// export default Welcome;


// // import { Grid, Typography } from "@material-ui/core";

// // const Welcome = (props) => {

// //   return (

// //     <Grid
// //       container
// //       item
// //       direction="column"
// //       alignItems="center"
// //       justify="center"
// //       style={{ padding: "30px", minHeight: "93vh" }}
// //     >
// //       <Grid item>
// //         <Typography variant="h2">Welcome to Job Portal</Typography>
// //        {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //   <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
// //     Test Tailwind Button
// //   </button>
// // </div> */}

// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export const ErrorPage = (props) => {
// //   return (
// //     <Grid
// //       container
// //       item
// //       direction="column"
// //       alignItems="center"
// //       justify="center"
// //       style={{ padding: "30px", minHeight: "93vh" }}
// //     >
// //       <Grid item>
// //         <Typography variant="h2">Error 404</Typography>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export default Welcome;
