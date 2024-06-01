import React, {useEffect} from 'react';
import {useSnackbar} from 'notistack';
import {connect} from "react-redux";
import {ApplicationState, MessageState} from "../redux/reducers/types";

type ToastrMessageProps = {
    message: MessageState
}
const ToastrMessage: React.FC<ToastrMessageProps> = ({message}) => {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if(message && message.text) {
            enqueueSnackbar(message.text, {
                variant: message.type,
                anchorOrigin: {vertical: 'top', horizontal: 'right'},
                autoHideDuration: 2000
            });
        }
    }, [message, enqueueSnackbar]);
    return (<React.Fragment/>);
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        message: state.message
    }
};

export default connect(
    mapStateToProps
)(ToastrMessage);
