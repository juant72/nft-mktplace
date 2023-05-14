import React from 'react'
import Link from 'next/link'

// Internals imports
import Style from './HelpCenter.module.css';


const HelpCenter = () => {
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

  return (
    <div className={Style}>
      {
        helpCenter.map( ( el, i) => (
            <div className={Style.helpCenter} >
              <Link href={ {pathname: `${el.link}` }}>
                {el.name}
              </Link>
            </div>
        ))
      }
    </div>
  )
}

export default HelpCenter