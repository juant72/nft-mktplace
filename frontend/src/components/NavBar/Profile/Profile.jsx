import React from 'react';
import Image from 'next/image';
import {FaUserAlt, FaRegImage, FaUserEdit} from 'react-icons/fa';
import {MdHelpCenter} from 'react-icons/md';
import {TbDownloadOff, TbDownload} from 'react-icons/tb';
import Link from 'next/link';

//Internals imports
import Style  from './Profile.module.css';
import images from '../../../img';


const Profile = () => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image 
          src={images.user1} 
          width={50} 
          height={50}
          className={Style.profile_account_img}
        />
      </div>

      <div className={Style.profile_account_info}>
        <p>Joel Tapia</p>
        <small>1212312iLKLKJLJO</small>
      </div>

      <div className={Style.profile_menu}>
        <div class={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{pathname: '/myprofile'} }>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{pathname: '/my-items'} }>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{pathname: '/edit-profile'} }>Edit profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter href={{pathname:'/help'}} >
              Help
            </MdHelpCenter>
          </div>

          <div className={Style.profile_menu_one_item}>
            <TbDownload href={{pathname:'/disconnect'}} >
              Disconnect
            </TbDownload>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile