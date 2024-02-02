import React, {FC} from 'react';
import "./MyBtn.scss"

interface MyBtnProps {
    type: string;
    text: string;
}

const MyBtn: FC<MyBtnProps> = ({text}) => {
    return (
        <button type="submit" className={"container-my-btn"}>
            {text}
        </button>
    );
};

export default MyBtn;