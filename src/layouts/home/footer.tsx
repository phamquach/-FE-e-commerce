import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";

// background-color: #ffffff;
//   padding: 4rem 2rem;
//   border-top: 1px solid #eee;
//   font-family: "Poppins", sans-serif;
const Footer = () => {
  return (
    <section id="about">
      <footer
        style={{
          backgroundColor: "#ffffff",
          padding: "4rem 2rem",
          borderTop: "1px solid #eee",
        }}
      >
        <Grid container spacing={4} justifyContent="space-between">
          <Grid>
            <Typography variant="h6" fontWeight={700} color="#1e0e62">
              Startup
            </Typography>
            <Typography mt={2} color="#a1a1b5">
              Be sure to take a look at our <br />
              Terms of Use and Privacy Policy
            </Typography>
          </Grid>

          <Grid>
            <Typography fontWeight={700} color="#1e0e62">
              About
            </Typography>
            <Box mt={2}>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                About Us
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Blog
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Team
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Career
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Contact
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography fontWeight={700} color="#1e0e62">
              Company
            </Typography>
            <Box mt={2}>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Privacy
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Support
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                Help Desk
              </Typography>
              <Typography
                className="text-underline"
                style={{ cursor: "pointer" }}
              >
                FAQ
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography fontWeight={700} color="#1e0e62" mb={2}>
              Subscribe our Newsletters
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Your email"
                sx={{
                  bgcolor: "#f4f4f6",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  flexGrow: 1,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#25dac5",
                  borderRadius: "50px",
                  textTransform: "none",
                  px: 3,
                  "&:hover": { bgcolor: "#1cb5aa" },
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Box display="flex" gap={2}>
              <Link
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <TwitterIcon />
                </IconButton>
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <FacebookIcon />
                </IconButton>
              </Link>
              <Link
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <GoogleIcon />
                </IconButton>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box mt={6} textAlign="center" color="#a1a1b5">
          <Typography variant="body2">
            Startup Framework contains components and complex blocks which can
            easily be integrated into almost any design.
          </Typography>
        </Box>
      </footer>
    </section>
  );
};

export default Footer;
