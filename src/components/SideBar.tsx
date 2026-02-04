import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: "タスク一覧", url: "/" },
  { title: "ログイン", url: "/login" }
]

export default function SideBar() {
  const width = 220

  const navigate = useNavigate();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) return null
  return (
    <Box
      sx={{
        borderRight: '1px solid rgba(15, 118, 110, 0.15)',
        width: width,
        minWidth: width,
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Simple Stack</Typography>
        <Typography variant="body2" color="text.secondary">Task board</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => navigate(item.url)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}