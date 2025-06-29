import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Box,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import GetAppIcon from "@material-ui/icons/GetApp";
import WorkOffIcon from "@material-ui/icons/WorkOff";
import StarIcon from "@material-ui/icons/Star";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import EventIcon from "@material-ui/icons/Event";
import CloseIcon from "@material-ui/icons/Close";
import PeopleIcon from "@material-ui/icons/People";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";

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
  filterButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  employeeCard: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    },
  },
  employeeCardContent: {
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: "4px solid #667eea",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  employeeName: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
    marginBottom: theme.spacing(1),
  },
  employeeDetail: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: "#4a5568",
    fontSize: "0.95rem",
  },
  employeeDetailIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
    color: "#667eea",
  },
  skillChip: {
    margin: theme.spacing(0.5),
    backgroundColor: "#e6fffa",
    color: "#234e52",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#b2f5ea",
    },
  },
  sopText: {
    backgroundColor: "#f7fafc",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: "1px solid #e2e8f0",
    fontStyle: "italic",
    color: "#4a5568",
    marginTop: theme.spacing(2),
  },
  actionButton: {
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2),
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    margin: theme.spacing(0.5),
    minWidth: 140,
    "&:hover": {
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  downloadButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
  },
  endJobButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
    },
  },
  rateButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(72, 187, 120, 0.6)",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: "white",
    borderRadius: theme.spacing(2),
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    padding: theme.spacing(4),
    outline: "none",
    maxWidth: 600,
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
  },
  closeButton: {
    color: "#a0aec0",
    "&:hover": {
      color: "#4a5568",
      backgroundColor: "#f7fafc",
    },
  },
  submitButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(72, 187, 120, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  cancelButton: {
    background: "linear-gradient(135deg, #a0aec0 0%, #718096 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  filterModal: {
    "& .MuiPaper-root": {
      borderRadius: theme.spacing(2),
      maxWidth: 800,
      width: "90%",
    },
  },
  filterSection: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "#f8fafc",
    borderRadius: theme.spacing(1.5),
  },
  filterTitle: {
    fontWeight: 600,
    color: "#2d3748",
    marginBottom: theme.spacing(2),
  },
  sortOption: {
    border: "2px solid #e2e8f0",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#667eea",
      backgroundColor: "#f7fafc",
    },
  },
  noEmployeesContainer: {
    textAlign: "center",
    padding: theme.spacing(8),
    color: "#4a5568",
  },
  noEmployeesIcon: {
    fontSize: "4rem",
    color: "#cbd5e0",
    marginBottom: theme.spacing(2),
  },
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  
  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.modalPaper}>
          <div className={classes.modalHeader}>
            <Typography className={classes.modalTitle}>
              Filter Employees
            </Typography>
            <IconButton 
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Sort Options
                </Typography>
                <Grid container spacing={1}>
                  {[
                    { key: "jobApplicant.name", label: "Name" },
                    { key: "job.title", label: "Job Title" },
                    { key: "dateOfJoining", label: "Date of Joining" },
                    { key: "jobApplicant.rating", label: "Rating" }
                  ].map((sortType) => (
                    <Grid item xs={6} key={sortType.key}>
                      <div className={classes.sortOption}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={searchOptions.sort[sortType.key].status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    [sortType.key]: {
                                      ...searchOptions.sort[sortType.key],
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              color="primary"
                            />
                          }
                          label={sortType.label}
                        />
                        <IconButton
                          size="small"
                          disabled={!searchOptions.sort[sortType.key].status}
                          onClick={() => {
                            setSearchOptions({
                              ...searchOptions,
                              sort: {
                                ...searchOptions.sort,
                                [sortType.key]: {
                                  ...searchOptions.sort[sortType.key],
                                  desc: !searchOptions.sort[sortType.key].desc,
                                },
                              },
                            });
                          }}
                        >
                          {searchOptions.sort[sortType.key].desc ? (
                            <ArrowDownwardIcon />
                          ) : (
                            <ArrowUpwardIcon />
                          )}
                        </IconButton>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Box textAlign="center" mt={2}>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={() => getData()}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [openEndJob, setOpenEndJob] = useState(false);
  const [rating, setRating] = useState(application.jobApplicant.rating);

  const appliedOn = new Date(application.dateOfApplication);

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, applicantId: application.jobApplicant.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        getData();
        setOpen(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating rating",
        });
        getData();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEndJob = () => {
    setOpenEndJob(false);
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${server}${application.jobApplicant.resume}`;
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          setPopup({
            open: true,
            severity: "error",
            message: "Error downloading resume",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
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
        handleCloseEndJob();
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating status",
        });
        handleCloseEndJob();
      });
  };

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.employeeCard}>
        <CardContent className={classes.employeeCardContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={2}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Avatar
                  src={`${server}${application.jobApplicant.profile}`}
                  className={classes.avatar}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={7}>
              <Typography className={classes.employeeName}>
                {application.jobApplicant.name}
              </Typography>
              
              <Box className={classes.employeeDetail}>
                <Rating
                  value={
                    application.jobApplicant.rating !== -1
                      ? application.jobApplicant.rating
                      : null
                  }
                  readOnly
                  size="small"
                />
              </Box>

              <Box className={classes.employeeDetail}>
                <BusinessIcon className={classes.employeeDetailIcon} />
                <Typography>Job: {application.job.title}</Typography>
              </Box>

              <Box className={classes.employeeDetail}>
                <PersonIcon className={classes.employeeDetailIcon} />
                <Typography>Role: {application.job.jobType}</Typography>
              </Box>

              <Box className={classes.employeeDetail}>
                <EventIcon className={classes.employeeDetailIcon} />
                <Typography>Applied: {appliedOn.toLocaleDateString()}</Typography>
              </Box>

              <Box className={classes.sopText}>
                <Typography variant="body2">
                  <strong>SOP:</strong> {application.sop !== "" ? application.sop : "Not Submitted"}
                </Typography>
              </Box>

              <Box mt={2}>
                {application.jobApplicant.skills.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill} 
                    className={classes.skillChip}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Box display="flex" flexDirection="column" height="100%">
                <Button
                  className={`${classes.actionButton} ${classes.downloadButton}`}
                  onClick={getResume}
                  startIcon={<GetAppIcon />}
                >
                  Download Resume
                </Button>
                
                <Button
                  className={`${classes.actionButton} ${classes.endJobButton}`}
                  onClick={() => setOpenEndJob(true)}
                  startIcon={<WorkOffIcon />}
                >
                  End Job
                </Button>
                
                <Button
                  className={`${classes.actionButton} ${classes.rateButton}`}
                  onClick={() => setOpen(true)}
                  startIcon={<StarIcon />}
                >
                  Rate Employee
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        {/* Rating Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper className={classes.modalPaper}>
              <div className={classes.modalHeader}>
                <Typography className={classes.modalTitle}>
                  Rate Employee
                </Typography>
                <IconButton 
                  onClick={handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              
              <Typography variant="body1" style={{ marginBottom: 24, color: "#4a5568", textAlign: "center" }}>
                How would you rate {application.jobApplicant.name}'s performance?
              </Typography>
              
              <Box display="flex" justifyContent="center" mb={3}>
                <Rating
                  name="employee-rating"
                  value={rating === -1 ? null : rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  size="large"
                />
              </Box>
              
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  className={classes.submitButton}
                  onClick={changeRating}
                  startIcon={<StarIcon />}
                >
                  Submit Rating
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>

        {/* End Job Modal */}
        <Modal
          open={openEndJob}
          onClose={handleCloseEndJob}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openEndJob}>
            <Paper className={classes.modalPaper}>
              <div className={classes.modalHeader}>
                <Typography className={classes.modalTitle}>
                  End Employment
                </Typography>
                <IconButton 
                  onClick={handleCloseEndJob}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              
              <Typography variant="body1" style={{ marginBottom: 24, color: "#4a5568", textAlign: "center" }}>
                Are you sure you want to end {application.jobApplicant.name}'s employment?
              </Typography>
              
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  className={classes.endJobButton}
                  onClick={() => updateStatus("finished")}
                  startIcon={<WorkOffIcon />}
                >
                  End Employment
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleCloseEndJob}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </Card>
    </Fade>
  );
};

const AcceptedApplicants = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      "job.title": {
        status: false,
        desc: false,
      },
      dateOfJoining: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];
    searchParams = [...searchParams, `status=accepted`];

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });

    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    let address = `${apiList.applicants}`;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setApplications([]);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error fetching employees",
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
                Employee Management
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Manage your accepted employees and track their performance
              </Typography>
              
              <Box textAlign="center">
                <IconButton 
                  onClick={() => setFilterOpen(true)}
                  className={classes.filterButton}
                >
                  <FilterListIcon />
                  <Typography variant="body2" style={{ marginLeft: 8 }}>
                    Filter & Sort
                  </Typography>
                </IconButton>
              </Box>
            </div>
          </Paper>

          {/* Employees Section */}
          <Grid container spacing={2}>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <Grid item xs={12} key={application._id || index}>
                  <ApplicationTile application={application} getData={getData} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div className={classes.noEmployeesContainer}>
                  <PeopleIcon className={classes.noEmployeesIcon} />
                  <Typography variant="h4" gutterBottom>
                    No Employees Found
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    You don't have any accepted employees yet.
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </div>
  );
};

export default AcceptedApplicants;




// import { useState, useEffect, useContext } from "react";
// import {
//   Button,
//   Chip,
//   Grid,
//   IconButton,
//   InputAdornment,
//   makeStyles,
//   Paper,
//   TextField,
//   Typography,
//   Modal,
//   Slider,
//   FormControlLabel,
//   FormGroup,
//   MenuItem,
//   Checkbox,
//   Avatar,
// } from "@material-ui/core";
// import { useParams } from "react-router-dom";
// import Rating from "@material-ui/lab/Rating";
// import axios from "axios";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// import { SetPopupContext } from "../../App";

// import apiList, { server } from "../../lib/apiList";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "inherit",
//   },
//   statusBlock: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     textTransform: "uppercase",
//   },
//   jobTileOuter: {
//     padding: "30px",
//     margin: "20px 0",
//     boxSizing: "border-box",
//     width: "100%",
//   },
//   popupDialog: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatar: {
//     width: theme.spacing(17),
//     height: theme.spacing(17),
//   },
// }));

// const FilterPopup = (props) => {
//   const classes = useStyles();
//   const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
//   return (
//     <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
//       <Paper
//         style={{
//           padding: "50px",
//           outline: "none",
//           minWidth: "50%",
//         }}
//       >
//         <Grid container direction="column" alignItems="center" spacing={3}>
//           {/* <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Application Status
//             </Grid>
//             <Grid
//               container
//               item
//               xs={9}
//               justify="space-around"
//               // alignItems="center"
//             >
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="rejected"
//                       checked={searchOptions.status.rejected}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           status: {
//                             ...searchOptions.status,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Rejected"
//                 />
//               </Grid>
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="applied"
//                       checked={searchOptions.status.applied}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           status: {
//                             ...searchOptions.status,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Applied"
//                 />
//               </Grid>
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="shortlisted"
//                       checked={searchOptions.status.shortlisted}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           status: {
//                             ...searchOptions.status,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Shortlisted"
//                 />
//               </Grid>
//             </Grid>
//           </Grid> */}
//           <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Sort
//             </Grid>
//             <Grid item container direction="row" xs={9}>
//               <Grid
//                 item
//                 container
//                 xs={6}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="name"
//                     checked={searchOptions.sort["jobApplicant.name"].status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "jobApplicant.name": {
//                             ...searchOptions.sort["jobApplicant.name"],
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="name"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="name">
//                     <Typography>Name</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort["jobApplicant.name"].status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "jobApplicant.name": {
//                             ...searchOptions.sort["jobApplicant.name"],
//                             desc: !searchOptions.sort["jobApplicant.name"].desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort["jobApplicant.name"].desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 xs={6}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="jobTitle"
//                     checked={searchOptions.sort["job.title"].status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "job.title": {
//                             ...searchOptions.sort["job.title"],
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="jobTitle"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="jobTitle">
//                     <Typography>Job Title</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort["job.title"].status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "job.title": {
//                             ...searchOptions.sort["job.title"],
//                             desc: !searchOptions.sort["job.title"].desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort["job.title"].desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 xs={6}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="dateOfJoining"
//                     checked={searchOptions.sort.dateOfJoining.status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           dateOfJoining: {
//                             ...searchOptions.sort.dateOfJoining,
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="dateOfJoining"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="dateOfJoining">
//                     <Typography>Date of Joining</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort.dateOfJoining.status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           dateOfJoining: {
//                             ...searchOptions.sort.dateOfJoining,
//                             desc: !searchOptions.sort.dateOfJoining.desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort.dateOfJoining.desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 xs={6}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="rating"
//                     checked={searchOptions.sort["jobApplicant.rating"].status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "jobApplicant.rating": {
//                             ...searchOptions.sort[["jobApplicant.rating"]],
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="rating"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="rating">
//                     <Typography>Rating</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort["jobApplicant.rating"].status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           "jobApplicant.rating": {
//                             ...searchOptions.sort["jobApplicant.rating"],
//                             desc: !searchOptions.sort["jobApplicant.rating"]
//                               .desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort["jobApplicant.rating"].desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "10px 50px" }}
//               onClick={() => getData()}
//             >
//               Apply
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//   );
// };

// const ApplicationTile = (props) => {
//   const classes = useStyles();
//   const { application, getData } = props;
//   const setPopup = useContext(SetPopupContext);
//   const [open, setOpen] = useState(false);
//   const [openEndJob, setOpenEndJob] = useState(false);
//   const [rating, setRating] = useState(application.jobApplicant.rating);

//   const appliedOn = new Date(application.dateOfApplication);

//   const changeRating = () => {
//     axios
//       .put(
//         apiList.rating,
//         { rating: rating, applicantId: application.jobApplicant.userId },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: "Rating updated successfully",
//         });
//         // fetchRating();
//         getData();
//         setOpen(false);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         // fetchRating();
//         getData();
//         setOpen(false);
//       });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCloseEndJob = () => {
//     setOpenEndJob(false);
//   };

//   const colorSet = {
//     applied: "#3454D1",
//     shortlisted: "#DC851F",
//     accepted: "#09BC8A",
//     rejected: "#D1345B",
//     deleted: "#B49A67",
//     cancelled: "#FF8484",
//     finished: "#4EA5D9",
//   };

//   const getResume = () => {
//     if (
//       application.jobApplicant.resume &&
//       application.jobApplicant.resume !== ""
//     ) {
//       const address = `${server}${application.jobApplicant.resume}`;
//       console.log(address);
//       axios(address, {
//         method: "GET",
//         responseType: "blob",
//       })
//         .then((response) => {
//           const file = new Blob([response.data], { type: "application/pdf" });
//           const fileURL = URL.createObjectURL(file);
//           window.open(fileURL);
//         })
//         .catch((error) => {
//           console.log(error);
//           setPopup({
//             open: true,
//             severity: "error",
//             message: "Error",
//           });
//         });
//     } else {
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "No resume found",
//       });
//     }
//   };

//   const updateStatus = (status) => {
//     const address = `${apiList.applications}/${application._id}`;
//     const statusData = {
//       status: status,
//       dateOfJoining: new Date().toISOString(),
//     };
//     axios
//       .put(address, statusData, {
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
//         handleCloseEndJob();
//         getData();
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         console.log(err.response);
//         handleCloseEndJob();
//       });
//   };

//   return (
//     <Paper className={classes.jobTileOuter} elevation={3}>
//       <Grid container>
//         <Grid
//           item
//           xs={2}
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Avatar
//             src={`${server}${application.jobApplicant.profile}`}
//             className={classes.avatar}
//           />
//         </Grid>
//         <Grid container item xs={7} spacing={1} direction="column">
//           <Grid item>
//             <Typography variant="h5">
//               {application.jobApplicant.name}
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Rating
//               value={
//                 application.jobApplicant.rating !== -1
//                   ? application.jobApplicant.rating
//                   : null
//               }
//               readOnly
//             />
//           </Grid>
//           <Grid item>Job Title: {application.job.title}</Grid>
//           <Grid item>Role: {application.job.jobType}</Grid>
//           <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
//           <Grid item>
//             SOP: {application.sop !== "" ? application.sop : "Not Submitted"}
//           </Grid>
//           <Grid item>
//             {application.jobApplicant.skills.map((skill) => (
//               <Chip label={skill} style={{ marginRight: "2px" }} />
//             ))}
//           </Grid>
//         </Grid>
//         <Grid item container direction="column" xs={3}>
//           <Grid item>
//             <Button
//               variant="contained"
//               className={classes.statusBlock}
//               color="primary"
//               onClick={() => getResume()}
//             >
//               Download Resume
//             </Button>
//           </Grid>
//           <Grid item container xs>
//             {/* {buttonSet[application.status]} */}
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.statusBlock}
//               style={{
//                 background: "#09BC8A",
//               }}
//               onClick={() => {
//                 setOpenEndJob(true);
//               }}
//             >
//               End Job
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.statusBlock}
//               onClick={() => {
//                 setOpen(true);
//               }}
//             >
//               Rate Applicant
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
//         <Paper
//           style={{
//             padding: "20px",
//             outline: "none",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             minWidth: "30%",
//             alignItems: "center",
//           }}
//         >
//           <Rating
//             name="simple-controlled"
//             style={{ marginBottom: "30px" }}
//             value={rating === -1 ? null : rating}
//             onChange={(event, newValue) => {
//               setRating(newValue);
//             }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             style={{ padding: "10px 50px" }}
//             onClick={() => changeRating()}
//           >
//             Submit
//           </Button>
//         </Paper>
//       </Modal>
//       <Modal
//         open={openEndJob}
//         onClose={handleCloseEndJob}
//         className={classes.popupDialog}
//       >
//         <Paper
//           style={{
//             padding: "20px",
//             outline: "none",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             minWidth: "30%",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h4" style={{ marginBottom: "10px" }}>
//             Are you sure?
//           </Typography>
//           <Grid container justify="center" spacing={5}>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 style={{ padding: "10px 50px" }}
//                 onClick={() => {
//                   updateStatus("finished");
//                 }}
//               >
//                 Yes
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{ padding: "10px 50px" }}
//                 onClick={() => handleCloseEndJob()}
//               >
//                 Cancel
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Modal>
//     </Paper>
//   );
// };

// const AcceptedApplicants = (props) => {
//   const setPopup = useContext(SetPopupContext);
//   const [applications, setApplications] = useState([]);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [searchOptions, setSearchOptions] = useState({
//     sort: {
//       "jobApplicant.name": {
//         status: false,
//         desc: false,
//       },
//       "job.title": {
//         status: false,
//         desc: false,
//       },
//       dateOfJoining: {
//         status: true,
//         desc: true,
//       },
//       "jobApplicant.rating": {
//         status: false,
//         desc: false,
//       },
//     },
//   });

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     let searchParams = [];
//     searchParams = [...searchParams, `status=accepted`];

//     let asc = [],
//       desc = [];

//     Object.keys(searchOptions.sort).forEach((obj) => {
//       const item = searchOptions.sort[obj];
//       if (item.status) {
//         if (item.desc) {
//           desc = [...desc, `desc=${obj}`];
//         } else {
//           asc = [...asc, `asc=${obj}`];
//         }
//       }
//     });

//     searchParams = [...searchParams, ...asc, ...desc];
//     const queryString = searchParams.join("&");
//     console.log(queryString);
//     let address = `${apiList.applicants}`;
//     if (queryString !== "") {
//       address = `${address}?${queryString}`;
//     }

//     console.log("address->",address);

//     axios
//       .get(address, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setApplications(response.data);
//       })
//       .catch((err) => {
//         console.log(err.response);
//         console.log(err.response.data);
//         setApplications([]);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//       });
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
//           <Typography variant="h2">Employees</Typography>
//         </Grid>
//         <Grid item>
//           <IconButton onClick={() => setFilterOpen(true)}>
//             <FilterListIcon />
//           </IconButton>
//         </Grid>
//         <Grid
//           container
//           item
//           xs
//           direction="column"
//           style={{ width: "100%" }}
//           alignItems="stretch"
//           justify="center"
//         >
//           {applications.length > 0 ? (
//             applications.map((obj) => (
//               <Grid item>
//                 {/* {console.log(obj)} */}
//                 <ApplicationTile application={obj} getData={getData} />
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="h5" style={{ textAlign: "center" }}>
//               No Applications Found
//             </Typography>
//           )}
//         </Grid>
//       </Grid>
//       <FilterPopup
//         open={filterOpen}
//         searchOptions={searchOptions}
//         setSearchOptions={setSearchOptions}
//         handleClose={() => setFilterOpen(false)}
//         getData={() => {
//           getData();
//           setFilterOpen(false);
//         }}
//       />
//     </>
//   );
// };

// export default AcceptedApplicants;
