import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import API from '../API'
import { useRouter } from 'next/router'
import { setPlayers } from '../modules/game/action'
import PageError from '../common/components/PageError'

const Container = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.shadows[4],
  minWidth: theme.spacing(48),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))

const Waiting = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { site, game, user } = useSelector((state) => state)
  
  useEffect(() => {
    const interval = setInterval(() => {
      API.games.getStatus(game.roomNo).then(res => {
        if (game.roomNo === res.game.roomNo) {
          if (res.game.state === 'STARTED') {
            clearInterval(interval)
            return router.push('/game')
          }
          return dispatch(setPlayers(res.game.players))
        }
      })
    }, 10000)
  }, [])
  
  if (!game.host) {
    return <PageError />
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.games.startGame(game.roomNo)
      .finally(() => setLoading(false))
  }
  
  return <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>
    <form onSubmit={handleSubmit}>
      <Container spacing={2}>
        <Typography variant={'h4'} textAlign={'center'}>{site.title}</Typography>
        <Typography variant={'h6'} color={'success'}>Room No.: {game.roomNo}</Typography>
        {game.players.map(player => <Typography>{player.name}</Typography>)}
        {game.host.userId === user.userId
          ? <LoadingButton loading={loading} type={'submit'} size={'large'} variant={'contained'}>Start</LoadingButton>
          : <Button variant={'contained'} style={{ pointerEvents: 'none' }}>Waiting for host to start the game</Button>
        }
      </Container>
    </form>
  </Stack>
}

export default Waiting
