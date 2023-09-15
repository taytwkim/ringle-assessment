import * as React from 'react';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import { useSelector } from 'react-redux'

export default function TutorsList(props) {
  const tutors = useSelector((state) => state.tutor);

  const [gender, setGender] = useState("");
  const [accent, setAccent] = useState("");
  const [majorType, setMajorType] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  
  const handleAccentChange = (event) => {
    setAccent(event.target.value);
  };
  
  const handleMajorTypeChange = (event) => {
    setMajorType(event.target.value);
  };

  const handleTutorClick = () => {
    alert("reservation made")
  };
  
  return (
    <div>
      <Typography variant='h6'>{format(props.selectedRange.from, 'PPP EEE p', { locale: koLocale })}</Typography>
      <Divider sx={{marginBottom:2}} variant="fullWidth"/>

      <Typography variant='h7'>튜터 직접 선택</Typography>

      <Box sx={{marginTop:2}}>
        <FormControl sx={{height: 15, width: 100}}>
          <InputLabel id="demo-simple-select-disabled-label">성별</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
          >
            <MenuItem value={0}>상관없음</MenuItem>
            <MenuItem value={1}>여자</MenuItem>
            <MenuItem value={2}>남자</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: 100}}>
          <InputLabel id="demo-simple-select-error-label">억양</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={accent}
            label="Accent"
            onChange={handleAccentChange}
          >
            <MenuItem value={0}>상관없음</MenuItem>
            <MenuItem value={1}>미국식</MenuItem>
            <MenuItem value={2}>영국식</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: 100}}>
          <InputLabel id="demo-simple-select-readonly-label">전공</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={majorType}
            label="Major Type"
            onChange={handleMajorTypeChange}
          >
            <MenuItem value={0}>상관없음</MenuItem>
            <MenuItem value={1}>사회과학경영</MenuItem>
            <MenuItem value={2}>인문계</MenuItem>
            <MenuItem value={3}>공과계열</MenuItem>
            <MenuItem value={4}>자연과학계열</MenuItem>
            <MenuItem value={5}>예체능</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{marginTop:2}}>
        <ButtonGroup fullWidth size="secondary" aria-label="secondary button group">
          <Button key="one">예약 가능</Button>
          <Button disabled key="two">추천 튜터</Button>
          <Button disabled key="three">찜한 튜터</Button>
        </ButtonGroup>
      </Box>
      
      <Typography variant='body2' sx={{marginTop:2}}>선택한 시간에 수업 가능한 튜터들입니다.</Typography>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
        tutors.map(function(tutor, i){
          return(
            <>
              <ListItem alignItems="flex-start" onClick={handleTutorClick} sx={{ '&:hover': { backgroundColor: '#f0f0f0' }, cursor: 'pointer'}}>
                <ListItemAvatar>
                  <Avatar alt={tutor.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={tutor.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {tutor.school}
                      </Typography>
                      <Typography variant='body2'>
                        {tutor.major}
                      </Typography>
                      <Typography variant='body2'>
                        수락율: {tutor.acceptanceRate}%
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </>
          )
        })
        }
      </List>
    </div>
  );
}