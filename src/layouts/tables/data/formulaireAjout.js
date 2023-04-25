/* eslint-disable react/jsx-no-undef */
<Grid item xs={12} md={4} lg={4}>
  <MDBox mb={6}>
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader title="Ajout d'objets" />
      <CardContent>
        <Container maxWidth="sm">
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="couleur"
                variant="outlined"
                id="couleur"
                name="couleur"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="marque"
                variant="outlined"
                id="marque"
                name="marque"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="quantité"
                variant="outlined"
                id="quantite"
                name="quantite"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                error
                label="Error"
                defaultValue=""
                type="date"
                id="dateArrive"
                name="dateArrive"
                helperText="Incorrect entry."
                variant="outlined"
                fullWidth
              />
            </MDBox>

            <LoadingButton
              loading
              disableElevation
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              type="submit"
              color="primary"
            >
              Save
            </LoadingButton>
          </MDBox>
        </Container>
      </CardContent>
    </Card>
  </MDBox>
</Grid>;
