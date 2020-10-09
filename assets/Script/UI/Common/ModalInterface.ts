interface ModalInterface{
    cancel?: boolean,
    confirm?: boolean,
    cancel_text?:String,
    confirm_text?: String,
    cancel_callback?: Function,
    ok_callback?: Function,
}

export default ModalInterface;