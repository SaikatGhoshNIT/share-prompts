'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  //const isUserLogedIn = true;
  const { data : session } = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{
    const Providers = async ()=>{
      const response = await getProviders();
      setProviders(response)
    }
    Providers()
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="assets/undraw_text_field_htlv.svg"
        alt="Promptopia Logo"
        width={60}
        height={50}
        className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
      {session?.user ? (<div className="flex gap-3 md:gap-5">
        <Link href="/create-prompt" className="black_btn">
          Create Post
        </Link>
        <button type="button" onClick={signOut} className="outline_btn">
          Sign out
        </button>
        <Link href="/profile">
          <Image src="/assets/images/logo.svg"
          width={37}
          height={37}
          className="rounded-full"
          alt="profile"/>
        </Link>
      </div>):
      (<>
        {
          providers && 
          Object.values(providers).map((provider)=>
            (<button
              type="button"
              key = { provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
                Sign In
            </button>)
          )
        }
      </>)}
      </div>
      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
          
            <Image src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=>{setToggleDropdown((previousState)=>{
                  return !previousState
              })}}
              />
             {toggleDropdown && (
            <div className="dropdown">
              <Link href="/profile"
              className="dropdown_link"
              onClick={()=> setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link href="/profile"
              className="dropdown_link"
              onClick={()=> setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button type="button"
                onClick={()=>{
                  setToggleDropdown(false)
                  signOut();
                }}
                className="mt-1 w-full black_btn"
              >
              Sign Out  
              </button>
            </div>
          )}
          </div>
        ):
        (<>
          {
            providers && 
            Object.values(providers).map((provider)=>
              (<button
                type="button"
                key = { provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                  Sign In
              </button>)
            )
          }
        </>)
        }
      </div>
    </nav>
  )
}

export default Nav