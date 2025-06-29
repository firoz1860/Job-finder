import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  Card,
  CardContent,
  Box,
  Avatar,
  Fade,
  Chip,
} from "@material-ui/core";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import PersonIcon from "@material-ui/icons/Person";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DescriptionIcon from "@material-ui/icons/Description";
import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { SetPopupContext } from "../App";
import FileUploadInput from "../lib/FileUploadInput";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  heroSection: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: theme.spacing(6, 0),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2),
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
      opacity: 0.3,
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    opacity: 0.9,
    maxWidth: 600,
    margin: "0 auto",
  },
  profileCard: {
    borderRadius: theme.spacing(2),
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "visible",
  },
  profileContent: {
    padding: theme.spacing(4),
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  profileAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    border: "4px solid #667eea",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
  },
  formField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1.5),
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 600,
      color: "#4a5568",
    },
  },
  phoneInputContainer: {
    "& .react-tel-input": {
      "& .form-control": {
        width: "100%",
        height: "56px",
        borderRadius: theme.spacing(1.5),
        border: "1px solid #c4c4c4",
        fontSize: "16px",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
        },
        "&:focus": {
          borderColor: "#667eea",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
        },
      },
    },
  },
  submitButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 6),
    fontWeight: 700,
    fontSize: "1.1rem",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(72, 187, 120, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(72, 187, 120, 0.6)",
    },
    "&:active": {
      transform: "translateY(-1px)",
    },
  },
  viewButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    margin: theme.spacing(1),
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  sectionTitle: {
    fontWeight: 700,
    color: "#2d3748",
    marginBottom: theme.spacing(3),
    fontSize: "1.3rem",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      width: 4,
      height: 24,
      backgroundColor: "#667eea",
      marginRight: theme.spacing(2),
      borderRadius: 2,
    },
  },
  formSection: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: "#f8fafc",
    borderRadius: theme.spacing(1.5),
    border: "1px solid #e2e8f0",
  },
  fieldIcon: {
    color: "#667eea",
    marginRight: theme.spacing(1),
  },
  uploadSection: {
    padding: theme.spacing(3),
    backgroundColor: "#f0f8ff",
    borderRadius: theme.spacing(1.5),
    border: "2px dashed #667eea",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  filePreview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    backgroundColor: "#e6fffa",
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
    profileURL: "",
    resumeURL: "",
  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("Profile Details:", profileDetails);
  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
  const data = response.data;
  setProfileDetails({
    ...data,
    profileURL: data.profile,
    resumeURL: data.resume,
  });
  setPhone(data.contactNumber);
})

      // .then((response) => {
      //   setProfileDetails(response.data);
      //   setPhone(response.data.contactNumber);
      // })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching profile data",
        });
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
      contactNumber: phone !== "" ? `+${phone}` : "",
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating profile",
        });
      });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} md={10} lg={8}>
          {/* Hero Section */}
          <Paper className={classes.heroSection}>
            <div className={classes.heroContent}>
              <Typography className={classes.heroTitle}>
                My Profile
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Manage your personal information and professional details
              </Typography>
            </div>
          </Paper>

          {/* Profile Form */}
          <Fade in={true} timeout={800}>
            <Card className={classes.profileCard}>
              <CardContent className={classes.profileContent}>
                {/* Profile Header */}
                <div className={classes.profileHeader}>
                  <Avatar 
                    src={profileDetails.profileURL}
                    className={classes.profileAvatar}
                  >
                    <PersonIcon style={{ fontSize: "3rem" }} />
                  </Avatar>
                  <Typography variant="h4" style={{ fontWeight: 700, color: "#2d3748" }}>
                    {profileDetails.name || "Your Name"}
                  </Typography>
                </div>

                <Grid container spacing={4}>
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <PersonIcon className={classes.fieldIcon} />
                        Basic Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            label="Full Name"
                            value={profileDetails.name}
                            onChange={(event) =>
                              handleInput("name", event.target.value)
                            }
                            variant="outlined"
                            fullWidth
                            className={classes.formField}
                            placeholder="Enter your full name"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Bio (up to 250 words)"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={profileDetails.bio}
                            onChange={(event) => {
                              if (
                                event.target.value.split(" ").filter((n) => n !== "")
                                  .length <= 250
                              ) {
                                handleInput("bio", event.target.value);
                              }
                            }}
                            fullWidth
                            className={classes.formField}
                            placeholder="Tell us about yourself, your experience, and career goals..."
                            helperText={`${
                              profileDetails.bio
                                ? profileDetails.bio.split(" ").filter(n => n !== "").length
                                : 0
                            }/250 words`}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>

                  {/* Contact Information */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <ContactPhoneIcon className={classes.fieldIcon} />
                        Contact Information
                      </Typography>
                      <Box className={classes.phoneInputContainer}>
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={(phone) => setPhone(phone)}
                          inputStyle={{
                            width: "100%",
                            height: "56px",
                            borderRadius: "12px",
                            border: "1px solid #c4c4c4",
                            fontSize: "16px",
                          }}
                          containerStyle={{
                            width: "100%",
                          }}
                        />
                      </Box>
                    </div>
                  </Grid>

                  {/* File Uploads */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <CloudUploadIcon className={classes.fieldIcon} />
                        Documents & Media
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <div className={classes.uploadSection}>
                            <CloudUploadIcon style={{ fontSize: "3rem", color: "#667eea", marginBottom: 16 }} />
                            <Typography variant="h6" style={{ marginBottom: 8, color: "#2d3748" }}>
                              Profile Image
                            </Typography>
                            <Typography variant="body2" style={{ marginBottom: 16, color: "#4a5568" }}>
                              Upload a professional photo (JPG, PNG)
                            </Typography>
                            <FileUploadInput
                              uploadTo={apiList.uploadProfileImage}
                              identifier="profileURL"
                              handleInput={handleInput}
                              label="Choose Image"
                              icon={<CloudUploadIcon />}
                            />
                            {profileDetails.profileURL && (
                              <div className={classes.filePreview}>
                                <Chip 
                                  label="Profile image uploaded" 
                                  color="primary" 
                                  variant="outlined"
                                />
                                <Button
                                  href={profileDetails.profileURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.viewButton}
                                  startIcon={<VisibilityIcon />}
                                  size="small"
                                >
                                  View
                                </Button>
                              </div>
                            )}
                          </div>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <div className={classes.uploadSection}>
                            <DescriptionIcon style={{ fontSize: "3rem", color: "#667eea", marginBottom: 16 }} />
                            <Typography variant="h6" style={{ marginBottom: 8, color: "#2d3748" }}>
                              Resume
                            </Typography>
                            <Typography variant="body2" style={{ marginBottom: 16, color: "#4a5568" }}>
                              Upload your latest resume (PDF format)
                            </Typography>
                            <FileUploadInput
                              uploadTo={apiList.uploadResume}
                              identifier="resumeURL"
                              handleInput={handleInput}
                              label="Choose PDF"
                              icon={<DescriptionIcon />}
                            />
                            {profileDetails.resumeURL && (
                              <div className={classes.filePreview}>
                                <Chip 
                                  label="Resume uploaded" 
                                  color="primary" 
                                  variant="outlined"
                                />
                                <Button
                                  href={profileDetails.resumeURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.viewButton}
                                  startIcon={<VisibilityIcon />}
                                  size="small"
                                >
                                  View
                                </Button>
                              </div>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box textAlign="center" mt={3}>
                      <Button
                        className={classes.submitButton}
                        onClick={handleUpdate}
                        startIcon={<SaveIcon />}
                        size="large"
                      >
                        Update Profile
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;



// import { useContext, useEffect, useState } from "react";
// import {
//   Button,
//   Grid,
//   Typography,
//   Paper,
//   makeStyles,
//   TextField,
// } from "@material-ui/core";
// import axios from "axios";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";

// import { SetPopupContext } from "../App";
// import FileUploadInput from "../lib/FileUploadInput";
// import { CloudUpload } from "@material-ui/icons";
// import apiList from "../lib/apiList";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "inherit",
//   },
//   popupDialog: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// }));

// const Profile = (props) => {
//   const classes = useStyles();
//   const setPopup = useContext(SetPopupContext);

//   const [profileDetails, setProfileDetails] = useState({
//     name: "",
//     bio: "",
//     contactNumber: "",
//     profileURL: "",
//     resumeURL: "",
//   });

//   const [phone, setPhone] = useState("");

//   const handleInput = (key, value) => {
//     setProfileDetails({
//       ...profileDetails,
//       [key]: value,
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios
//       .get(apiList.user, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setProfileDetails(response.data);
//         setPhone(response.data.contactNumber);
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   const handleUpdate = () => {
//     let updatedDetails = {
//       ...profileDetails,
//       contactNumber: phone !== "" ? `+${phone}` : "",
//     };

//     axios
//       .put(apiList.user, updatedDetails, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//         getData();
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//       });
//   };

//   return (
//     <Grid
//       container
//       item
//       direction="column"
//       alignItems="center"
//       style={{ padding: "30px", minHeight: "93vh" }}
//     >
//       <Grid item>
//         <Typography variant="h2">Profile</Typography>
//       </Grid>
//       <Grid item xs style={{ width: "100%" }}>
//         <Paper
//           style={{
//             padding: "20px",
//             outline: "none",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Grid container direction="column" alignItems="stretch" spacing={3}>
//             <Grid item>
//               <TextField
//                 label="Name"
//                 value={profileDetails.name}
//                 onChange={(event) => handleInput("name", event.target.value)}
//                 variant="outlined"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 label="Bio (upto 250 words)"
//                 multiline
//                 rows={8}
//                 variant="outlined"
//                 value={profileDetails.bio}
//                 onChange={(event) => {
//                   if (
//                     event.target.value.split(" ").filter((n) => n !== "")
//                       .length <= 250
//                   ) {
//                     handleInput("bio", event.target.value);
//                   }
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item>
//               <PhoneInput
//                 country={"in"}
//                 value={phone}
//                 onChange={(phone) => setPhone(phone)}
//               />
//             </Grid>
//             <Grid item>
//               <FileUploadInput
//                 uploadTo={apiList.uploadProfileImage}
//                 identifier="profileURL"
//                 handleInput={handleInput}
//                 label="Profile Image"
//                 icon={<CloudUpload />}
//               />
//             </Grid>
//             <Grid item>
//               <FileUploadInput
//                 uploadTo={apiList.uploadResume}
//                 identifier="resumeURL"
//                 handleInput={handleInput}
//                 label="Resume PDF"
//                 icon={<CloudUpload />}
//               />
//             </Grid>
//             {profileDetails.profileURL && (
//               <Grid item>
//                 <Button
//                   href={profileDetails.profileURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   variant="outlined"
//                 >
//                   View Profile Image
//                 </Button>
//               </Grid>
//             )}
//             {profileDetails.resumeURL && (
//               <Grid item>
//                 <Button
//                   href={profileDetails.resumeURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   variant="outlined"
//                 >
//                   View Resume
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//           <Button
//             variant="contained"
//             color="primary"
//             style={{ padding: "10px 50px", marginTop: "30px" }}
//             onClick={handleUpdate}
//           >
//             Update Details
//           </Button>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default Profile;







// import { useContext, useEffect, useState } from "react";
// import {
//   Button,
//   Grid,
//   Typography,
//   Modal,
//   Paper,
//   makeStyles,
//   TextField,
// } from "@material-ui/core";
// import axios from "axios";
// import ChipInput from "material-ui-chip-input";
// import FileUploadInput from "../lib/FileUploadInput";
// import DescriptionIcon from "@material-ui/icons/Description";
// import FaceIcon from "@material-ui/icons/Face";

// import { SetPopupContext } from "../App";

// import apiList from "../lib/apiList";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "inherit",
//   },
//   popupDialog: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     // padding: "30px",
//   },
// }));

// const MultifieldInput = (props) => {
//   const classes = useStyles();
//   const { education, setEducation } = props;

//   return (
//     <>
//       {education.map((obj, key) => (
//         <Grid item container className={classes.inputBox} key={key}>
//           <Grid item xs={6}>
//             <TextField
//               label={`Institution Name #${key + 1}`}
//               value={education[key].institutionName}
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].institutionName = event.target.value;
//                 setEducation(newEdu);
//               }}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Start Year"
//               value={obj.startYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].startYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="End Year"
//               value={obj.endYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].endYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//         </Grid>
//       ))}
//       <Grid item style={{ alignSelf: "center" }}>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() =>
//             setEducation([
//               ...education,
//               {
//                 institutionName: "",
//                 startYear: "",
//                 endYear: "",
//               },
//             ])
//           }
//           className={classes.inputBox}
//         >
//           Add another institution details
//         </Button>
//       </Grid>
//     </>
//   );
// };

// const Profile = (props) => {
//   const classes = useStyles();
//   const setPopup = useContext(SetPopupContext);
//   const [userData, setUserData] = useState();
//   const [open, setOpen] = useState(false);

//   const [profileDetails, setProfileDetails] = useState({
//     name: "",
//     education: [],
//     skills: [],
//     resume: "",
//     profile: "",
//   });

//   const [education, setEducation] = useState([
//     {
//       institutionName: "",
//       startYear: "",
//       endYear: "",
//     },
//   ]);

//   const handleInput = (key, value) => {
//     setProfileDetails({
//       ...profileDetails,
//       [key]: value,
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios
//       .get(apiList.user, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setProfileDetails(response.data);
//         if (response.data.education.length > 0) {
//           setEducation(
//             response.data.education.map((edu) => ({
//               institutionName: edu.institutionName ? edu.institutionName : "",
//               startYear: edu.startYear ? edu.startYear : "",
//               endYear: edu.endYear ? edu.endYear : "",
//             }))
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const editDetails = () => {
//     setOpen(true);
//   };

//   const handleUpdate = () => {
//     console.log(education);

//     let updatedDetails = {
//       ...profileDetails,
//       education: education
//         .filter((obj) => obj.institutionName.trim() !== "")
//         .map((obj) => {
//           if (obj["endYear"] === "") {
//             delete obj["endYear"];
//           }
//           return obj;
//         }),
//     };

//     axios
//       .put(apiList.user, updatedDetails, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//         getData();
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         console.log(err.response);
//       });
//     setOpen(false);
//   };

//   return (
//     <>
//       <Grid
//         container
//         item
//         direction="column"
//         alignItems="center"
//         style={{ padding: "30px", minHeight: "93vh" }}
//       >
//         <Grid item>
//           <Typography variant="h2">Profile</Typography>
//         </Grid>
//         <Grid item xs>
//           <Paper
//             style={{
//               padding: "20px",
//               outline: "none",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Grid container direction="column" alignItems="stretch" spacing={3}>
//               <Grid item>
//                 <TextField
//                   label="Name"
//                   value={profileDetails.name}
//                   onChange={(event) => handleInput("name", event.target.value)}
//                   className={classes.inputBox}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <MultifieldInput
//                 education={education}
//                 setEducation={setEducation}
//               />
//               <Grid item>
//                 <ChipInput
//                   className={classes.inputBox}
//                   label="Skills"
//                   variant="outlined"
//                   helperText="Press enter to add skills"
//                   value={profileDetails.skills}
//                   onAdd={(chip) =>
//                     setProfileDetails({
//                       ...profileDetails,
//                       skills: [...profileDetails.skills, chip],
//                     })
//                   }
//                   onDelete={(chip, index) => {
//                     let skills = profileDetails.skills;
//                     skills.splice(index, 1);
//                     setProfileDetails({
//                       ...profileDetails,
//                       skills: skills,
//                     });
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item>
//                 <FileUploadInput
//                   className={classes.inputBox}
//                   label="Resume (.pdf)"
//                   icon={<DescriptionIcon />}
//                   uploadTo={apiList.uploadResume}
//                   handleInput={handleInput}
//                   identifier={"resume"}
//                 />
//               </Grid>
//               <Grid item>
//                 <FileUploadInput
//                   className={classes.inputBox}
//                   label="Profile Photo (.jpg/.png)"
//                   icon={<FaceIcon />}
//                   uploadTo={apiList.uploadProfileImage}
//                   handleInput={handleInput}
//                   identifier={"profile"}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "10px 50px", marginTop: "30px" }}
//               onClick={() => handleUpdate()}
//             >
//               Update Details
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//       {/* <Modal open={open} onClose={handleClose} className={classes.popupDialog}> */}

//       {/* </Modal> */}
//     </>
//   );
// };

// export default Profile;
