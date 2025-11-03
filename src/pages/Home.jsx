import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFieldComponent from "../components/TextField";
import { getProductList } from "../store/api/productList";
import { registerProduct } from "../store/api/registerProduct";

const Home = () => {
  const schema = z.object({
    name: z.string().min(1, "PC name is required"),
    model: z.string().min(1, "Model is required"),
    year: z.coerce
      .number()
      .int({ message: "Year must be an integer" })
      .positive({ message: "Year is required" }),
    harddiskSize: z.string().min(1, "Harddisk size is required"),
    price: z.coerce.number().positive({ message: "Price is required" }),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      model: "",
      year: "",
      harddiskSize: "",
      price: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      data: {
        year: data.year,
        price: data.price,
        "CPU model": data.model,
        "Hard disk size": data.harddiskSize,
      },
    };
    mutation.mutate(payload);
  };

  const productList = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });
  const mutation = useMutation({
    mutationFn: registerProduct,
    onSuccess: (data) => {
      if(data.id){
        
      }
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
                  {productList &&
                    productList.data &&
                    productList?.data.map((product, index) => (
                      <Grid key={product?.id}>
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Grid>
                            <Typography>{product?.name}</Typography>
                          </Grid>
                          <Grid>
                            <Typography>{product?.data?.price}</Typography>
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
                          <FormLabel>PC name</FormLabel>
                          <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.name?.message}
                                helperText={errors ? errors?.name?.message : ""}
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>CPU model</FormLabel>
                          <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.model?.message}
                                helperText={
                                  errors ? errors?.model?.message : ""
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
                          <FormLabel>Hard disk size</FormLabel>
                          <Controller
                            name="harddiskSize"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.harddiskSize?.message}
                                helperText={
                                  errors ? errors?.harddiskSize?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                          <FormLabel>Price</FormLabel>
                          <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                              <TextFieldComponent
                                {...field}
                                error={!!errors?.price?.message}
                                helperText={
                                  errors ? errors?.price?.message : ""
                                }
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                        <FormLabel>Year</FormLabel>
                        <Controller
                          name="year"
                          control={control}
                          render={({ field }) => (
                            <TextFieldComponent
                              {...field}
                              error={!!errors?.year?.message}
                              helperText={errors ? errors?.year?.message : ""}
                              size="small"
                              fullWidth
                            />
                          )}
                        />
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
