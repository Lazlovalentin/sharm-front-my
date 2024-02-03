import React, {FC} from 'react';
import "./InformationMessages.scss"


interface ErrorMessagesProps {
    text: string;
    type: "error" | "success" | "warning";
}

const InformationMessages: FC<ErrorMessagesProps> = ({text, type}) => {
    const className = `wrapper-messages ${type}`;

    return (
        <div className="container-error-messages">
            <div className={className}>
                {text}
            </div>
        </div>
    );
};

export default InformationMessages;