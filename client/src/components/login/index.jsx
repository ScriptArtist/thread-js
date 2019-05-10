import React from 'react';
import { bindActionCreators } from 'redux';
import { login } from 'src/components/profile/logic/profileActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import formsStyles from 'src/styles/_forms.scss';
import styles from './login.module.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleClickLogin = () => {
        this.props.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        const { user } = this.props;
        return !(user && user.id)
            ? (
                <div className={styles.root}>
                    <div className={styles['login-wrapper']}>
                        <div className={formsStyles['form-line']}>
                            Login
                        </div>
                        <div className={formsStyles['form-line']}>
                            <span className={formsStyles['form-title']}>email:</span>
                            <input id="email" onChange={ev => this.setState({ email: ev.target.value })} />
                        </div>
                        <div className={formsStyles['form-line']}>
                            <span className={formsStyles['form-title']}>password:</span>
                            <input onChange={ev => this.setState({ password: ev.target.value })} />
                        </div>
                        <div className={formsStyles['form-button']}>
                            <button type="submit" onClick={this.handleClickLogin}>Login</button>
                        </div>
                    </div>
                </div>
            )
            : <Redirect to="/" />;
    }
}

Login.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    login: PropTypes.func.isRequired
};

Login.defaultProps = {
    user: undefined
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

const actions = { login };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);