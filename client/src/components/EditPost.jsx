import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select, Input, MenuItem, Button } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePost } from "../actions/postAction";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const tags = ["", "programming", "gaming", "fun", "social", "technology", "book"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));

    reset();
    setFile(null);
    closeEditMode();
  };

  const style = useStyles();
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField id="title" label="Title" name="title" variant="outlined" className={style.textField}
          size="small" inputRef={register} error={errors.title ? true : false} fullWidth defaultValue={post?.title}
        />
        <TextField id="subtitle" label="Subtitle" name="subtitle" variant="outlined" className={style.textField}
          size="small" inputRef={register} error={errors.subtitle ? true : false} fullWidth defaultValue={post?.subtitle}
        />
        <Controller
          as={
            <Select input={<Input />} className={style.textField}>
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          }
          name="tag" control={control} error={errors.tag ? true : false} defaultValue={post?.tag}
        />
        <TextField id="content" label="Content" name="content" multiline size="small" inputRef={register} rows={4}
          className={style.textField} variant="outlined" error={errors.content ? true : false} fullWidth
          defaultValue={post?.content}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div className={style.buttons}>
          <Router>
          <Button
            style={{
              border: '3px solid',
              borderWidth: '3px',
              padding: "6px 15px",
              borderRadius: "16px 16px 16px 16px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "blue",
              marginRight: "2px"
            }} type="submit">
            Save
          </Button>
        </Router>
        <Router>
          <Button
            style={{
              border: '3px solid',
              borderWidth: '3px',
              padding: "6px 15px",
              borderRadius: "16px 16px 16px 16px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "red"
            }} onClick={closeEditMode}>
            Cancel
          </Button>
        </Router>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
