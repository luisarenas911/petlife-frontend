import { makeStyles } from "@material-ui/core";
import { useState } from "react";
// import { Title } from "../styled/Title.style";
// import { Image } from "../styled/Image.styled";
// import { Button } from "../styled/Button.style";

const useStyles = makeStyles((theme) => ({
  div: {
    paddingTop: theme.spacing(10),
  },
}));

export default function NewPet() {
  const classes = useStyles();

  const [image, setImage] = useState();

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "lpsty2kc");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/delvoxvyc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImage(file.url); //put the url in local state, next step you can send it to the backend
  };

  return (
    <div className={classes.div}>
      <title>
        Hey, how cool is it if you user can upload an image directly?
      </title>
      <br />
      <input type="file" onChange={uploadImage} />
      <div>
        <img
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
          alt="name"
        />
        {image ? (
          <title style={{ fontSize: 20 }}>Succesfully uploaded!</title>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
