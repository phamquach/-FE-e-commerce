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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAuth } from "@/contexts/authContext";
import loginAPI from "@/services/api/login_API";
import ROUTE from "@/routes/routes";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: yup.bool().oneOf([true], "You must agree to the Terms of Service"),
});

const Background = styled.div`
  background: linear-gradient(135deg, white, #00d1b2, #ff7f5091);
  background-size: cover;
  background-position: center;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default function SignInForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [messageState, setMessageState] = React.useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await loginAPI(email, password);
      setMessageState(null);
      login(response.data.user);
    } catch {
      setMessageState("Login failed. Wrong email or password.");
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
          Sign In Now
        </Typography>
        <Typography variant="body2" mb={3} textAlign="center" color="red">
          {messageState}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Sign in
          </Button>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Do you don&apos;t have an Account?{" "}
              <LinkMui href={ROUTE.register} underline="hover" component={Link}>
                Sign Up
              </LinkMui>
            </Typography>
          </Box>
        </form>
      </FormContainer>
    </Background>
  );
}
