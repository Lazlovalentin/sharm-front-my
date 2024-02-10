import React, {FC, useEffect, useState} from 'react';
import CustomSelect from "@/components/UI/CustomSelect/CustomSelect";
import MyModal from "@/components/UI/MyModal/MyModal";
import {useApi} from "@/hooks/useApi";
import {useRouter} from "next/navigation";

interface ChangeRoleProps {
    id: string;
    role: string;
}

const ChangeRole: FC<ChangeRoleProps> = ({id, role}) => {
    const router = useRouter();
    const [visible1, setVisible1] = useState(false);
    const {sendRequest, loading, error} = useApi();
    const [selectedOptions, setSelectedOptions] = useState([{id: `${role}`, headerName: `${role}`}]);

    const roles = [
        {id: 'user', headerName: 'user'},
        {id: 'admin', headerName: 'admin'},
        {id: 'consultant', headerName: 'consultant'},
        {id: 'manager', headerName: 'manager'},
        {id: 'viewing', headerName: 'viewing'},
    ];

    useEffect(() => {
        if (selectedOptions[0].id !== role) {
            setVisible1(!visible1);
        }
    }, [selectedOptions]);

    const changeRoleHandler = () => {

        const body = {
            role: selectedOptions[0].id
        }

        sendRequest(`users/update-role/${id}`, 'POST', body)
            .then((res) => {
                console.log("res", res)
                router.refresh();
            })
    }

    return (
        <div>
            <CustomSelect
                options={roles}
                isSingleSelect={true}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                text={""}
            />
            <MyModal visible={visible1} setVisible={setVisible1}>
                <>
                    are you sure you want to change role?
                    <button onClick={changeRoleHandler}>yes</button>
                    <button onClick={() => setVisible1(false)}>No</button>
                    {/* Виправлено */}
                </>
            </MyModal>
        </div>
    );
};

export default ChangeRole;