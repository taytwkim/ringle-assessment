import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Navbar() {
  const [lessonType, setLessonType] = React.useState(20);
  
  const handleChange = (event) => {
    setLessonType(event.target.value);
  };

  return (
      <AppBar position="static" sx={{ paddingTop: 1.5, paddingBottom: 1, backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid lightgray' }}>
        <Toolbar>
          <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
            나가기
          </Button>
          
          <Typography variant="h6" fontWeight="bold" component="div" sx={{ ml: 2, color: 'black'}}>
            수업 예약
          </Typography>

          <Box sx={{ ml: 20, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">수업권 선택</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lessonType}
                label="lessonType"
                onChange={handleChange}
              >
                <MenuItem value={20}>1회 패키지 <Box component="span" sx={{backgroundColor: "#E4F1FF", padding: 0.5, borderRadius: 1.5, color: '#279EFF', ml:.5, mr:.5}}>20분</Box> (1회 남음)</MenuItem>
                <MenuItem value={40}>1회 패키지 <Box component="span" sx={{backgroundColor: "#DDF7E3", padding: 0.5, borderRadius: 1.5, color: '#5D9C59', ml:.5, mr:.5}}>40분</Box> (1회 남음)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
  );
}