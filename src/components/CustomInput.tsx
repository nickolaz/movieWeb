import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const CustomInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #B0BEC5',
        borderRadius: '50px',
      },
    },
});

export default CustomInput;