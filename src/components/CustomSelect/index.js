import { useSelect } from 'downshift';
import {connect} from "react-redux";

import "./CustomSelect.css";

const CustomSelect = (props) => {
    const {
        isOpen,
        selectedItem,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
    } =  useSelect(props.selectedUserId ? {
        items: props.usersData,
        selectedItem: props.usersData.find(user => user.id === props.selectedUserId),
        onSelectedItemChange: props.selectedItemChange,
    }:{ 
        items: props.usersData,
        onSelectedItemChange: props.selectedItemChange,
    });

    return (
        <div className="user_dropdown">
            <button type="button" {...getToggleButtonProps()} className="selected_user_input">
                {selectedItem ? selectedItem.name : ''}
            </button>
            <ul {...getMenuProps()} className={`users_list ${isOpen && "show_users"}`}>
                {isOpen &&
                    props.usersData.map((user, index) => (
                        user.user_status === "accepted" && 
                        <li key={`${user}${index}`}  {...getItemProps({ user, index })} className="user">
                            <img className="user_image" src={user.icon} alt={user.name}/>
                            <span className="user_name">{user.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        usersData: state.allUsers
    };
};

export default connect(mapStateToProps, null)(CustomSelect);