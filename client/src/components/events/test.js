/* {Object.keys(events).length !== 0
    ? events.events.map((item) => {
        return item.category === "courses" &&
          (filter === "courses" || filter === "allEvents") ? (
          <Grid
            key={item._id}
            item
            xs={12}
            md={3}
            lg={2}
            xl={2}
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "1px",
              marginRight: "5px",
              paddingRight: "15px",
              marginBottom: "10px",
            }}
          >
            <Card>
              <CardMedia
                className={classes.image}
                component={"img"}
                src={
                  "https://media-exp1.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0/1548357920228?e=2147483647&v=beta&t=wrOVYN8qrGon9jILrMQv78FsyOV4IMQxr_3UjYtUREI"
                }
              ></CardMedia>
            </Card>

            <CardContent style={{ textAlign: "left" }}>
              <Typography
                variant="h5"
                style={{ textAlign: "left", marginTop: "10px" }}
              >
                {item.title}
              </Typography>
              <Typography component={"p"}>
                Date: {moment(item.data).format("L")}
              </Typography>
              <Typography component={"p"}>
                Event price: {parseFloat(item.price).toFixed(2)}
              </Typography>
              <Typography component={"p"}>
                Date: {moment(item.date).format("L")}
              </Typography>
              <Typography
                component={"p"}
                style={{ wordBreak: "break-all" }}
              >
                Event description: {item.description}
              </Typography>
            </CardContent>
               <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        textTransform: "none",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                      onClick={() => register(item.createdBy, item.title)}
                    >
                      Registration Request
                    </Button>
                  </CardActions>
                </Grid>
              ) : null;
            })
          : null} */
