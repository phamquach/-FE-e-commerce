"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import * as yup from "yup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Checkbox,
  TextField,
  Button,
  Typography,
  Link as LinkMui,
  Box,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ROUTE from "@/routes/routes";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: yup.bool().oneOf([true], "You must agree to the Terms of Service"),
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const Background = styled.div`
  background: linear-gradient(135deg, #00d1b2, #ff7f5091);
  background-size: cover;
  background-position: center;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    height: calc(100vh + 48px);
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  margin: 1rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState<string | null>(null);
  const [messageState, setMessageState] = React.useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserRegister) => {
    try {
      console.log(data);
      setVerifyCode("");
    } catch (error) {
      if (error instanceof Error) {
        setMessageState(error.message);
      }
    }
  };

  return (
    <Background>
      <Link href={ROUTE.home}>
        <Button sx={{ position: "absolute", top: 2, left: 2 }}>
          <ArrowBackIcon /> Back To Home
        </Button>
      </Link>
      <FormContainer>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          Register
        </Typography>
        <Typography variant="body2" mb={3} textAlign="center" color="red">
          {messageState}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            gap={2}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Your first name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Your last name"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Your phone number"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your address"
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            label="Your password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {verifyCode !== null && (
            <Grid
              display={"grid"}
              gridTemplateColumns={{ sm: "auto auto", xs: "auto" }}
              gap={2}
            >
              <TextField fullWidth margin="normal" label="Verify Code" />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "var(--background-default)",
                  mt: { xs: 0, md: 2 },
                  mb: 1,
                }}
              >
                Send
              </Button>
            </Grid>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox {...register("terms")} color="primary" id="check-box" />
            <label htmlFor="check-box">
              <Typography variant="body2">
                I agree to the{" "}
                <LinkMui href="#" underline="hover">
                  Terms of Service
                </LinkMui>
              </Typography>
            </label>
          </Box>
          {errors.terms && (
            <Typography color="error" variant="body2">
              {errors.terms.message}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              mt: 3,
              backgroundColor: "#00d1b2",
              "&:hover": { backgroundColor: "#00b89c" },
            }}
          >
            Sign up
          </Button>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Do you have an Account?{" "}
              <LinkMui href={ROUTE.login} underline="hover" component={Link}>
                Sign In
              </LinkMui>
            </Typography>
          </Box>
        </form>
      </FormContainer>
    </Background>
  );
}
