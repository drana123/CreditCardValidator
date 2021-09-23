import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const handleClick = (event , setAnchorEl) => {
  setAnchorEl(event.currentTarget);
};



export default function SimpleMenu(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {menuNameValue ,handleClick} = props;
 
  const handleClose = e => {
    setAnchorEl(null);
  };
  var menuName = menuNameValue;
  return (
    <div>
      <Button data-testid = {"menuBtn"}  aria-controls="simple-menu" aria-haspopup="true" onClick={(event)=>{handleClick(event,setAnchorEl)}}>
        {menuName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Daily</MenuItem>
        <MenuItem onClick={handleClose}>Weekly</MenuItem>
        <MenuItem  onClick={handleClose}>Monthly</MenuItem>
      </Menu>
    </div>
  );
}
