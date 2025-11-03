import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { signUp } from "../store/auth/signup";
import { Controller, useForm } from "react-hook-form";

const Home = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // Invalidate and refetch
      alert("success");
      //   queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Grid container direction={"column"} spacing={2}>
        {/* Top Section */}
        <Grid item sx={{ p: 2 }}>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton>
                  <ArrowBack />
                </IconButton>
                <Typography variant="body2">Back</Typography>
              </Box>
            </Grid>
            <Grid item>Custom theme</Grid>
          </Grid>
        </Grid>
        {/* Main Section */}
        <Grid item sx={{ bgcolor: "gray" }}>
          <Grid container>
            <Grid size={4} sx={{ bgcolor: "#F5F6FA", p: 10, pt: 20, pb: 20 }}>
              <Grid container direction={"column"} spacing={2}>
                {/* {[1, 2, 3, 4].map((i) => (
                  <Grid item key={i}>
                    <Grid
                      container
                      direction={"row"}
                      justifyContent={"space-between"}
                    >
                      <Grid item>
                        <Typography>demoooo</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>12345</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))} */}
              </Grid>
            </Grid>
            <Grid size={8} sx={{ bgcolor: "white", p: 10, pr:20}}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>First name</FormLabel>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>

                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>Last name</FormLabel>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <FormLabel>Adress</FormLabel>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth size="medium" />
                      )}
                    />
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>City</FormLabel>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>

                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>State</FormLabel>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>Zip/Postalcode</FormLabel>
                      <Controller
                        name="pincode"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>

                    <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                      <FormLabel>Country</FormLabel>
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} fullWidth size="small" />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
