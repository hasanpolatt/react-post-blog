import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Select, Input, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase from 'react-file-base64';
import * as yup from "yup";
import { createPost } from "../actions/postAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["", "programming", "gaming", "fun", "social", "technology", "book"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags)
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const style = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Article</DialogTitle>
      <DialogContent>
        <div className={style.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField id="title" label="Title" name="title" variant="outlined" className={style.textField} size="small"
              inputRef={register} error={errors.title ? true : false} fullWidth
            />
            <TextField style={{ marginTop: '13px' }} id="subtitle" label="Subtitle" name='subtitle' variant="outlined" className={style.textField}
              size='small' inputRef={register} error={errors.subtitle ? true : false} fullWidth
            />
            <Controller
              as={
                <Select input={<Input />} className={style.textField} fullWidth>
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="tag" control={control} error={errors.tag ? true : false} defaultValue={tags[0]}
              style={{ marginTop: '13px' }}
            />
            <TextField style={{ marginBottom: '13px', marginTop: '13px' }} id="content" label="Content" name='content' multiline rows={4} variant="outlined"
              className={style.textField} size='small' inputRef={register}
              error={errors.content ? true : false} fullWidth
            />
            <FileBase multiple={false} onDone={({ base64 }) => setFile(base64)} />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Router>
          <Button
            style={{
              border: '3px solid',
              borderWidth: '3px',
              padding: "6px 15px",
              borderRadius: "16px 16px 16px 16px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "green"
            }} onClick={() => handleSubmit(onSubmit)()}>
            Create
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
            }} onClick={clearForm}>
            Cancel
          </Button>
        </Router>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
