import React from 'react'
import { Home } from '@mui/icons-material'
import { Avatar, Link, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Header = () => {
  const { site, user } = useSelector((state) => state)
  return <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
    <Stack direction={'row'} alignItems={'center'}>
      <Link href={''} style={{ cursor: 'pointer' }}><Home /></Link>
      <Typography variant={'h5'}>{site.title} {user.userId && `| ${user.name}`} </Typography>
    </Stack>
    <Stack>
      <Avatar sizes={'small'} />
    </Stack>
  </Stack>
}

export default Header
