import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import API from '../API'
import { setStorage } from '../utils/storage'
import { StorageKeys } from '../constants/storage'
import { useRouter } from 'next/router'
import { setUser } from '../modules/user/action'
import { setGame } from '../modules/game/action'

const Container = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.shadows[4],
  minWidth: theme.spacing(48),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))

const options = {
  mode: [{ name: 'Play with Computer', value: 'COMPUTER' }, { name: 'Play Online', value: 'ONLINE' }],
  bots: [{ name: '1', value: '1' }, { name: '2', value: '2' }, { name: '3', value: '3' }],
  room: [{ name: 'Create', value: 'CREATE' }, { name: 'Join', value: 'JOIN' }],
  type: [{ name: 'Private', value: 'PRIVATE' }, { name: 'Public', value: 'PUBLIC' }]
}

const SelectOption = ({ label, game, setGame, keyName }) => {
  return <FormControl fullWidth>
    <InputLabel required>{label}</InputLabel>
    <Select
      required
      label={label}
      value={game[keyName]}
      onChange={(event) => setGame({ ...game, [keyName]: event.target.value })}
    >
      {options[keyName].map(({ name, value }) => <MenuItem value={value} key={value}>{name}</MenuItem>)}
    </Select>
  </FormControl>
}

const getButtonText = (games) => {
  if (games.mode === 'ONLINE') {
    return games.room === 'CREATE' ? 'Create Room' : 'Join Room'
  } else {
    return 'Start Game'
  }
}


const Home = () => {
  const [gameInput, setGameInput] = useState({
    mode: 'ONLINE',
    'bots': '1',
    type: 'PRIVATE',
    room: 'JOIN',
    roomNo: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { site } = useSelector((state) => state)
  const handleRoomNoChange = (event) => setGameInput({ ...gameInput, roomNo: event.target.value })
  const handleUserNameChange = (event) => setGameInput({ ...gameInput, name: event.target.value })
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.games.initGame(gameInput)
      .then((res) => {
          console.log(res)
          setStorage(StorageKeys.AUTH, res.token)
          setStorage(StorageKeys.GAME, res.game)
          setStorage(StorageKeys.USER, res.player)
          dispatch(setUser(res.player))
          dispatch(setGame(res.game))
          router.push('/waiting').then()
        }
      )
      .finally(() => setLoading(false))
  }
  
  return <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>
    <form onSubmit={handleSubmit}>
      <Container spacing={2}>
        <Typography variant={'h4'} textAlign={'center'}>{site.title}</Typography>
        <TextField label={'Enter Your Name.'} value={gameInput.name} onChange={handleUserNameChange} required />
        <SelectOption label='Select Game Mode' keyName={'mode'} game={gameInput} setGame={setGameInput} />
        {gameInput.mode === 'COMPUTER' &&
        <SelectOption label='Select Bots' keyName={'bots'} game={gameInput} setGame={setGameInput} />}
        {gameInput.mode === 'ONLINE' &&
        <SelectOption label='Select Room' keyName={'room'} game={gameInput} setGame={setGameInput} />}
        {gameInput.mode === 'ONLINE' && gameInput.room === 'JOIN' &&
        <TextField label={'Enter Room No.'} value={gameInput.roomNo} onChange={handleRoomNoChange} required />}
        {gameInput.mode === 'ONLINE' && gameInput.room === 'CREATE' &&
        <SelectOption label='Select Room Type' keyName={'type'} game={gameInput} setGame={setGameInput} />}
        <LoadingButton loading={loading} type={'submit'} size={'large'} variant={'contained'}>
          {getButtonText(gameInput)}
        </LoadingButton>
      </Container>
    </form>
  </Stack>
}

export default Home
