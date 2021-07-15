import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import { Paper, Button } from '@material-ui/core';
import { withFormik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields'
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import { withRouter } from 'react-router-dom';
import API from '../../../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


/*global $ */
const styles = theme => ({
    Maincontainer: {
        margin: theme.spacing.unit * 3,
    },
    container: {
        margin: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column wrap',
        width: '95%'
    },
    postImage: {
        width: '100%'
    },
    Save: {
        marginBottom: theme.spacing.unit * 2
    },
    formControl: {
        margin: theme.spacing.unit
    },
    leftSide: {
        flex: 4,
        height: '100%',
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    },
    rightSide: {
        flex: 1,
        height: '100%',
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    }
});


class AddPost extends Component {
    componentDidUpdate(props, state) {
        if (this.props.match.params.view === 'add' && this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0) {
            const post = this.props.admin.posts.filter(p => p.title === this.props.values.title)[0];
            this.props.history.push('/admin/posts/edit/' + post.dispatch);
        }

        if (this.props.admin.post.id !== props.admin.post.id) {
            // When redux state changes post in admin reducer
            this.props.setValues(this.props.admin.post);
        }
    }

    uploadImage = (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0], new Date().getTime().toString() + e.target.files[0].name);
        this.props.uploadImage(data, this.props.auth.token, this.props.admin.post.id, this.props.auth.user.userId)
    }

    componentDidMount(props, state) {
        if (this.props.match.params.view === 'edit' && this.props.match.params.id) {
            this.props.getSinglePost(this.props.match.params.id, this.props.auth.token);
        }
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{'list':'ordered'},{'list':'bullet'}],
            [{'indent':-1},{'indent':+1}],
            [{'size':['small','medium','large','huge']}],
            [{'color':[]},{'background':[]}],
            ['image'],
            ['clean']
        ]
    }
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockqoute', 'script', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'code-block'
    ]

    render() {
        const { classes } = this.props
        return (
            <div className={classes.Maincontainer}>
                <h1>Add Post</h1>
                <Form className={classes.container}>
                    <Paper className={classes.leftSide}>
                        <FormikTextField
                            name="title"
                            label="Title"
                            margin="normal"
                            fullWidth
                            onChange={e => this.props.setFieldValue('slug', e.target.value.toLowerCase().replace(/ /g, '_'))}

                        />
                        <FormikTextField
                            name="slug"
                            label="Slug"
                            margin="normal"
                            value={this.props.values.title.toLowerCase().replace()}
                        />
                        <ReactQuill
                            value={this.props.values.content}
                            modules={this.modules}
                            formats={this.formats}
                            placeholder='write somethinggg'
                            onChange={val => this.props.setFieldValue('content', val)}
                        />
                    </Paper>
                    <Paper className={classes.rightSide}>
                        <FormikSelectField
                            name="status"
                            label="status"
                            margin="normal"
                            options={[
                                { label: 'Unpublished', value: false },
                                { label: 'Published', value: true }
                            ]}
                            fullWidth
                        />
                        <div className={classes.Save}>
                            <Button variant="contained" color="secondary"
                                onClick={e => {
                                    this.props.handleSubmit();
                                }}
                            > <SaveIcon />Save</Button>
                        </div>
                        {this.props.admin.post.PostImage ?
                            this.props.admin.post.PostImage.length > 0 ?
                                <img src={API.makeFileURL(this.props.admin.post.PostImage[0].url, this.props.auth.token)} alt='Postimage' className={classes.postImage} />
                                : null
                            : null}
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={e => {
                                    $('.MyFile').trigger('click');
                                }}
                            ><ImageIcon />Upload Post</Button>
                            <input type='file' style={{ display: 'none' }} className="MyFile"
                                onChange={this.uploadImage}
                            />
                        </div>
                    </Paper>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    addPost: (post, token) => {
        dispatch(AdminActions.addPost(post, token));
    },
    updatePost: (post, token) => {
        dispatch(AdminActions.updatePost(post, token));
    },
    getSinglePost: (id, token) => {
        dispatch(AdminActions.getSinglePost(id, token));
    },
    uploadImage: (data, token, postId, userId) => {
        dispatch(AdminActions.uploadImage(data, token, postId, userId));
    }
});

export default withRouter((connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props) => ({
        title: props.admin.post.title || '',
        slug: props.admin.post.slug || '',
        createdAt: props.admin.post.createdAt || '',
        status: props.admin.post.status || false,
        content: props.admin.post.content || ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
        slug: Yup.string().required(),
        content: Yup.string().required()

    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        console.log('saving', props.addPost);
        if (props.match.params.view === 'edit') {
            const post = {
                ...values,
                id: props.match.params.id
            }
            props.updatePost(post, props.auth.token)
        } else {
            props.addPost(values, props.auth.token);
        }
    }
})(withStyles(styles)(AddPost)))));
