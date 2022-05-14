import { useSnackbar } from "notistack";

export const useToasts = () => {
    const { enqueueSnackbar } = useSnackbar();
    const addToast = (message: String, opts: any) => {
        enqueueSnackbar(message, {
            variant: opts.appearance, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }
        });
    }
    return { addToast }
}