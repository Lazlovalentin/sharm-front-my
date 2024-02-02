import React, {FC} from 'react';
import "./ErrorMessages.scss"

interface ErrorMessagesProps {
    text: string;
}

const ErrorMessages: FC<ErrorMessagesProps> = ({text}) => {
    return (
        <div className="container-error-messages">
            {text}
        </div>
    );
};

export default ErrorMessages;