import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from "@mui/material/Box";
import { notFoundStyles } from "./not-found.styles";

export default function NotFoundPage(){
    const navigate = useNavigate()
    return(
        <Box sx={notFoundStyles.page}>
        <Stack spacing={2} 
        alignItems="center" 
        sx={{ textAlign: 'center' }}>
            <Typography variant="h3">ページが見つかりません。</Typography>
            <Typography variant="body2" color="text.secondary">
                申し訳ございません。お探しのページは、移動または削除された可能性があります。
            </Typography>
            <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
            >
                ホームへ戻る
            </Button>
            </Stack>
        </Box>
    )
}