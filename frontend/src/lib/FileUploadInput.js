import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress, makeStyles } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Axios from "axios";
import { SetPopupContext } from "../App";

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    marginBottom: theme.spacing(2),
  },
  uploadButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: theme.spacing(1),
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  selectButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    borderRadius: theme.spacing(1),
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(72, 187, 120, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  fileField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1),
    },
  },
  progressContainer: {
    marginTop: theme.spacing(1),
    "& .MuiLinearProgress-root": {
      borderRadius: theme.spacing(0.5),
      height: 8,
    },
    "& .MuiLinearProgress-bar": {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  },
}));

const FileUploadInput = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const { uploadTo, identifier, handleInput, label, icon } = props;

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleUpload = () => {
    const data = new FormData();
    data.append("file", file);

    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
      .then((response) => {
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setUploadPercentage(0);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Upload failed",
        });
        setUploadPercentage(0);
      });
  };

  return (
    <Grid container item xs={12} direction="column" className={classes.uploadContainer}>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            component="label"
            className={classes.selectButton}
            style={{ width: "100%", height: "100%" }}
          >
            {icon || <CloudUpload />}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                setUploadPercentage(0);
                setFile(event.target.files[0]);
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={label}
            value={file ? file.name || "" : ""}
            InputProps={{ readOnly: true }}
            variant="outlined"
            style={{ width: "100%" }}
            className={classes.fileField}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className={classes.uploadButton}
            style={{ width: "100%", height: "100%" }}
            onClick={handleUpload}
            disabled={!file}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage > 0 && (
        <Grid item xs={12} className={classes.progressContainer}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      )}
    </Grid>
  );
};

export default FileUploadInput;



// import { useState, useContext } from "react";
// import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
// import { CloudUpload } from "@material-ui/icons";
// import Axios from "axios";
// import { SetPopupContext } from "../App";

// const FileUploadInput = (props) => {
//   const setPopup = useContext(SetPopupContext);
//   const { uploadTo, identifier, handleInput } = props;

//   const [file, setFile] = useState("");
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const handleUpload = () => {
//     const data = new FormData();
//     data.append("file", file);

//     Axios.post(uploadTo, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         setUploadPercentage(
//           parseInt(
//             Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           )
//         );
//       },
//     })
//       .then((response) => {
//         handleInput(identifier, response.data.url);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response?.data?.message || "Upload failed",
//         });
//       });
//   };

//   return (
//     <Grid container item xs={12} direction="column" className={props.className}>
//       <Grid container item xs={12} spacing={0}>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             component="label"
//             style={{ width: "100%", height: "100%" }}
//           >
//             {props.icon || <CloudUpload />}
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(event) => {
//                 setUploadPercentage(0);
//                 setFile(event.target.files[0]);
//               }}
//             />
//           </Button>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label={props.label}
//             value={file ? file.name || "" : ""}
//             InputProps={{ readOnly: true }}
//             variant="outlined"
//             style={{ width: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="secondary"
//             style={{ width: "100%", height: "100%" }}
//             onClick={handleUpload}
//             disabled={!file}
//           >
//             <CloudUpload />
//           </Button>
//         </Grid>
//       </Grid>
//       {uploadPercentage !== 0 && (
//         <Grid item xs={12} style={{ marginTop: "10px" }}>
//           <LinearProgress variant="determinate" value={uploadPercentage} />
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// export default FileUploadInput;





// import { useState, useContext } from "react";
// import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
// import { CloudUpload } from "@material-ui/icons";
// import Axios from "axios";

// import { SetPopupContext } from "../App";

// const FileUploadInput = (props) => {
//   const setPopup = useContext(SetPopupContext);

//   const { uploadTo, identifier, handleInput } = props;

//   const [file, setFile] = useState("");
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const handleUpload = () => {
//     console.log(file);
//     const data = new FormData();
//     data.append("file", file);
//     Axios.post(uploadTo, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         setUploadPercentage(
//           parseInt(
//             Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           )
//         );
//       },
//     })
//       .then((response) => {
//         console.log(response.data);
//         handleInput(identifier, response.data.url);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//       })
//       .catch((err) => {
//         console.log(err.response);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.statusText,
//           //   message: err.response.data
//           //     ? err.response.data.message
//           //     : err.response.statusText,
//         });
//       });
//   };

//   return ( 
//     <Grid container item xs={12} direction="column" className={props.className}>
//       <Grid container item xs={12} spacing={0}>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             component="label"
//             style={{ width: "100%", height: "100%" }}
//           >
//             {props.icon}
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(event) => {
//                 console.log(event.target.files);
//                 setUploadPercentage(0);
//                 setFile(event.target.files[0]);
//               }}
//               // onChange={onChange}
//               // onChange={
//               //   (e) => {}
//               //   //   setSource({ ...source, place_img: e.target.files[0] })
//               // }
//             />
//           </Button>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label={props.label}
//             value={file ? file.name || "" : ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             style={{ width: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="secondary"
//             style={{ width: "100%", height: "100%" }}
//             onClick={() => handleUpload()}
//             disabled={file ? false : true}
//           >
//             <CloudUpload />
//           </Button>
//         </Grid>
//       </Grid>
//       {uploadPercentage !== 0 ? (
//         <Grid item xs={12} style={{ marginTop: "10px" }}>
//           <LinearProgress variant="determinate" value={uploadPercentage} />
//         </Grid>
//       ) : null}
//     </Grid>
//   );
// };

// export default FileUploadInput;
