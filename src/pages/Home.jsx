import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { signUp } from "../store/auth/signup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFieldComponent from "../components/TextField";
import { getUserList } from "../store/api/user";

const Home = () => {
  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.preprocess(
      (val) => Number(val),
      z.number().min(100000, "Invalid pincode")
    ),
    country: z.string().min(1, "Country is required"),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address:"",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => console.log("data", data);

  const userList = useQuery({ queryKey: ["users"], queryFn: getUserList });
  console.log("userList", userList.data);
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // Invalidate and refetch
      alert("success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Grid container="true">
        {/* Top Section */}
        <Stack sx={{ p: 2 }} flexGrow={1}>
          <Grid container="true" justifyContent={"space-between"}>
            <Grid>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton>
                  <ArrowBack />
                </IconButton>
                <Typography variant="body2">Back</Typography>
              </Box>
            </Grid>
            <Grid></Grid>
          </Grid>

          {/* Main Section */}
          <Grid sx={{ bgcolor: "gray" }}>
            <Grid container="true">
              <Grid size={4} sx={{ bgcolor: "#F5F6FA", p: 10, pt: 20, pb: 20 }}>
                <Stack container="true" spacing={2}>
                  {userList &&
                    userList.data &&
                    userList?.data.map((user, index) => (
                      <Grid item key={user?.id}>
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Grid item>
                            <Typography>{user?.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{user?.id}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                </Stack>
              </Grid>
              <Grid size={8} sx={{ bgcolor: "white", p: 10, pr: 20 }}>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack container="true" spacing={2}>
                      <Grid
                        container="true"
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>First name</FormLabel>
                          <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.firstName?.message}
                                helperText={
                                  errors ? errors?.firstName?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                          {errors.name?.message && (
                            <p>{errors.name?.message}</p>
                          )}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>Last name</FormLabel>
                          <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.lastName?.message}
                                helperText={
                                  errors ? errors?.lastName?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid>
                        <FormLabel>Adress</FormLabel>
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => (
                            <TextFieldComponent
                              {...field}
                              error={!!errors?.address?.message}
                              helperText={
                                errors ? errors?.address?.message : ""
                              }
                              size="medium"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        container="true"
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>City</FormLabel>
                          <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.city?.message}
                                helperText={errors ? errors?.city?.message : ""}
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>State</FormLabel>
                          <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.state?.message}
                                helperText={
                                  errors ? errors?.state?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container="true"
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>Zip/Postalcode</FormLabel>
                          <Controller
                            name="pincode"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.pincode?.message}
                                helperText={
                                  errors ? errors?.pincode?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>Country</FormLabel>
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.country?.message}
                                helperText={
                                  errors ? errors?.country?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Stack>
                  </form>
                </FormProvider>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Home;
