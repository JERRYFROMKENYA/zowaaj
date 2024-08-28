import React from 'react'
import ProfileDetailsone from './profileDetailsone'
import ProfileScreenthree from './profilesScreenthree'
import ProfileDetailstwo from './profileDetailstwo'
import ProfileDetailsfour from './profileDetailsfour'
import ProfileDetailsFive from './profileDetailsFive'
import ProfileDetailsSix from './profileDetailsSix'
import ProfileDetailsSeven from './profileDetailsSeven'

function Onboarding() {

    const [page, setPageNo] = React.useState(0)
    const [dataNode, setDataNode] = React.useState({})

    const setPage=()=>{
        setPageNo(page+1)
    }

    const setData=(data:any)=>{
      setDataNode({...dataNode, ...data})
      console.log(dataNode)

    }

    const pages=[<ProfileDetailsone setPage={setPage} setData={setData}/>, 
    <ProfileDetailstwo setPage={setPage} setData={setData}/>, 
    <ProfileScreenthree setPage={setPage} setData={setData}/> ,
    <ProfileDetailsfour setPage={setPage} setData={setData}/>,
     <ProfileDetailsFive setPage={setPage} setData={setData}/>,
      <ProfileDetailsSix setPage={setPage} setData={setData}/>, 
    <ProfileDetailsSeven setPage={setPage} setData={setData}/> ]
  return (
    <>
    { pages[page]}
    
    
    </>
  )
}

export default Onboarding