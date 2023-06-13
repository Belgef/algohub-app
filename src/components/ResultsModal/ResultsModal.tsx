import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Avatar,
    Box,
    Button,
    Modal,
    Snackbar,
    Stack,
    Step,
    StepIconProps,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const TestResultStepIcon = (props: StepIconProps) => {
    const { completed } = props;

    return completed ? (
        <Avatar sx={{ backgroundColor: '#2e7d32' }}>
            <CheckIcon />
        </Avatar>
    ) : (
        <Avatar sx={{ backgroundColor: '#d32f2f' }}>
            <ClearIcon />
        </Avatar>
    );
};

const TestResultStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#2e7d32',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderWidth: 3,
        borderColor: '#d32f2f',
        marginTop: -8,
        marginBottom: -8,
        marginLeft: 6,
    },
}));

type Props = {
    results?: string[];
    setResults?: (results: string[] | undefined) => void;
};

const ResultsModal = (props: Props) => {
    return (
        <Modal
            open={!!props.results}
            onClose={() => props.setResults?.(undefined)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Stack direction='column' alignItems='center' gap={2} sx={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    pb: 10,
                }}>
                <Typography id='modal-modal-title' variant='h4' component='h2' gutterBottom>
                    Results
                </Typography>
                <Stepper
                    activeStep={-1}
                    orientation='vertical'
                    sx={{ fontSize: '2em' }}
                    connector={<TestResultStepConnector />}
                >
                    {props.results?.map((r, i) => (
                        <Step key={i} completed={r.length === 0}>
                            <StepLabel StepIconComponent={TestResultStepIcon}>
                                <Typography color={r.length === 0 ? '#2e7d32' : '#d32f2f'} variant='h6'>
                                    {i + 1}. {r === '' ? 'Correct' : r}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                </Stack>
                {!!props.results && props.results.every((r) => r === '') && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={!!props.results}
                        onClose={() => props.setResults?.(undefined)}
                        message='Solve is saved!'
                        action={<Button size='small' component={NavLink} to='./../'>Return to problem</Button>}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default ResultsModal;
