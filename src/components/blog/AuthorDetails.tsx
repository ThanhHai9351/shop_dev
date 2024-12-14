import { pathOr } from "ramda"
import React from "react"

import { socialLinks } from "@/data/content"
import { Link } from "react-router-dom"

const AuthorDetails = () => {
  return (
    <div className='flex h-16 items-center justify-between rounded-md bg-white px-10 py-2 dark:bg-neutral-900'>
      <div className='space-x-2 divide-x text-xs text-neutral-500 dark:text-neutral-300'>
        <span className='pl-2'>by Devsphere Labs</span>
        <span className='pl-2'>Published on February 23, 2023</span>
        <span className='pl-2'>Updated on April 4, 2024</span>
      </div>
      <div>
        <ul className='flex gap-3'>
          {socialLinks.map((listItem) => (
            <li key={listItem.href}>
              <Link to={pathOr("/#", ["href"], listItem)}>{pathOr("", ["Icon"], listItem)}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AuthorDetails
