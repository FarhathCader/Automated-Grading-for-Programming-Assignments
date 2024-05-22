import React, { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Sample() {



  return (
    <div>
   <ClipLoader
                color="red"
                loading={true}
                size={150}
                css={override}
              />
       
    </div>
  )
}
