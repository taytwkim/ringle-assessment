import * as React from 'react';
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

export default function AlignItemsList() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Typography variant='h6'>10월 20일(수) 오전 05:00</Typography>
      <Divider sx={{marginBottom:2}} variant="fullWidth"/>

      <Typography variant='h7'>튜터 직접 선택</Typography>

      <Box sx={{marginTop:2}}>
        <FormControl sx={{height: 15, width: 100}}>
          <InputLabel id="demo-simple-select-disabled-label">성별</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>상관없음</MenuItem>
            <MenuItem value={20}>여자</MenuItem>
            <MenuItem value={30}>남자</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: 100}}>
          <InputLabel id="demo-simple-select-error-label">억양</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>상관없음</MenuItem>
            <MenuItem value={20}>미국식</MenuItem>
            <MenuItem value={30}>영국식</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: 100}}>
          <InputLabel id="demo-simple-select-readonly-label">전공</InputLabel>
          <Select
            sx = {{height: 50}}
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>상관없음</MenuItem>
            <MenuItem value={20}>사회과학경영</MenuItem>
            <MenuItem value={30}>인문계</MenuItem>
            <MenuItem value={20}>공과계열</MenuItem>
            <MenuItem value={30}>자연과학계열</MenuItem>
            <MenuItem value={30}>예체능</MenuItem>
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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Dominic" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Dominic"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  University of Oxford
                </Typography>
                <Typography variant='body2'>
                  Japanese and Korean Studies
                </Typography>
                <Typography variant='body2'>
                  수락율: 100%
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Bao" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Bao"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Yale University
                </Typography>
                <Typography variant='body2'>
                  Ethnicity, Race, and Migration
                </Typography>
                <Typography variant='body2'>
                  수락율: 100%
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Aadhya" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Aadhya"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  New York University
                </Typography>
                <Typography variant='body2'>
                  Finance
                </Typography>
                <Typography variant='body2'>
                  수락율: 100%
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}