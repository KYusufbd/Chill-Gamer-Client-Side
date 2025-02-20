import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';


const AuthProvider = ({children}) => {

    const authInfo = {
        
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}