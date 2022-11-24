import React, { useState } from "react";
import { AppBar,Toolbar,Tabs,Tab } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
const linkArr=["Home","Diaries","Auth"]
const Header = () => {
    const [value,setValue]=useState()
  return (
    <div>
      <AppBar sx={{bgcolor:"transparent", position:"sticky"}}>
        <Toolbar>
            <TravelExploreIcon sx={{color:"black"}}/>
            <Tabs value={value} onChange={(e,val)=>setValue(val)} sx={{ml:"auto",textDecoration:"none"}}>
                
                    {
                        linkArr.map((link)=>(
                            <Tab
                            sx={{
                                textDecoration:"none",
                                ":hover":{
                                    textDecoration:"underline",
                                    textUnderlineOffset:"18px"
                                }
                            }}
                             label={link} key={link}/>
                        ))
                    }
                
            </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
