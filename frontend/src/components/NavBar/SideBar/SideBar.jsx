import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';
import { 
  TiSocialFacebook, 
  TiSocialLinkedin, 
  TiSocialTwitter,
  TiSocialYoutube, 
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from 'react-icons/ti';

//Internal imports
import Style from './SideBar.module.css';
import images from '../../../img';
import Button from '../../Button/Button';



const SideBar = ( {setOpenSideMenu} ) => {
  //UseStates
const [openDiscover, setOpenDiscover] = useState(false);
const [openHelp, setOpenHelp]=useState(false);

//Disconver menu
const discover= [
  {
    name:"Collection",
    link: "collection"
  },
  {
    name:"Search",
    link: "search"
  },
  {
    name:"Author Profile",
    link: "author-profile"
  },
  {
    name:"NFT Details",
    link: "NFT-details"
  },
  {
    name:"Account Setting",
    link: "account-setting"
  },
  {
    name:"Connect Wallet",
    link: "connect-wallet"
  },
  {
    name:"Blog",
    link: "blog"
  }
];

// Help center menu
const helpCenter=[
  {
    name: 'About',
    link: 'about'
  },
  {
    name: 'Contact us',
    link: 'contact-us'
  },
  {
    name: 'Sign up',
    link: 'sign-up'
  },
  {
    name: 'Sign in',
    link: 'sign-in'
  },
  {
    name:'Subscription',
    link: 'subscription'
  }
];

const openDiscoverMenu =()=> {
  if (!openDiscover) {
    setOpenDiscover(true);
  } else {
    setOpenDiscover(false);
  }
};

const openHelpMenu=()=> {
  if (!openHelp) {
    setOpenHelp(true);
  } else {
    setOpenHelp(false);
  }
};

const closeSideBar=()=> {
  setOpenSideMenu(false);
};

return (
    <div className={Style.sideBar}>
      <GrClose className={Style.sidebar_closeBtn}
        onClick={()=>closeSideBar()}
      ></GrClose>

      <div className={Style.sidebar_box}>
        <Image src={ images.logo } 
          alt="Logo"
          width={150}
          height={150}
        />
        <p> Discover the most outstanding articles on all topics of NFT & your own stories and share them</p>

        <div className={Style.sidebar_social}>
          <a href='#'>
            <TiSocialFacebook/>
          </a>
          <a href='#'>
            <TiSocialLinkedin/>
          </a>
          <a href='#'>
            <TiSocialTwitter/>
          </a>
          <a href='#'>
            <TiSocialYoutube/>
          </a>
          <a href='#'>
            <TiSocialInstagram/>
          </a>
        </div>
      </div>

      <div className={Style.sidebar_menu}>
        <div>
          <div 
            className={SideBar.sideBar_menu_box}
            onClick={()=> openDiscoverMenu()}>
          </div>
            <p>Discover</p>
            <TiArrowSortedDown/>
        </div>
        {openDiscover && (
            <div className={Style.sidebar_discover}>
              { discover.map( (el,i) => 
                  (
                    <p key={i+1}> 
                      <Link src={ {pathname: `${el.link}`}}>
                        {el.name} 
                      </Link>
                    </p>
                  )
                )
              }
            </div>
          )
        }
        <div>
          <div className={Style.sidebar_menu_box}
            onClick={()=> openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown/> 
          </div>
          { openHelp && (
              <div className={Style.sidebar_discover}> 
                { helpCenter( (el,i) =>(
                  <p key={i+1}>
                    <Link href={ {pathname: `${el.link}`}}>
                      {el.name}
                    </Link>
                  </p>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>

      <div className={Style.sideBar_button}>
        <Button btnName="Create"/>
        <Button btnName="Connect Wallet"/>
      </div>

    </div>
  )
}

export default SideBar