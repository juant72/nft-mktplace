"use client";
// React Imports
import React, {useState, useEffect} from "react";
import { useClient } from 'next/amp';
import Image from "next/image";
import Link from "next/link";
// Icons imports
import {MdNotifications} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {CgMenuLeft, CgMenuRight} from 'react-icons/cg';


// Internal Imports
import Style from "./NavBar.module.css";
import {Discover, HelpCenter, Notification, Profile, SideBar} from './index';
import {Button } from '../componentesindex';
import images from '../../img';


const NavBar = () => {
    //UseStates
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    
    const openMenu=(e)=> {
        const btnText=e.target.innerText;
        if (btnText=="Discover"){
            setDiscover(true);
            setHelp(false);
            setProfile(false);
            setNotification(false);
        } else if (btnText=="Help Center"){
            setDiscover(false);
            setHelp(true);
            setProfile(false);
            setNotification(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setProfile(false);
            setNotification(false);
        }
    }

    const openNotification= (e)=> {
        if (!notification){
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else{
            setNotification(false);
        }

    }

    const openProfile= ()=> {
        if (!profile){
            setProfile(true);
            setHelp(false);
            setNotification(false);
            setDiscover(false);
        }else {
            setProfile(false);
        }
    }

    const openSideBar= ()=> {
        if (!openSideMenu){
            setOpenSideMenu(true);
            setHelp(false);
            setProfile(false);
            setNotification(false);
        } else {
            setOpenSideMenu(false);
        }
    }
    
    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Image src={images.logo} alt= "NFT Marketplace" width={100} height={100}/>
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type ="text" placeholder="Search NFT"/>
                            <BsSearch onClick={() => {}} className={Style.search_icon} />
                        </div>
                    </div>
                </div>                    
                {/* End of left section */}

                <div className={Style.navbar_container_right}>
                    {/* Discover Menu */}
                    <div className={Style.navbar_container_right_discover}>
                        <p onClick={(e)=>{ openMenu(e)}}>Discover</p>
                        { discover && (
                            <div className={Style.navbar_container_right_discover_box}>
                                <Discover/>
                            </div>
                        )
                        }
                    </div>

                    {/* Help Center Menu  */}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e)=>{ openMenu(e)}}>Help Center</p>

                        { help && (
                            <div className={Style.navbar_container_right_help_box}>
                                <HelpCenter/>
                            </div>
                        )}
                    </div>

                    {/* Notification */}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications className={Style.notify} 
                            onClick={(e)=>{ openNotification(e)}} 
                        />

                        {notification && <Notification/>}
                    </div>

                    {/* Create button section */}
                    <div className={Style.navbar_container_right_button}>
                        <Button btnText="Create" />
                    </div>

                    {/* User profile */}
                    <div className={Style.navbar_container_right_profile}>
                        <div className={Style.navbar_container_right_profile_box}>
                            <Image src={images.user1} 
                                alt="Profile" 
                                width={40} 
                                height={40} 
                                onClick={()=>{openProfile()}}
                            />
                            { profile && <Profile />}
                        </div>
                    </div>

                    {/* Menu button */}
                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight className="Style.menuIcon"
                            onClick={()=>{openSideBar()}}
                        />                            
                    </div>

                    {/* SideBar Component*/}
                    {
                        openSideMenu && (
                            <div className={Style.SideBar} >
                                <SideBar setOpenSideMenu={setOpenSideMenu} />
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default NavBar;
