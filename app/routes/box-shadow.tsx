import React, { useState } from 'react'
import type { LinksFunction } from "@remix-run/node";
import Box , {links as box}from '~/components/BoxShadow/Box';
const BoxShadow = () => {

    return (
        <div><Box/></div>
    )
}

export default BoxShadow
export const links: LinksFunction = () => {
  return [...box()]
}