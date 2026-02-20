import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function MaintenancePage() {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            p: 3,
        }}>
            <Stack spacing={2}
                alignItems="center"
                sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{}} >只今メンテナンス中です</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', }}>
                    {`しばらく経ってから再度アクセスしてください。\nご理解とご協力ありがとうございます。`}
                </Typography>
            </Stack>
        </Box >
    )
}
