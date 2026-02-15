import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import type { Task } from "../types/task"

type DeleteDialogProps = {
    open: boolean
    task: Task | null
    onClose: () => void
    onDelete: (taskId: string) => void
}
export default function DeleteDialog({ open, task, onClose, onDelete }: DeleteDialogProps) {
    if(!task) return null
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>削除の確認</DialogTitle>
            <DialogContent>
                <Typography>「{task.title}」を削除します。よろしいですか？</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>キャンセル</Button>
                <Button variant="contained" color="error" onClick={() => { onDelete(task.id) }}>
                    削除する
                </Button>
            </DialogActions>
        </Dialog>
    )
}
